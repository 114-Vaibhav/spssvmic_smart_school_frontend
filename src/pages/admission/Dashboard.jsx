import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import AdmissionSidebar from "../../components/admission/Sidebar";
import Payment from "./Payment";
import Result from "./Result";
import AdmitCard from "./AdmitCard";
import ViewApplication from "./ViewApplication";
import ApplicationForm from "./ApplicationForm";
// import ViewApplication from "."

const AdmissionDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  // console.log("in side the dashboard");
  console.log(activeTab);

  // useEffect(() => {
  //   console.log("Running useEffect for token check");
  //   const storedToken = localStorage.getItem("token");
  //   console.log("Token:", storedToken);
  //   try {
  //     const storedUser = JSON.parse(storedToken);
  //     console.log("Parsed user:", storedUser);
  //     if (!storedUser) {
  //       console.log("No user, redirecting");
  //       navigate("/admission/login");
  //     } else {
  //       console.log("User found, setting user");
  //       setUser(storedUser);
  //     }
  //   } catch (e) {
  //     console.error("Error parsing user from localStorage", e);
  //     navigate("/admission/login");
  //   }
  // }, []);

  useEffect(() => {
    // Fetch student data on component mount
    console.log("Running useEffect for token check");
    const fetchStudentData = async () => {
      try {
        console.log("getting data from backend");
        const response = await fetch("/api/adStudent/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setUser(data.student);
        } else {
          navigate("/admission-login");
        }
      } catch (err) {
        console.error(err);
        navigate("/admission-login");
      }
    };

    fetchStudentData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    // navigate("/login");
    navigate("/admission-login");
  };
  // const handleLogout = () => {
  //   localStorage.removeItem("admissionToken");
  //   localStorage.removeItem("admissionUser");
  //   navigate("/admission/login");
  // };

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-100">
      <AdmissionSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800">
              Admission Portal
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user.name}</span>
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
          {activeTab === "payment" && <Payment />}
          {activeTab === "result" && <Result />}
          {activeTab === "admitcard" && <AdmitCard />}
          {activeTab === "viewapplication" && <ViewApplication />}
          {activeTab === "applicationform" && <ApplicationForm />}
        </main>
      </div>
    </div>
  );
};

export default AdmissionDashboard;
