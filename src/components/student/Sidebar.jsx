import React from "react";
import { NavLink } from "react-router-dom";

const StudentSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 bg-blue-800 text-white flex-shrink-0">
      <div className="p-4">
        <h2 className="text-xl font-bold">Student Portal</h2>
      </div>
      <nav className="mt-6">
        <NavLink
          to="#"
          onClick={() => setActiveTab("profile")}
          className={`flex items-center px-4 py-3 ${
            activeTab === "profile" ? "bg-blue-700" : "hover:bg-blue-700"
          } transition`}
        >
          <span>My Profile</span>
        </NavLink>
        <NavLink
          to="#"
          onClick={() => setActiveTab("results")}
          className={`flex items-center px-4 py-3 ${
            activeTab === "results" ? "bg-blue-700" : "hover:bg-blue-700"
          } transition`}
        >
          <span>My Results</span>
        </NavLink>
        <NavLink
          to="#"
          onClick={() => setActiveTab("attendance")}
          className={`flex items-center px-4 py-3 ${
            activeTab === "attendance" ? "bg-blue-700" : "hover:bg-blue-700"
          } transition`}
        >
          <span>My Attendance</span>
        </NavLink>
        <NavLink
          to="#"
          onClick={() => setActiveTab("fees")}
          className={`flex items-center px-4 py-3 ${
            activeTab === "fees" ? "bg-blue-700" : "hover:bg-blue-700"
          } transition`}
        >
          <span>My Fees</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default StudentSidebar;
