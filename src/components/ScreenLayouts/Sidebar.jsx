import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTasks,
  FaPlusSquare,
  FaUsers,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
import { FaUserCircle } from "react-icons/fa";

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinkStyles = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
      isActive
        ? "bg-blue-100 text-blue-600"
        : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
    }`;

  return (
    <aside
      className={`bg-white shadow-md p-6 flex flex-col justify-between fixed sm:static top-0 left-0 h-full w-70 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
      }`}
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-blue-600 border-b-2 pb-2 mb-2">
          TaskManager
        </h2>

        {/* User Info */}
        <div className="flex flex-col items-center justify-center gap-3 bg-gray-100 p-6 rounded-md">
          <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-blue-300 flex items-center justify-center bg-gray-100 text-gray-400">
          
              <FaUserCircle className="h-20 w-20" />
            
          </div>
          <div className="flex flex-col gap-2 items-center text-center">
            <span className="text-white text-sm bg-blue-600 px-3 py-0.5 rounded-md">
              {user.role}
            </span>
            <span className="font-semibold">{user.name}</span>
            <span className="text-sm text-gray-600">{user.email}</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {user.role === "admin" ? (
            <>
              <NavLink to="/admin/dashboard" className={navLinkStyles}>
                <FaTasks /> Dashboard
              </NavLink>
              <NavLink to="/admin/create-task" className={navLinkStyles}>
                <FaPlusSquare /> Create Task
              </NavLink>
              <NavLink to="/admin/tasks" className={navLinkStyles}>
                <FaTasks /> Manage Tasks
              </NavLink>
              <NavLink to="/admin/users" className={navLinkStyles}>
                <FaUsers /> Manage Users
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/user/user-dashboard" className={navLinkStyles}>
                <FaHome /> User Dashboard
              </NavLink>
              <NavLink to="/user/my-task" className={navLinkStyles}>
                <FaTasks /> My Tasks
              </NavLink>
            </>
          )}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-red-500 cursor-pointer mt-6 transition-all"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
