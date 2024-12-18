import React, { useContext } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { AuthContext } from "../../providers/AuthProvider";
import { IoMdLogOut } from "react-icons/io";
import { FaHistory, FaTachometerAlt } from "react-icons/fa";
import { IoIosNotifications, IoIosSend } from "react-icons/io";
import {
  MdCallReceived,
  MdOutlinePendingActions,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";
import logo from "../../assets/images/logo/easy-diary.png";

const Sidebar = () => {
  const { t } = useTranslation(); // Initialize translation function
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
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
  return (
    <div className="text-gray-900 px-4 fixed w-16 md:w-64 border-r border-gray-300 h-screen bg-gray-50 shadow-lg">
      <div>
        <img src={logo} alt="Easy Diary Logo" className="h-32 py-4 m-auto" />
      </div>

      <ul className="flex flex-col mt-3 text-base">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center py-2 px-6 space-x-4 font-medium rounded-lg 
            transition-all duration-300 ${
              isActive
                ? "bg-blue-500 text-white shadow-lg"
                : "text-gray-700 hover:bg-blue-100 hover:text-blue-500"
            }`
          }
        >
          <FaTachometerAlt className="text-xl" />
          <span className="hidden md:inline">{t("dashboard")}</span>
        </NavLink>
        <NavLink
          to="/compose"
          className={({ isActive }) =>
            `flex items-center py-2 px-6 space-x-4 font-medium rounded-lg 
            transition-all duration-300 ${
              isActive
                ? "bg-blue-500 text-white shadow-lg"
                : "text-gray-700 hover:bg-blue-100 hover:text-blue-500"
            }`
          }
        >
          <FaPenToSquare className="text-xl" />
          <span className="hidden md:inline">{t("compose")}</span>
        </NavLink>
        <NavLink
          to="/notification"
          className={({ isActive }) =>
            `flex items-center py-2 px-6 space-x-4 font-medium rounded-lg cursor-pointer transition-all duration-300 ${
              isActive
                ? "bg-blue-500 text-white shadow-lg"
                : "text-gray-700 hover:bg-blue-100 hover:text-blue-500"
            }`
          }
        >
          <IoIosNotifications className="text-xl" />
          <span className="hidden md:inline">{t("notifications")}</span>
        </NavLink>

        <div className="flex items-center py-2 px-6 space-x-4 font-medium rounded-lg text-gray-400 cursor-not-allowed">
          <FaHistory className="text-xl" />
          <span className="hidden md:inline">{t("history")}</span>
        </div>

        <div className="flex items-center py-2 px-6 space-x-4 font-medium rounded-lg text-gray-400 cursor-not-allowed">
          <IoIosSend className="text-xl" />
          <span className="hidden md:inline">{t("sent")}</span>
        </div>

        <div className="flex items-center py-2 px-6 space-x-4 font-medium rounded-lg text-gray-400 cursor-not-allowed">
          <MdCallReceived className="text-xl" />
          <span className="hidden md:inline">{t("received")}</span>
        </div>

        <div className="flex items-center py-2 px-6 space-x-4 font-medium rounded-lg text-gray-400 cursor-not-allowed">
          <MdOutlinePendingActions className="text-xl" />
          <span className="hidden md:inline">{t("pending")}</span>
        </div>

        <div className="flex items-center py-2 px-6 space-x-4 font-medium rounded-lg text-gray-400 cursor-not-allowed">
          <GrCompliance className="text-xl" />
          <span className="hidden md:inline">{t("completed")}</span>
        </div>

        <div className="flex items-center py-2 px-6 space-x-4 font-medium rounded-lg text-gray-400 cursor-not-allowed">
          <RiCustomerService2Line className="text-xl" />
          <span className="hidden md:inline">{t("support")}</span>
        </div>

        <div className="flex items-center py-2 px-6 space-x-4 font-medium rounded-lg text-gray-400 cursor-not-allowed">
          <MdOutlineManageAccounts className="text-xl" />
          <span className="hidden md:inline">{t("account")}</span>
        </div>

        {/* Log Out Link */}
        <div
          onClick={handleLogout}
          className="flex items-center py-2 px-6 space-x-4 font-medium rounded-lg text-gray-700 hover:bg-red-100 hover:text-red-500 cursor-pointer"
        >
          <IoMdLogOut className="text-xl" />
          <span className="hidden md:inline">{t("logout")}</span>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
