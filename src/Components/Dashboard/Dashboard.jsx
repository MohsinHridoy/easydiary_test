import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../Navbar/Sidebar";
import Card from "../Card/Card"; // Assuming Card component is used for individual metrics
import { IoIosSend } from "react-icons/io";
import { MdCallReceived, MdOutlinePendingActions } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import { supabase } from "../../firebase/supabaseClient"; // Import Supabase client
import { jsPDF } from "jspdf"; // Import jsPDF
import "jspdf-autotable"; // Import for table support in jsPDF
import Navbar from "../Navbar/Navbar";

const placeholderImage = "/path/to/local-placeholder.jpg";

// Your base64 encoded font string
const NotoSansBengaliBase64 = "../../fonts/NotoSansBengali-Regular.ttf"; // Replace this with your actual base64 string

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "Guest User",
    email: "",
    photo: placeholderImage,
  });
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const handleEdit = (item) => {
    console.log("Navigating to compose with item:", item);
    navigate("/compose", { state: { formData: item } });
  };

  const userLawShakha = user?.designation === "Low Branch" ? user?.branch : null;
  const userDisciplineShakha = user?.designation === "Discipline Branch" ? user?.branch : null;
  const isJointSecretary = user?.designation === "Join Secretary";

  const handleSave = async () => {
    if (isEditing) {
      await updateItem(currentItem.id, { name: newItem });
      setIsEditing(false);
      setCurrentItem(null);
    } else {
      await createItem({ name: newItem });
    }
    fetchItems();
    setNewItem('');
  };
      
  // Fetch data from Supabase compose table
  useEffect(() => {
    if (user) {
      setUserData({
        name: user.displayName || "Guest User",
        email: user.email,
        photo: user.photoURL || placeholderImage,
      });
    } else {
      // Swal.fire({
      //   icon: "warning",
      //   title: "Unauthorized",
      //   text: "Please log in to access the dashboard.",
      //   showConfirmButton: true,
      // });
      // navigate("/"); // Redirect to login if no user
    }

    const fetchData = async () => {
      try {
        const { data: fetchedData, error } = await supabase.from("compose").select("*");
        if (error) throw new Error(error.message);

        setData(fetchedData);
        setFilteredData(fetchedData); // Initialize the filteredData to match data
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);
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
  const convertToBengaliNumber = (num) => {
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num.toString().split("").map(digit => bengaliDigits[parseInt(digit)]).join("");
  };



  // Log out handler
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have successfully logged out.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/"); // Redirect after successful logout
      })
      .catch((error) => {
        console.error("Logout Error:", error.message);
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: error.message,
        });
      });
  };


  // Delete item handler
  // Handle search input change
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredData(data); // Reset filter when search is empty
    } else {
      const filtered = data.filter((item) =>
        Object.values(item).some((val) =>
          String(val || "").toLowerCase().includes(query)
        )
      );
      setFilteredData(filtered);
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("compose").delete().match({ id });
      if (error) throw new Error(error.message);

      // Update both data and filteredData states to reflect changes
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);

      // Re-apply the current search query to updated data
      const updatedFilteredData = updatedData.filter((item) =>
        Object.values(item).some((val) =>
          String(val || "").toLowerCase().includes(searchQuery)
        )
      );
      setFilteredData(updatedFilteredData);
    } catch (err) {
      console.error("Error deleting item:", err.message);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }




  // PDF download handler with custom Bengali font

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add the custom font (Noto Sans Bengali) to the jsPDF instance using base64 encoding
    doc.addFileToVFS("NotoSansBengali-Regular.ttf", NotoSansBengaliBase64);
    doc.addFont("NotoSansBengali-Regular.ttf", "NotoSansBengali", "normal");

    // Set the font before rendering the table
    doc.setFont("NotoSansBengali");

    // Prepare the table data
    const tableData = data.map((item, index) => [
      index + 1,
      item.bishoy_biboron,
      item.upodeshtar_Depto,
      item.seniorSecretaryDepto,
      item.atik_SecretaryLaw,
      item.copy,
      item.bishoyShironam,
      item.preronerTarikh,
      item.bistariTo,
    ]);

    // Add the table to the document with the appropriate header and body
    doc.autoTable({
      head: [
        ['Serial', 'Subject / Description', 'Advisor Department', 'Senior Secretary Department', 'Additional Secretary (Law)', 'Copy', 'Subject Title', 'Date of Dispatch', 'Details']
      ],
      body: tableData,
      // Set the font size for the table (optional)
      theme: 'grid',
      headStyles: { fontSize: 10 }, // Set the font size for header
      bodyStyles: { fontSize: 10 }, // Set the font size for body text
    });

    // Save the PDF
    doc.save('compose_data.pdf');
  };
  // Search handler
  // const handleSearch = (event) => {
  //   const query = event.target.value;
  //   console.log("Searching for:", query);
  //   // Implement search logic here if needed (e.g., filter `data` based on the search)
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Sidebar />
      <Navbar pageTitle="Easy Diary Dashboard " /> {/* Passing the title here */}

      <div className="grow ml-16 md:ml-64 lg:h-screen bg-gray-200 text-gray-900">
      

        {/* Dashboard Overview (Cards) */}
        <div className="gap-4 mb-6 px-4">


          <h2 className="text-3xl font-extrabold mb-4 text-left text-gray-800 drop-shadow-sm">
            {/* Easy Diary Dashboard */}
          </h2>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 pt-8">
            {/* Card 1 */}
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="text-4xl">{<IoIosSend />}</div>
                <div className="text-right">
                  <p className="text-lg font-semibold">প্রেরিত</p>
                  <p className="text-2xl font-bold">40</p>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="text-4xl">{<MdCallReceived />}</div>
                <div className="text-right">
                  <p className="text-lg font-semibold">গৃহীত</p>
                  <p className="text-2xl font-bold">120</p>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="text-4xl">{<MdOutlinePendingActions />}</div>
                <div className="text-right">
                  <p className="text-lg font-semibold">অমীমাংসিত</p>
                  <p className="text-2xl font-bold">30</p>
                </div>
              </div>
            </div>
            {/* Card 4 */}
            <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="text-4xl">{<GrCompliance />}</div>
                <div className="text-right">
                  <p className="text-lg font-semibold">সম্পন্ন</p>
                  <p className="text-2xl font-bold">11</p>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className="px-4 h-full flex flex-col">
          <h2 className="text-3xl font-extrabold mb-4 text-left text-gray-800 drop-shadow-sm">
            Diary Records
          </h2>

          {/* searchbar */}
          <div className="flex  px-0 mb-4 border-l w-full">
            {/* Search Bar */}

            <div className="flex items-center flex-grow">
              <label className="input input-bordered flex items-center gap-4 w-full">
                <input
                  type="text"
                  placeholder="Search your letters..."
                  onChange={handleSearch}
                  value={searchQuery}

                  className="input input-bordered w-full"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
          
            {/* Download PDF Button */}
            <button
              onClick={handleDownloadPDF}
              className="btn bg-green-700 text-white hover:text-green-700 ml-4"
            >
              Download PDF
            </button>
          </div>


          {/* Table Wrapper */}
          <div className="flex-grow  min-h-[60vh] overflow-y-auto shadow-md rounded-md bg-white">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">ক্রমিক</th>
                  <th className="px-4 py-2 border">বিষয়/বিবরণ</th>
                  <th className="px-4 py-2 border">উপদেষ্টার দপ্তর</th>
                  <th className="px-4 py-2 border">সিনিয়র সচিবের দপ্তর</th>
                  <th className="px-4 py-2 border">অতিঃ সচিব (আইন)অনুবিভাগ</th>
                  <th className="px-4 py-2 border">যুগ্ন সচিব (আইন)অধিশাখা</th>
                  <th className="px-4 py-2 border">অতিঃ সচিব (শৃংখলা)অনুবিভাগ</th>
                  <th className="px-4 py-2 border">যুগ্ন সচিব (শৃংখলা)অধিশাখা</th>
                  <th className="px-4 py-2 border">আইন শাখাসমূহ</th>
                  <th className="px-4 py-2 border">শৃংখলা শাখাসমূহ</th>
                  <th className="px-4 py-2 border">সুপারিশ/মন্তব্য</th>
                  <th className="px-4 py-2 border">ডায়রি নং</th>
                  <th className="px-4 py-2 border">বিবিধ/অভ্যন্তরীণ দপ্তর</th>
                  <th className="px-4 py-2 border">বিবিধ/বহিস্থ দপ্তর</th>
                  <th className="px-4 py-2 border">সাক্ষর/সিল</th>
                  <th className="px-4 py-2 border">Status</th>

                  <th className="px-4 py-2 border">Approve By</th>

                  <th className="px-4 py-2 border">Complete By</th>

                  {isJointSecretary && (
              <th className="px-4 py-2 border">Action</th>
            )}                </tr>
              </thead>
              <tbody>

                {filteredData.map((item, index) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{item.bishoy_biboron || "-"}</td>
                    <td className="px-4 py-2 border">{item.upodeshtar_depto || "-"}</td>
                    <td className="px-4 py-2 border">{item.senior_secretary_depto || "-"}</td>
                    <td className="px-4 py-2 border">{item.atik_secretary_law || "-"}</td>
                    <td className="px-4 py-2 border">{item.anu_vibhag || "-"}</td>
                    <td className="px-4 py-2 border">{item.atik_secretary_discipline || "-"}</td>
                    <td className="px-4 py-2 border">{item.anu_vibhag_discipline || "-"}</td>

                    {/* <td className="px-4 py-2 border">{item.law_shakha || "-"}</td> */}
                    <td className="px-4 py-2 border">
                      {item.law_shakha && item.law_shakha_number
                        ? `${item.law_shakha} (${convertToBengaliNumber(item.law_shakha_number)})`
                        : item.law_shakha || item.law_shakha_number || "-"
                      }
                    </td>

                    <td className="px-4 py-2 border">
                      {item.discipline_shakha && item.discipline_shakha_number
                        ? `${item.discipline_shakha} (${convertToBengaliNumber(item.discipline_shakha_number)})`
                        : item.discipline_shakha || item.discipline_shakha_number || "-"
                      }
                    </td>
                    <td className="px-4 py-2 border">{item.suparish_comment || "-"}</td>
                    <td className="px-4 py-2 border">{item.diary_no || "-"}</td>
                    <td className="px-4 py-2 border">{item.internal_depto || "-"}</td>
                    <td className="px-4 py-2 border">{item.external_depto || "-"}</td>
                    <td className="px-4 py-2 border">{item.signature_seal || "-"}</td>
                    <td className="px-4 py-2 border">{item.status || "-"}</td>

                    <td className="px-4 py-2 border">{item.approved_by || "-"}</td>
                    <td className="px-4 py-2 border">{item.complete_by || "-"}</td>
                    <td className="px-4 py-2 border lg:flex gap-5">
  {/* Check if user is Joint Secretary before showing the buttons */}
  {isJointSecretary && (
    <>
      <button
        onClick={() => handleDelete(item.id)}
        className="btn bg-red-500 text-white hover:text-red-500"
      >
        Delete
      </button>
      <button
        onClick={() => handleEdit(item.id)}
        className="btn bg-green-700 text-white hover:text-green-700"
      >
        Edit
      </button>
    </>
  )}
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>


        </div>
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
    </>
  );
};

export default Dashboard;