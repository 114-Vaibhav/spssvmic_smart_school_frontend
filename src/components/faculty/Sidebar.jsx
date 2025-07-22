import React from "react";
import { NavLink } from "react-router-dom";

const FacultySidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 bg-blue-800 text-white flex-shrink-0">
      <div className="p-4">
        <h2 className="text-xl font-bold">Faculty Portal</h2>
      </div>
      <nav className="mt-6">
        <NavLink
          to="#"
          onClick={() => setActiveTab("home")}
          className={`flex items-center px-4 py-3 ${
            activeTab === "home" ? "bg-blue-700" : "hover:bg-blue-700"
          } transition`}
        >
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="#"
          onClick={() => setActiveTab("results")}
          className={`flex items-center px-4 py-3 ${
            activeTab === "results" ? "bg-blue-700" : "hover:bg-blue-700"
          } transition`}
        >
          <span>Update Results</span>
        </NavLink>
        <NavLink
          to="#"
          onClick={() => setActiveTab("attendance")}
          className={`flex items-center px-4 py-3 ${
            activeTab === "attendance" ? "bg-blue-700" : "hover:bg-blue-700"
          } transition`}
        >
          <span>Update Attendance</span>
        </NavLink>
        <NavLink
          to="#"
          onClick={() => setActiveTab("fees")}
          className={`flex items-center px-4 py-3 ${
            activeTab === "fees" ? "bg-blue-700" : "hover:bg-blue-700"
          } transition`}
        >
          <span>Update Fees</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default FacultySidebar;
