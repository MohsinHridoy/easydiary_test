import { useState, useEffect, useContext } from "react";
import { IoSearch } from "react-icons/io5";
import Sidebar from "../Navbar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { supabase } from "../../firebase/supabaseClient";
import { AuthContext } from "../../providers/AuthProvider";

const Notification = () => {
  const [emails, setEmails] = useState([]);
  const { user } = useContext(AuthContext);  // Getting user from AuthContext

  const [filteredEmails, setFilteredEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState(null);

    // Assuming 'userLawShakha' and 'userDisciplineShakha' come from the user object
    const userLawShakha = user?.designation === "Low Branch" ? user?.branch : null;
    const userDisciplineShakha = user?.designation === "Discipline Branch" ? user?.branch : null;

  // Fetch emails from the Supabase "compose" table
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let query = supabase.from("compose").select("*");

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

        query = query.eq("status", "sent"); // Only fetch items with status 'sent'

        const { data: fetchedData, error } = await query;

        if (error) throw new Error(error.message);

        const mappedData = fetchedData.map((item, index) => ({
          id: item.id, // Assuming `id` is a unique identifier in your table
          sender: item.internalDepto || "Unknown",
          subject: item.bishoy_biboron || "No Subject",
          content: item.suparishComment || "No Content",
          time: item.diaryNo || "No Time",
          status: item.status || "sent", // Track status field
          read: false,
          ...item,
        }));

        setEmails(mappedData);
        setFilteredEmails(mappedData);
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
    const results = emails.filter(
      (email) =>
        email.sender.toLowerCase().includes(searchLower) ||
        email.subject.toLowerCase().includes(searchLower)
    );
    setFilteredEmails(results);
  }, [searchTerm, emails]);

  const handleApproveClick = async (email) => {
    try {
      // Update the status in the database
      const { error } = await supabase
        .from("compose")
        .update({ status: "received", approved_by: user?.name }) // Add 'approved_by' field to the update query
        .eq("id", email.id);

      if (error) throw new Error(error.message);

      // Remove the approved email from the state
      const updatedEmails = emails.filter((item) => item.id !== email.id);
      setEmails(updatedEmails);
      setFilteredEmails(updatedEmails);

      // Close the popup
      setShowPopup(false);
      setPopupData(null);
    } catch (err) {
      setError("Failed to approve notification");
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setPopupData(null);
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
      <Navbar pageTitle="Notifications" /> {/* Passing the title here */}
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
                  placeholder="Search tasks"
                  className="border px-4 py-2 rounded-lg w-96"
                />
                <IoSearch size={20} className="ml-2 text-gray-500" />
              </div>

              {/* Notification List */}
              <div className="overflow-y-auto">
                {filteredEmails.length > 0 ? (
                  filteredEmails.map((email) => (
                    <div
                      key={email.id}
                      className="flex justify-between items-center py-4 px-6 border-b hover:bg-gray-100 rounded-lg cursor-pointer"
                    >
                      <div>
                        <span className="font-semibold">{email.subject}</span>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            setPopupData(email);
                            setShowPopup(true);
                          }}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 mt-4">
                    No Notifications Found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup for Approval */}
      {showPopup && popupData && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h3 className="text-lg font-semibold mb-4">Approve Notification</h3>
            <p>
              <strong>Subject:</strong> {popupData.subject}
            </p>
            <p>
              <strong>Content:</strong> {popupData.content}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handlePopupClose}
                className="bg-gray-300 px-4 py-2 rounded mr-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleApproveClick(popupData)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
