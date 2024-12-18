import React, { useState } from 'react';

const EmailDetails = ({ email, onBack, onUpdateEmail, onSendEmail }) => {
  const [subject, setSubject] = useState(email.subject);
  const [content, setContent] = useState(email.content);

  const handleUpdate = () => {
    onUpdateEmail(email.id, subject, content); // Update the email with new subject and content
    onBack(); // Go back to the email list after update
  };

  const handleSend = () => {
    onSendEmail(email.id); // Send email to Super Admin
  };

  return (
    <div className="p-4">
      <button onClick={onBack} className="text-blue-500">Back to List</button>
      <div className="mt-4">
        <h2 className="text-xl font-bold">Edit Data</h2>
        <div className="mt-2">
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Subject"
          />
        </div>
        <div className="mt-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Email content"
            rows="6"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <button onClick={handleUpdate} className="px-4 py-2 bg-green-500 text-white rounded-lg">Update Data</button>
          <button onClick={handleSend} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Send to Super Admin</button>
        </div>
      </div>
    </div>
  );
};

export default EmailDetails;
