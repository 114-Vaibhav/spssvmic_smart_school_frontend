import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: "home" },
    { name: "Application Form", path: "/application", icon: "edit" },
    { name: "View Application", path: "/view-application", icon: "visibility" },
    { name: "Payment", path: "/payment", icon: "payment" },
    { name: "Admit Card", path: "/admit-card", icon: "assignment" },
    { name: "Merit List", path: "/merit-list", icon: "star" },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-indigo-800 text-white">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold">SPSSVMIC Admission</h1>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  location.pathname === item.path
                    ? "bg-indigo-900 text-white"
                    : "text-indigo-100 hover:bg-indigo-700 hover:text-white"
                }`}
              >
                <span className="material-icons mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
