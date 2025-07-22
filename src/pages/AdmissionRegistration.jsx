import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import AdmissionForm from "../components/AdmissionForm";
import AdmissionLogin from "../components/AdmissionLogin";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdmissionRegistration = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loginType, setLoginType] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    dob: "",
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    lastClass: "",
    lastSchool: "",
    lastClassPercentage: "",
    address: "",
    applyFor: "9th",
    subjects: [],
  });

  const navigate = useNavigate();

  const handleLoginSubmit = (credentials) => {
    // Handle login logic
    console.log("Login submitted:", { loginType, credentials });
    // For demo, just proceed to form
    setIsLogin(false);
  };

  const handleAdmissionSubmit = async (data) => {
    // Handle admission form submission
    setFormData(data);
    setIsRegistered(true);
    // const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("data sent");
      const response = await axios.post("/submit", formData);
      alert(response.data.message);
      // setFormData({
      //   state: "",
      //   district: "",
      //   city: "",
      //   name: "",
      //   category: "Park",
      //   chargesAdults: "",
      //   chargesChildren: "",
      //   // paymentQR: "",
      //   email: "",
      // });
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data");
    }
  };

  if (isLogin) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
              Admission Portal Login
            </h2>
            <AdmissionLogin
              loginType={loginType}
              setLoginType={setLoginType}
              onSubmit={handleLoginSubmit}
            />
            <div className="mt-4 text-center">
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-600 hover:underline"
              >
                New Registration
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Display application success and admit card */}
        {/* ... (same as before) ... */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
            Admission Registration Form
          </h2>
          <AdmissionForm onSubmit={handleAdmissionSubmit} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdmissionRegistration;
