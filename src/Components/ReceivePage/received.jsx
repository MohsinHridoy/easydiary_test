import { useState, useEffect, useContext } from "react";
import { IoSearch } from "react-icons/io5";
import Sidebar from "../Navbar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { supabase } from "../../firebase/supabaseClient";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const Received = () => {
  const { user } = useContext(AuthContext);  // Getting user from AuthContext

  const [receivedEmails, setReceivedEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailFields, setEmailFields] = useState({
    suparish_comment: "",  // Comment field only
  });

  const userName = user?.name || "Unknown User";  // Assuming the user's name is stored in 'user.name'

  const userLawShakha = user?.designation === "Low Branch" ? user?.branch : null;
  const userDisciplineShakha = user?.designation === "Discipline Branch" ? user?.branch : null;

  // Fetch received emails from the Supabase "compose" table
  useEffect(() => {
    const fetchData = async () => {
      try {
        let query = supabase.from("compose").select("*").eq("status", "received");

        if (userLawShakha && userDisciplineShakha) {
          query = query.or(
            `law_shakha_number.eq.${userLawShakha},discipline_shakha_number.eq.${userDisciplineShakha}`
          );
        } else if (userLawShakha) {
          query = query.eq("law_shakha_number", userLawShakha);
        } else if (userDisciplineShakha) {
          query = query.eq("discipline_shakha_number", userDisciplineShakha);
        } else {
          throw new Error("No valid user filters provided");
        }

        const { data: fetchedData, error } = await query;

        if (error) throw new Error(error.message);

        setReceivedEmails(fetchedData);
        setFilteredEmails(fetchedData);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userLawShakha, userDisciplineShakha]);

  // Handle search functionality
  useEffect(() => {
    const searchLower = searchTerm.toLowerCase();
    const results = receivedEmails.filter(
      (email) =>
        email.internalDepto?.toLowerCase().includes(searchLower) ||
        email.bishoy_biboron?.toLowerCase().includes(searchLower)
    );
    setFilteredEmails(results);
  }, [searchTerm, receivedEmails]);

  // Handle when "Complete" button is clicked
  const handleComplete = (email) => {
    setEmailFields({
      suparish_comment: "",  // Clear comment initially
    });

    // Open the SweetAlert popup with only the comment field
    Swal.fire({
      title: "Complete Task",
      html: `
        <div>
          <label for="suparish_comment" class="block text-sm font-medium text-gray-700 mt-4">Comment</label>
          <textarea
            id="suparish_comment"
            class="block w-full mt-1 rounded-md border-gray-300 shadow-sm"
            placeholder="Enter comment here"
            rows="4"
            value="${emailFields.suparish_comment}"
            oninput="this.value = event.target.value"
          ></textarea>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Mark as Complete",
      cancelButtonText: "Cancel",
      preConfirm: async () => {
        try {
          // Update the comment before proceeding
          const comment = document.getElementById("suparish_comment").value;
          setEmailFields({ suparish_comment: comment }); // Update the comment in the state

          // Here we update the email fields based on the user's edits
          const { error } = await supabase
            .from("compose")
            .update({
              status: "complete",  // Update status to complete
              suparish_comment: comment,  // Update comment
              complete_by: userName,  // Set the 'complete_by' field with the user's name
            })
            .eq("id", email.id);

          if (error) throw new Error(error.message);

          Swal.fire("Success", "Task marked as complete", "success");

          // Refresh the list and remove the completed email
          setReceivedEmails((prev) =>
            prev.filter((item) => item.id !== email.id)
          );
          setFilteredEmails((prev) =>
            prev.filter((item) => item.id !== email.id)
          );
        } catch (err) {
          Swal.fire("Error", "Failed to update status", "error");
        }
      },
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Sidebar />
      <Navbar pageTitle="Pending Tasks" /> {/* Passing the title here */}
      <div className="flex ml-64">
        <div className="flex-1 bg-gray-100">
          <div className="p-6">
            <div className="flex flex-col h-screen">
              {/* Search Bar */}
              <div className="flex justify-between items-center p-4 border-b">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search received tasks..."
                  className="border px-4 py-2 rounded-lg w-96"
                />
                <IoSearch size={20} className="ml-2 text-gray-500" />
              </div>

              {/* Received Emails List */}
              <div className="overflow-y-auto">
                {filteredEmails.length > 0 ? (
                  filteredEmails.map((email, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-4 px-6 border-b hover:bg-gray-100 rounded-lg cursor-pointer"
                    >


                      <div className="flex items-center space-x-2">
    <span className="text-sm text-gray-500">Bisoy Biboron:</span>
    <span className="text-sm text-gray-500">{email.bishoy_biboron || "No Subject"}</span>
  </div>

                      <div className="flex items-center space-x-2">
    <span className="text-sm text-gray-500">Diary No:</span>
    <span className="text-sm text-gray-500">{email.diary_no || "No Diary No"}</span>
  </div>
                      <div className="flex items-center space-x-2">
    <span className="text-sm text-gray-500">Approve By:</span>
    <span className="text-sm text-gray-500">{email.approved_by || "Not Approved"}</span>
  </div>
                  
                      <button
                        onClick={() => handleComplete(email)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                      >
                        Complete
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 mt-4">
                    No Received Notifications Found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Received;
