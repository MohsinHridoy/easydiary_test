import { useState } from 'react';
import Sidebar from '../Navbar/Sidebar';
import Navbar from '../Navbar/Navbar';
import EmailList from '../EmailList/EmailList';
import EmailDetails from '../EmailDetails/EmailDetails';
import { IoSearch } from "react-icons/io5";

// Example emails data
const emails = [
  { id: 1, sender: "GitHub", subject: "Possible valid secrets found in commits", content: "Action needed: Secrets detected in recent commits...", time: "18:28", read: false, type: "primary" },
  { id: 2, sender: "HubSpot", subject: "Rate your experience using Google Calendar", content: "We value your feedback. Please take a moment to rate your experience.", time: "13:07", read: false, type: "updates" },
  { id: 3, sender: "LinkedIn", subject: "Application updates this week", content: "Your LinkedIn profile has been updated. Check out the latest activity.", time: "05:08", read: false, type: "primary" },
  { id: 4, sender: "Onpointstudy", subject: "New: Accounting", content: "New accounting study materials are now available. Check them out!", time: "17 Dec", read: false, type: "updates" },
  { id: 5, sender: "Bonzer Digital", subject: "Mega menu issue fix", content: "We have fixed an issue with the mega menu. Please review the changes.", time: "17 Dec", read: false, type: "primary" },
];

const Notification = () => {
  const [folder, setFolder] = useState("inbox");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmail, setSelectedEmail] = useState(null); // Track selected email
  const [emailType, setEmailType] = useState("primary"); // Track email type (Primary or Updates)
  const [emailsData, setEmailsData] = useState(emails); // Store emails in state

  // Filter emails based on the selected folder, type, and search term
  const filteredEmails = emailsData.filter(
    (email) =>
      email.type === emailType && // Only show emails based on the type
      (email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.sender.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSelectEmail = (email) => {
    setSelectedEmail(email); // Show the email details
    // Mark the email as read when selected
    email.read = true;
  };

  const handleBackToList = () => {
    setSelectedEmail(null); // Go back to the email list
  };

  const toggleReadStatus = (emailId) => {
    // Toggle the read/unread status of the email
    const updatedEmails = emailsData.map((email) =>
      email.id === emailId ? { ...email, read: !email.read } : email
    );
    setEmailsData(updatedEmails);
  };

  const handleUpdateEmail = (emailId, updatedSubject, updatedContent) => {
    const updatedEmails = emailsData.map((email) =>
      email.id === emailId ? { ...email, subject: updatedSubject, content: updatedContent } : email
    );
    setEmailsData(updatedEmails); // Update the state with the modified email
    setSelectedEmail(null); // Go back to the email list after update
  };

  const handleSendEmailToAdmin = (emailId) => {
    const email = emailsData.find((email) => email.id === emailId);
    if (email) {
      // Simulating sending the email to the super admin
      console.log(`Sending email to super admin: `, email);
      // You can replace this with an actual API call to send the email
      alert(`Email with subject "${email.subject}" sent to Super Admin.`);
    }
  };

  return (
    <div>
      <Sidebar />
      <Navbar />
      <div className="p-6 ml-72">
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-64 bg-gray-100 h-screen p-4">
            <ul className="mt-4">
              <li
                className={`py-2 px-4 cursor-pointer ${folder === "inbox" ? "bg-gray-200 font-bold" : "hover:bg-gray-200"}`}
                onClick={() => setFolder("inbox")}
              >
                Inbox
              </li>
              <li
                className={`py-2 px-4 cursor-pointer ${folder === "sent" ? "bg-gray-200 font-bold" : "hover:bg-gray-200"}`}
                onClick={() => setFolder("sent")}
              >
                Sent
              </li>
              <li
                className={`py-2 px-4 cursor-pointer ${folder === "deleted" ? "bg-gray-200 font-bold" : "hover:bg-gray-200"}`}
                onClick={() => setFolder("deleted")}
              >
                Deleted
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Top Search Bar */}
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Here"
                  className="border px-4 py-2 rounded-lg w-96"
                />
                <IoSearch size={20} className="ml-2 text-gray-500" />
              </div>
            </div>

            {/* Tabs for Primary and Updates */}
            <div className="flex border-b">
              <button
                onClick={() => setEmailType("primary")}
                className={`px-4 py-2 text-blue-500 border-b-2 ${emailType === "primary" ? "border-blue-500 font-semibold" : ""}`}
              >
                Primary
              </button>
              <button
                onClick={() => setEmailType("updates")}
                className={`px-4 py-2 hover:text-blue-500 ${emailType === "updates" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
              >
                Updates
              </button>
            </div>

            {/* Email List or Email Details */}
            {selectedEmail ? (
              <EmailDetails
                email={selectedEmail}
                onBack={handleBackToList}
                onUpdateEmail={handleUpdateEmail} // Pass update handler
                onSendEmail={handleSendEmailToAdmin} // Pass send email handler
              />
            ) : (
              <EmailList
                emails={filteredEmails}
                onSelectEmail={handleSelectEmail}
                toggleReadStatus={toggleReadStatus}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
