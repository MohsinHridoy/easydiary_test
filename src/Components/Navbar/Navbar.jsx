import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate for navigation
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider"; // Fetching user state from AuthContext
import { useTranslation } from "react-i18next"; // For translations
import i18next from "i18next";
import { GrLanguage } from "react-icons/gr"; // For language selector icon
import PropTypes from "prop-types"; // Import PropTypes for validation

const Navbar = ({ pageTitle }) => {  
  const { t } = useTranslation(); // Translation function
  const { user, logOut } = useContext(AuthContext); // Fetching user and logout function from AuthContext
  const navigate = useNavigate(); // For navigation

  const [language, setLanguage] = useState("en"); // Default language set to 'en'

  // Set the document title dynamically based on the pageTitle passed from the parent
  useEffect(() => {
    document.title = pageTitle || t("Easy Diary");
  }, [pageTitle, t]);

  // Handle user logout with confirmation modal
  const handleLogout = () => {
    Swal.fire({
      title: t("Are you sure you want to logout?"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("logout"),
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire(t("logout"), t("You have successfully logged out."), "success");
            navigate("/"); // Redirect to the home page after logout
          })
          .catch((error) => {
            Swal.fire(t("Error"), error.message, "error");
          });
      }
    });
  };

  // Function to handle language change globally
  const changeLanguage = (lang) => {
    setLanguage(lang);
    i18next.changeLanguage(lang); // Change language globally using i18next
  };

  return (
    <div className="text-gray-900 p-4 flex items-center justify-between bg-white">
        <div className="text-gray-900 p-4 flex items-center justify-between bg-white">
        <div style={{ width: '390px' }}></div> {/* Fixed width for spacing */}

        <div
    className="text-[#333] font-bold text-[111.5px] pl-2"  // Tailwind classes for styling
    style={{ fontWeight: 'bold', fontSize: '25.5px' }} // Inline styles if needed
  >
    <span>{pageTitle || "Dummy Title"}</span> {/* Dynamically render title */}
  </div>

          </div>

   
      {/* User Avatar Dropdown */}
      {user ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/6858/6858504.png"} // Default avatar
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <span className="font-bold hover:bg-blue-100 hover:text-blue-500">
                {user.name}
              </span>
            </li>
            {user.designation && (
              <li>
                <span className="text-sm text-gray-500 hover:bg-blue-100 hover:text-blue-500">
                  {user.designation}
                </span>
              </li>
            )}
            {user.branch && (
              <li>
                <span className="text-sm text-gray-500 hover:bg-blue-100 hover:text-blue-500">
                  {user.branch}
                </span>
              </li>
            )}
            <li>
              <span className="text-sm text-gray-500 hover:bg-blue-100 hover:text-blue-500">
                {user.email}
              </span>
            </li>

            {/* Language Selector */}
            <li className="my-2 hover:bg-blue-100 hover:text-blue-500">
              <div className="gap-4 flex items-center">
                <select
                  value={language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="select select-bordered text-sm"
                >
                  <option value="en">English</option>
                  <option value="bn">বাংলা</option> {/* Bengali Option */}
                </select>
                <GrLanguage className="text-2xl" />
              </div>
            </li>

            {/* Logout Button */}
            <li>
              <button onClick={handleLogout} className="hover:bg-blue-100 hover:text-blue-500">
                {t("logout")}
              </button>
            </li>
          </ul>
        </div>
      ) : (
        // If user is not logged in, show a login button
        <button onClick={() => navigate("/")} className="btn btn-primary">
          {t("login")}
        </button>
      )}
    </div>
  );
};

// Prop validation to avoid ESLint warning
Navbar.propTypes = {
  pageTitle: PropTypes.string, // Ensuring that pageTitle is a string
};

export default Navbar;
