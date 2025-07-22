import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FacultySidebar from "../../components/faculty/Sidebar";
import FacultyHome from "../../components/faculty/Home";
import UpdateResults from "../../components/faculty/UpdateResults";
import UpdateAttendance from "../../components/faculty/UpdateAttendance";
import UpdateFees from "../../components/faculty/UpdateFees";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeaderLogin from "../../components/HeaderLogin";

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [faculty, setFaculty] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch faculty data on component mount
    const fetchFacultyData = async () => {
      try {
        const response = await fetch("/api/faculty/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // console.log("data hello");
        const data = await response.json();
        if (data.success) {
          // console.log("data");
          // console.log(data.faculty);
          setFaculty(data.faculty);
        } else {
          navigate("/login");
        }
      } catch (err) {
        // console.error(err);
        navigate("/login");
      }
    };

    fetchFacultyData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!faculty) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <HeaderLogin />
      <div className="flex h-screen bg-gray-100">
        <FacultySidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-sm z-10">
            <div className="flex items-center justify-between px-6 py-4">
              <h1 className="text-xl font-semibold text-gray-800">
                {activeTab === "home" && "Dashboard"}
                {activeTab === "results" && "Update Results"}
                {activeTab === "attendance" && "Update Attendance"}
                {activeTab === "fees" && "Update Fees"}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <img
                    src={faculty.photo || "/default-profile.jpg"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="ml-2 text-gray-700">{faculty.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6">
            {activeTab === "home" && <FacultyHome faculty={faculty} />}
            {activeTab === "results" && <UpdateResults />}
            {activeTab === "attendance" && <UpdateAttendance />}
            {activeTab === "fees" && <UpdateFees />}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FacultyDashboard;
