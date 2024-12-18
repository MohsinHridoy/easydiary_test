import React, { useState } from "react";
import Notification from "../Notification/Notification";
import EmailDetails from "../EmailDetails/EmailDetails";
import EmailList from "../EmailList/EmailList";
import emailsData from "../../../src/Components/Data/emails"; // Import emails data

const EmailManager = () => {
  const [emails, setEmails] = useState(emailsData); // Corrected data import
  const [folder, setFolder] = useState("inbox");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter emails based on folder and search term
  const filteredEmails = emails.filter(
    (email) =>
      email.folder === folder &&
      email.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setEmails((prev) =>
      prev.map((email) =>
        email.id === id ? { ...email, folder: "deleted" } : email
      )
    );
  };

  const handleSelectEmail = (email) => {
    setSelectedEmail(email);
    setEmails((prev) =>
      prev.map((e) => (e.id === email.id ? { ...e, read: true } : e))
    );
  };

  return (
    <div className="flex">
      <Notification setFolder={setFolder} />
      <div className="flex-1">
        <Notification searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {selectedEmail ? (
          <EmailDetails email={selectedEmail} onBack={() => setSelectedEmail(null)} />
        ) : (
          <EmailList
            emails={filteredEmails}
            onSelectEmail={handleSelectEmail}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default EmailManager;
