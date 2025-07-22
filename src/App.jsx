import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Academic from "./pages/Academic";
import Faculty from "./pages/Faculty";
import Admission from "./pages/Admission";
import Login from "./pages/Login";
import AdmissionRegistration from "./pages/AdmissionRegistration";
import AdmissionForm from "./components/AdmissionForm";
import StudentDashboard from "./pages/student/Dashboard";
import FacultyDashboard from "./pages/faculty/Dashboard";
import AdmissionLogin from "./components/auth/Login";
import Register from "./components/auth/Register";
import AdmissionDashboard from "./pages/admission/Dashboard";
import AdmissionDashboardApplicaion from "./pages/admission/ApplicationForm";
import LanguageToggle from "./components/LanguageToggle";
import PaymentSuccess from "./components/student/PaymentSuccess";
const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* <GoogleTranslate /> */}
        <LanguageToggle />
        {/* <FloatingLanguageSelector /> */}
        <Routes>
          {/* <Route path="/" element={<Das} /> */}

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academic" element={<Academic />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
          <Route path="/admission/dashboard" element={<AdmissionDashboard />} />
          <Route
            path="/admission/dashboard/application"
            element={<AdmissionDashboardApplicaion />}
          />
          <Route
            path="/admission-login"
            // path="/admission-registration"
            element={<AdmissionLogin />}
            // element={<AdmissionRegistration />}
          />
          <Route path="/admission-register" element={<Register />} />
          <Route path="/student/payment-success" element={<PaymentSuccess />} />
          {/* <Route path="/admission-register" element={<AdmissionForm />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
