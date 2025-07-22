import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const AdmissionLogin = ({ loginType, setLoginType, onSubmit }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);

      const response = await axios.post("/api/auth/login", {
        email: credentials.email,
        password: credentials.password,
      });

      // login(response.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setLoading(false);
    }
    // onSubmit(credentials);
  };

  return (
    <>
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`flex-1 py-2 font-medium ${
            loginType === "student"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setLoginType("student")}
        >
          Student Login
        </button>
        {/* <button
          className={`flex-1 py-2 font-medium ${
            loginType === "faculty"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setLoginType("faculty")}
        >
          Faculty Login
        </button> */}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Email Address*</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
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

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-blue-600" />
            <span className="ml-2 text-gray-700">Remember me</span>
          </label>

          <Link
            to="/forgot-password"
            className="text-blue-600 hover:underline text-sm"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition font-medium"
        >
          Login
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          {loginType === "student"
            ? "Don't have an account?"
            : "New faculty member?"}{" "}
          {/* <Link
            to="/admission-register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register here
          </Link> */}
        </p>
      </div>
    </>
  );
};

export default AdmissionLogin;
