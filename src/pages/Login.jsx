import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginType, setLoginType] = useState("student");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const userEmail = credentials.username.trim();
    const firstChar = userEmail[0];

    // Decide login type locally here
    const localLoginType = !isNaN(parseInt(firstChar, 10))
      ? "student"
      : "faculty";

    try {
      const endpoint =
        localLoginType === "student"
          ? "/api/auth/student-login"
          : "/api/auth/faculty-login";
      // ? "http://localhost:5000/api/auth/student-login"
      // : "http://localhost:5000/api/auth/faculty-login";

      const response = await axios.post(endpoint, {
        username: credentials.username,
        password: credentials.password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        if (localLoginType === "student") {
          navigate("/student/dashboard");
        } else {
          navigate("/faculty/dashboard");
        }
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      // console.error("Login error:", err);
      setError(err.response?.data?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "username") {
      const firstChar = value.trim()[0];
      if (!isNaN(parseInt(firstChar, 10))) {
        setLoginType("student");
      } else {
        setLoginType("faculty");
      }
    }

    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50 flex items-center justify-center py-8">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">
            Login Portal
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">
                Username
                {/* {loginType === "student" ? "Roll Number" : "Username"}* */}
              </label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="1025001@spssvmic,rajesh@spssvmic"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password*</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded font-medium text-white transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
