import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { GrLanguage } from "react-icons/gr";

const Navbar = () => {
  const { t } = useTranslation(); // Translation function
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("en");

  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);
    console.log("Searching for:", searchQuery);
  };

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
            Swal.fire(
              t("logout"),
              t("You have successfully logged out."),
              "success"
            );
            navigate("/"); // Redirect to home page
          })
          .catch((error) => {
            Swal.fire(t("Error"), error.message, "error");
          });
      }
    });
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    i18next.changeLanguage(lang); // Change language globally
  };

  return (
    <div className="text-gray-900 p-4 flex items-end justify-end">
      
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
                src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/6858/6858504.png"}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <span className="font-bold hover:bg-blue-100 hover:text-blue-500">
                {user.displayName || t("Guest")}
              </span>
            </li>
            <li>
              <span className="text-sm text-gray-500 hover:bg-blue-100 hover:text-blue-500">{user.email}</span>
            </li>
            <li className="my-2 hover:bg-blue-100 hover:text-blue-500">
            
              {/* Language Selector */}
              <div className="gap-4">
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="select select-bordered"
              > 
                <option value="en">English</option>
                <option value="bn">বাংলা</option> {/* Bengali Option */}
              </select>
              <GrLanguage className="text-2xl"/>
              </div>
             
            </li>
            <li>
              <button onClick={handleLogout} className="hover:bg-blue-100 hover:text-blue-500">{t("logout")}</button>
            </li>
          </ul>
        </div>
      ) : (
        <button onClick={() => navigate("/")} className="btn btn-primary">
          {t("login")}
        </button>
      )}
    </div>
  );
};

export default Navbar;
