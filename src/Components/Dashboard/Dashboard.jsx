import React, { useState } from "react";
import { useEntries } from "../EntryContext/EntryContext";
import Sidebar from "../Navbar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useTranslation } from "react-i18next";
import * as XLSX from 'xlsx'; // Import xlsx library
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const { name, email, designation, branch } = location.state || {};

  const { t } = useTranslation();
  const { entries, updateEntry, deleteEntry } = useEntries();
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({
    subjectDescription: "",
    advisorDepartment: "",
    seniorSecretaryDepartment: "",
    additionalSecretaryLawSubsection: "",
    jointSecretaryLawBranch: "",
    additionalSecretaryDisciplineSubsection: "",
    jointSecretaryDisciplineBranch: "",
    lawSections: "",
    disciplineSections: "",
    recommendationComments: "",
    diaryNumber: "",
    internalDepartment: "",
    externalDepartment: "",
    signatureSeal: "",
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (!editData.subjectDescription || !editData.advisorDepartment) {
      alert("দয়া করে সমস্ত ফিল্ড পূর্ণ করুন");
      return;
    }

    updateEntry(editData, editingIndex);
    setEditingIndex(null);
    setEditData({
      subjectDescription: "",
      advisorDepartment: "",
      seniorSecretaryDepartment: "",
      additionalSecretaryLawSubsection: "",
      jointSecretaryLawBranch: "",
      additionalSecretaryDisciplineSubsection: "",
      jointSecretaryDisciplineBranch: "",
      lawSections: "",
      disciplineSections: "",
      recommendationComments: "",
      diaryNumber: "",
      internalDepartment: "",
      externalDepartment: "",
      signatureSeal: "",
    });
  };
 // Function to download table data as Excel
 const downloadExcel = () => {
  // Convert entries to a format that Excel can understand
  const wsData = entries.map(entry => ({
    "#": entries.indexOf(entry) + 1,
    "বিষয়/বিবরণ": entry.subjectDescription,
    "উপদেষ্টার দপ্তর": entry.advisorDepartment,
    "সিনিয়র সচিবের দপ্তর": entry.seniorSecretaryDepartment,
    "অতিঃ সচিব (আইন) অনুবিভাগ": entry.additionalSecretaryLawSubsection,
    "যুগ্ন সচিব (আইন) অধিশাখা": entry.jointSecretaryLawBranch,
    "অতিঃ সচিব (শৃংখলা) অনুবিভাগ": entry.additionalSecretaryDisciplineSubsection,
    "যুগ্ন সচিব (শৃংখলা) অধিশাখা": entry.jointSecretaryDisciplineBranch,
    "আইন শাখা": entry.lawSections,
    "শৃংখলা শাখা": entry.disciplineSections,
    "সুপারিশ/মন্তব্য": entry.recommendationComments,
    "ডায়েরি নং": entry.diaryNumber,
    "বিবিধ/অভ্যন্তরীণ দপ্তর": entry.internalDepartment,
    "বিবিধ/বহিস্থ দপ্তর": entry.externalDepartment,
    "স্বাক্ষর/সীল": entry.signatureSeal,
  }));

  // Create a worksheet from the data
  const ws = XLSX.utils.json_to_sheet(wsData);

  // Create a new workbook and append the worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Entries");

  // Save the Excel file
  XLSX.writeFile(wb, "entries.xlsx");
};
  return (
    <>
      <Sidebar />
    <Navbar />
      <div>
      <div className=" p-6 ml-72">
      <h1 className="text-3xl font-bold  mb-6">{t("Easy Diary Dashboard")}</h1>
      <h1 className="text-3xl font-bold  mb-6">{name && <p><strong>Name:</strong> {name}</p>}</h1>
      
      <div className="grid grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <i className="fas fa-paper-plane text-3xl"></i>
            <span className="text-xl">40 </span>
          </div>
          <p className="mt-2 text-center font-bold">{t("Send")}</p>
          
        </div>

        {/* Card 2 */}
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <i className="fas fa-arrow-down text-3xl"></i>
            <span className="text-xl">120</span>
          </div>
          <p className="mt-2 text-center font-bold">{t("Accepted")}</p>
        </div>

        {/* Card 3 */}
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <i className="fas fa-camera text-3xl"></i>
            <span className="text-xl">30</span>
          </div>
          <p className="mt-2 text-center font-bold">{t("Unresolved")}</p>
        </div>

        {/* Card 4 */}
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <i className="fas fa-check-circle text-3xl"></i>
            <span className="text-xl">11</span>
          </div>
          <p className="mt-2 text-center font-bold">{t("Completed")}</p>
        </div>
      </div>
    </div>
      <div className=" p-4 ml-72 overflow-scroll">
      
        <div className="flex items-center justify-between">
          
        <h1 className="text-2xl font-bold mb-4">{t("dashboard")}</h1>
        <button
            className="btn mb-4"
            onClick={downloadExcel} // Attach download function
          >
            Excel Download
          </button>
        </div>
        {/* Table to display entries */}
        {entries.length === 0 ? (
          <p>এখনো কোন এন্ট্রি নেই।</p>
        ) : (
          <div>
            <table className=" border-collapse table-auto border-2">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">#</th>
                  <th className="border px-4 py-2">{t("topicDescription")}</th>
                  <th className="border px-4 py-2">{t("advisorDepartment")}</th>
                  <th className="border px-4 py-2">
                    {t("seniorSecretaryDepartment")}
                  </th>
                  <th className="border px-4 py-2">
                    {t("additionalSecretaryLawSubsection")}
                  </th>
                  <th className="border px-4 py-2">
                    {t("jointSecretaryLawBranch")}
                  </th>
                  <th className="border px-4 py-2">
                    {t("additionalSecretaryDisciplineSubsection")}
                  </th>
                  <th className="border px-4 py-2">
                    {t("jointSecretaryDisciplineBranch")}
                  </th>
                  <th className="border px-4 py-2">{t("lawSections")}</th>
                  <th className="border px-4 py-2">
                    {t("disciplineSections")}
                  </th>
                  <th className="border px-4 py-2">
                    {t("recommendationComments")}
                  </th>
                  <th className="border px-4 py-2">{t("diaryNumber")}</th>
                  <th className="border px-4 py-2">
                    {t("internalDepartment")}
                  </th>
                  <th className="border px-4 py-2">
                    {t("externalDepartment")}
                  </th>
                  <th className="border px-4 py-2">{t("signatureSeal")}</th>
                  <th className="border px-4 py-2">{t("action")}</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={index} className="border-b">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">
                      {entry.subjectDescription}
                    </td>
                    <td className="border px-4 py-2">
                      {entry.advisorDepartment}
                    </td>
                    <td className="border px-4 py-2">
                      {entry.seniorSecretaryDepartment}
                    </td>
                    <td className="border px-4 py-2">
                      {entry.additionalSecretaryLawSubsection}
                    </td>
                    <td className="border px-4 py-2">
                      {entry.jointSecretaryLawBranch}
                    </td>
                    <td className="border px-4 py-2">
                      {entry.additionalSecretaryDisciplineSubsection}
                    </td>
                    <td className="border px-4 py-2">
                      {entry.jointSecretaryDisciplineBranch}
                    </td>
                    <td className="border px-4 py-2">{entry.lawSections}</td>
                    <td className="border px-4 py-2">
                      {entry.disciplineSections}
                    </td>
                    <td className="border px-4 py-2">
                      {entry.recommendationComments}
                    </td>
                    <td className="border px-4 py-2">{entry.diaryNumber}</td>
                    <td className="border px-4 py-2">
                      {entry.internalDepartment}
                    </td>
                    <td className="border px-4 py-2">
                      {entry.externalDepartment}
                    </td>
                    <td className="border px-4 py-2">{entry.signatureSeal}</td>
                    <td className="border px-4 py-2 flex">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                        onClick={() => {
                          setEditingIndex(index);
                          setEditData(entry); // Fill form with the current entry data
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={() => deleteEntry(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal for editing entry */}
        {editingIndex !== null && (
          // Modal Overlay
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-10/12 h-[90%] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">এন্ট্রি সম্পাদনা করুন</h2>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                {/* Row 1: Subject Description and Advisor Department */}
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1">
                      বিষয়/বিবরণ:
                    </label>
                    <input
                      type="text"
                      name="subjectDescription"
                      value={editData.subjectDescription}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1">
                      উপদেষ্টার দপ্তর:
                    </label>
                    <input
                      type="text"
                      name="advisorDepartment"
                      value={editData.advisorDepartment}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Row 2: Senior Secretary Department and Additional Secretary Law Subsection */}
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1">
                      সিনিয়র সচিবের দপ্তর:
                    </label>
                    <input
                      type="text"
                      name="seniorSecretaryDepartment"
                      value={editData.seniorSecretaryDepartment}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1">
                      অতিঃ সচিব (আইন) অনুবিভাগ:
                    </label>
                    <input
                      type="text"
                      name="additionalSecretaryLawSubsection"
                      value={editData.additionalSecretaryLawSubsection}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Row 3: Joint Secretary Law Branch and Additional Secretary Discipline Subsection */}
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1">
                      যুগ্ন সচিব (আইন) অধিশাখা:
                    </label>
                    <input
                      type="text"
                      name="jointSecretaryLawBranch"
                      value={editData.jointSecretaryLawBranch}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1">
                      অতিঃ সচিব (শৃংখলা) অনুবিভাগ:
                    </label>
                    <input
                      type="text"
                      name="additionalSecretaryDisciplineSubsection"
                      value={editData.additionalSecretaryDisciplineSubsection}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Row 4: Joint Secretary Discipline Branch and Law Sections */}
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1">
                      যুগ্ন সচিব (শৃংখলা) অধিশাখা:
                    </label>
                    <input
                      type="text"
                      name="jointSecretaryDisciplineBranch"
                      value={editData.jointSecretaryDisciplineBranch}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1">
                      আইন শাখা:
                    </label>
                    <input
                      type="text"
                      name="lawSections"
                      value={editData.lawSections}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Row 5: Discipline Sections and Recommendation/Comments */}
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1">
                      শৃংখলা শাখা:
                    </label>
                    <input
                      type="text"
                      name="disciplineSections"
                      value={editData.disciplineSections}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1">
                      সুপারিশ/মন্তব্য:
                    </label>
                    <input
                      type="text"
                      name="recommendationComments"
                      value={editData.recommendationComments}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Row 6: Diary Number and Internal Department */}
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1">
                      ডায়েরি নং:
                    </label>
                    <input
                      type="text"
                      name="diaryNumber"
                      value={editData.diaryNumber}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1">
                      বিবিধ/অভ্যন্তরীণ দপ্তর:
                    </label>
                    <input
                      type="text"
                      name="internalDepartment"
                      value={editData.internalDepartment}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Row 7: External Department and Signature Seal */}
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1">
                      বিবিধ/বহিস্থ দপ্তর:
                    </label>
                    <input
                      type="text"
                      name="externalDepartment"
                      value={editData.externalDepartment}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1">
                      স্বাক্ষর/সীল:
                    </label>
                    <input
                      type="text"
                      name="signatureSeal"
                      value={editData.signatureSeal}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-green-500 text-white rounded-md"
                  >
                    পরিবর্তন সংরক্ষণ করুন
                  </button>
                </div>
              </form>

              {/* Close button */}
              <button
                onClick={() => setEditingIndex(null)}
                className="absolute top-2 right-2 text-gray-500"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
          </div>
        )}
      </div>
      </div>
      
    </>
  );
};

export default Dashboard;
