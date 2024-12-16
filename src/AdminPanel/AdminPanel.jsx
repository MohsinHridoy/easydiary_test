import React, { useState } from "react";

const AdminPanel = () => {
  // State to store the form data and entries
  const [formData, setFormData] = useState({ subjectDescription: "" });
  const [entries, setEntries] = useState([]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.subjectDescription) {
      alert("Please enter a subject description.");
      return;
    }

    // Add the new entry to the list
    setEntries([...entries, formData]);
    setFormData({ subjectDescription: "" }); // Clear the form
  };

  // Handle delete action
  const handleDelete = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {/* Form to add new entries */}
      <form onSubmit={handleSubmit} className="mb-6">
        <label htmlFor="subjectDescription" className="block mb-2 font-medium">
          Subject Description:
        </label>
        <input
          type="text"
          name="subjectDescription"
          value={formData.subjectDescription}
          onChange={handleChange}
          className="border px-4 py-2 w-full mb-4"
          placeholder="Enter subject description"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>

      {/* Table to display entries */}
      {entries.length === 0 ? (
        <p>No entries available.</p>
      ) : (
        <table className="border-collapse w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Subject Description</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{entry.subjectDescription}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPanel;
