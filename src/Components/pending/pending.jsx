import { useState, useEffect, useContext } from "react";
import { IoSearch } from "react-icons/io5";
import Sidebar from "../Navbar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { supabase } from "../../firebase/supabaseClient";
import { AuthContext } from "../../providers/AuthProvider";

const Pending = () => {
  const { user } = useContext(AuthContext);  // Getting user from AuthContext

  const [receivedEmails, setReceivedEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userName = user?.name || "Unknown User";  // Assuming the user's name is stored in 'user.name'

  const userLawShakha = user?.designation === "Low Branch" ? user?.branch : null;
  const userDisciplineShakha = user?.designation === "Discipline Branch" ? user?.branch : null;

  // Fetch received emails from the Supabase "compose" table
  useEffect(() => {
    const fetchData = async () => {
      try {
        let query = supabase.from("compose").select("*").eq("status", "received");

       

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
                  placeholder="Search pending tasks"
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
                      <div>
                        <span className="font-semibold">{email.bishoy_biboron || "No Subject"}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <span>Approve By: </span>
                        <span>{email.approved_by || "Not Approved"}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <span>Status: </span>
                        <span>{email.status || "Received"}</span>
                      </div>
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

export default Pending;
