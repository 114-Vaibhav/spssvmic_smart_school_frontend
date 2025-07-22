import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const AdmissionSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const menuItems = [
    { path: "/admission/dashboard/home", label: "Home", icon: "🏠" },
    {
      path: "/admission/dashboard/application",
      label: "ApplicationForm",
      icon: "📝",
    },
    { path: "/admission/dashboard/payment", label: "Payment", icon: "💳" },
    {
      path: "/admission/dashboard/view",
      label: "ViewApplication",
      icon: "👁️",
    },
    {
      path: "/admission/dashboard/admit-card",
      label: "AdmitCard",
      icon: "🎫",
    },
    { path: "/admission/dashboard/result", label: "Result", icon: "📊" },
  ];

  return (
    <div className="w-64 bg-blue-800 text-white flex-shrink-0">
      <div className="p-4">
        <h2 className="text-xl font-bold">Admission Portal</h2>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <NavLink
            to="#"
            onClick={() => setActiveTab(item.label.toLowerCase())}
            className={`flex items-center px-4 py-3 ${
              activeTab === item.label.toLowerCase()
                ? "bg-blue-700"
                : "hover:bg-blue-700"
            } transition`}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
        {/* <NavLink
          to="#"
          onClick={() => setActiveTab("result")}
          className={`flex items-center px-4 py-3 ${
            activeTab === "result" ? "bg-blue-700" : "hover:bg-blue-700"
          } transition`}
        >
          <span>Result</span>
        </NavLink> */}
      </nav>
      {/* <div className="w-64 bg-blue-800 text-white flex-shrink-0">
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
      </div> */}
    </div>
  );
};

export default AdmissionSidebar;
