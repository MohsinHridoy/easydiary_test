import { useState } from 'react';
import Sidebar from '../Navbar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { IoSearch } from "react-icons/io5";

// Sample email data
const emails = [
  { id: 1, sender: "GitHub", subject: "Possible valid secrets found in commits", content: "Action needed: Secrets detected in recent commits...", time: "18:28", read: false },
  { id: 2, sender: "HubSpot", subject: "Rate your experience using Google Calendar", content: "We value your feedback. Please take a moment to rate your experience.", time: "13:07", read: false },
  { id: 3, sender: "LinkedIn", subject: "Application updates this week", content: "Your LinkedIn profile has been updated. Check out the latest activity.", time: "05:08", read: false },
  { id: 4, sender: "Onpointstudy", subject: "New: Accounting", content: "New accounting study materials are now available. Check them out!", time: "17 Dec", read: false },
  { id: 5, sender: "Bonzer Digital", subject: "Mega menu issue fix", content: "We have fixed an issue with the mega menu. Please review the changes.", time: "17 Dec", read: false },
];

const Notification = ({ setFolder, searchTerm, setSearchTerm }) => {
  const [folder, setFolderState] = useState("inbox");
  const [emailsState, setEmailsState] = useState(emails);
  const [selectedEmail, setSelectedEmail] = useState(null);

  // Ensure searchTerm is a valid string
  const safeSearchTerm = searchTerm ? searchTerm.toLowerCase() : "";

  // Filtered emails based on search input
  const filteredEmails = emailsState.filter(
    (email) => {
      const sender = email.sender ? email.sender.toLowerCase() : "";
      const subject = email.subject ? email.subject.toLowerCase() : "";
      return sender.includes(safeSearchTerm) || subject.includes(safeSearchTerm);
    }
  );

  const handleSelectEmail = (selectedEmail) => {
    setEmailsState((prevEmails) =>
      prevEmails.map((email) =>
        email.id === selectedEmail.id ? { ...email, read: true } : email
      )
    );
    setSelectedEmail(selectedEmail);
  };

  const handleBackToList = () => {
    setSelectedEmail(null);
  };

  return (
    <>
    <Sidebar></Sidebar>
    <Navbar></Navbar>
    <div className="flex ml-64">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 text-black h-screen p-4">
      <div className="bg-gray-100 text-black p-4">
          <h1 className="text-xl">Notifications</h1>
        </div>
        <ul className="space-y-4">
          <li onClick={() => setFolderState("inbox")} className="cursor-pointer hover:bg-blue-500 hover:text-white p-2 rounded">
            Inbox
          </li>
          <li onClick={() => setFolderState("sent")} className="cursor-pointer hover:bg-blue-500 hover:text-white p-2 rounded">
            Sent
          </li>
          <li onClick={() => setFolderState("deleted")} className="cursor-pointer hover:bg-blue-500 hover:text-white p-2 rounded">
            Deleted
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        {/* Navbar */}
        

        <div className="p-6">
          <div className="flex flex-col h-screen">
            {/* Top Section: Search Bar */}
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search emails"
                  className="border px-4 py-2 rounded-lg w-96"
                />
                <IoSearch size={20} className="ml-2 text-gray-500" />
              </div>
            </div>

            {/* Email List Section */}
            <div className="overflow-y-auto ">
              {filteredEmails.length > 0 ? (
                filteredEmails.map((email) => (
                  <div
                    key={email.id}
                    className={`flex justify-between items-center py-2 px-4 border-b hover:bg-gray-100 rounded-lg cursor-pointer ${
                      email.read ? "bg-gray-200" : "bg-white font-bold"
                    }`}
                    onClick={() => handleSelectEmail(email)}
                  >
                    <div>
                      <span className="font-semibold">{email.sender}</span>
                      <span className="ml-4 text-gray-600">{email.subject}</span>
                    </div>
                    <div className="text-gray-500 text-sm">{email.time}</div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 mt-4">No Notification found</div>
              )}
            </div>

            {/* Email Detail Section (only when an email is selected) */}
            {selectedEmail && (
              <div className="p-4 border-t mt-4 borde">
                <button
                  onClick={handleBackToList}
                  className="text-blue-500 hover:underline mb-4"
                >
                  Back to list
                </button>
                <div>
                  <div className="font-semibold text-xl">{selectedEmail.subject}</div>
                  <div className="text-gray-600 text-sm">{`From: ${selectedEmail.sender} | Time: ${selectedEmail.time}`}</div>
                  <div className="mt-4">{selectedEmail.content}</div>
                </div>

                {/* Full Data Table */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Full Data Table</h3>
                  <table className="min-w-full table-auto border-collapse">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border-b">#</th>
                        <th className="px-4 py-2 border-b">Topic Description</th>
                        <th className="px-4 py-2 border-b">Advisor Department</th>
                        <th className="px-4 py-2 border-b">Senior Secretary Department</th>
                        <th className="px-4 py-2 border-b">Additional Secretary Law Subsection</th>
                        <th className="px-4 py-2 border-b">Joint Secretary Law Branch</th>
                        <th className="px-4 py-2 border-b">Additional Secretary Discipline Subsection</th>
                        <th className="px-4 py-2 border-b">Joint Secretary Discipline Branch</th>
                        <th className="px-4 py-2 border-b">Law Sections</th>
                        <th className="px-4 py-2 border-b">Discipline Sections</th>
                        <th className="px-4 py-2 border-b">Recommendation Comments</th>
                        <th className="px-4 py-2 border-b">Diary Number</th>
                        <th className="px-4 py-2 border-b">Internal Department</th>
                        <th className="px-4 py-2 border-b">External Department</th>
                        <th className="px-4 py-2 border-b">Signature Seal</th>
                        <th className="px-4 py-2 border-b">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emails.map((data, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-2">{index + 1}</td>
                          <td className="px-4 py-2">{data.topicDescription}</td>
                          <td className="px-4 py-2">{data.advisorDepartment}</td>
                          <td className="px-4 py-2">{data.seniorSecretaryDepartment}</td>
                          <td className="px-4 py-2">{data.additionalSecretaryLawSubsection}</td>
                          <td className="px-4 py-2">{data.jointSecretaryLawBranch}</td>
                          <td className="px-4 py-2">{data.additionalSecretaryDisciplineSubsection}</td>
                          <td className="px-4 py-2">{data.jointSecretaryDisciplineBranch}</td>
                          <td className="px-4 py-2">{data.lawSections}</td>
                          <td className="px-4 py-2">{data.disciplineSections}</td>
                          <td className="px-4 py-2">{data.recommendationComments}</td>
                          <td className="px-4 py-2">{data.diaryNumber}</td>
                          <td className="px-4 py-2">{data.internalDepartment}</td>
                          <td className="px-4 py-2">{data.externalDepartment}</td>
                          <td className="px-4 py-2">{data.signatureSeal}</td>
                          <td className="px-4 py-2">{data.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Notification;
