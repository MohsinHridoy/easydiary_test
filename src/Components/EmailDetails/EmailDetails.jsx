import React from 'react';

const EmailDetails = ({ email, onBack }) => {
  return (
    <div className="p-4">
      <button onClick={onBack} className="text-blue-500 mb-4">
        Back to Emails
      </button>
      <h2 className="text-2xl font-bold">{email.subject}</h2>
      <p className="text-gray-500">{email.sender}</p>
      <p className="mt-4">{email.content}</p>
      <p className="mt-2 text-sm text-gray-500">Time: {email.time}</p>
    </div>
  );
};

export default EmailDetails;
