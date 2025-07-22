import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../../components/student/Sidebar";
import StudentProfile from "../../components/student/Profile";
import StudentResults from "../../components/student/Results";
import StudentAttendance from "../../components/student/Attendance";
import StudentFees from "../../components/student/Fees";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderLogin from "../../components/HeaderLogin";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch student data on component mount
    const fetchStudentData = async () => {
      try {
        const response = await fetch("/api/student/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setStudent(data.student);
        } else {
          navigate("/login");
        }
      } catch (err) {
        // console.error(err);
        navigate("/login");
      }
    };

    fetchStudentData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!student) {
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
        <StudentSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-sm z-10">
            <div className="flex items-center justify-between px-6 py-4">
              <h1 className="text-xl font-semibold text-gray-800">
                {activeTab === "profile" && "My Profile"}
                {activeTab === "results" && "My Results"}
                {activeTab === "attendance" && "My Attendance"}
                {activeTab === "fees" && "My Fees"}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <img
                    src={student.photo || "/default-profile.jpg"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="ml-2 text-gray-700">{student.name}</span>
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
            {activeTab === "profile" && <StudentProfile student={student} />}
            {activeTab === "results" && (
              <StudentResults rollNo={student.roll_no} />
            )}
            {activeTab === "attendance" && (
              <StudentAttendance rollNo={student.roll_no} />
            )}
            {activeTab === "fees" && <StudentFees rollNo={student.roll_no} />}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentDashboard;
