import React from 'react';

const EmailList = ({ emails, onSelectEmail }) => {
  return (
    <div>
      {emails.map((email) => (
        <div
          key={email.id}
          onClick={() => onSelectEmail(email)}  // Trigger email selection
          className={`flex justify-between items-center p-4 border-b cursor-pointer ${
            email.read ? "bg-gray-100" : "bg-white font-bold"
          }`}
        >
          <div>
            <span>{email.sender}</span> - <span>{email.subject}</span>
          </div>
          <div>
            <span>{email.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmailList;
