import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewApplication = () => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editAllowed, setEditAllowed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admission/application", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admissionToken")}`,
          },
        });
        setApplication(response.data);

        // Check if edit is allowed (before deadline)
        const deadline = new Date("2023-12-31");
        setEditAllowed(new Date() < deadline);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!application) return <div>No application found</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Your Application</h2>
        {editAllowed && (
          <Link
            to="/admission/application"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit Application
          </Link>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Display all application fields */}
        <div>
          <h3 className="font-semibold">Personal Details</h3>
          <p>Name: {application.name}</p>
          <p>DOB: {new Date(application.dob).toLocaleDateString()}</p>
          {/* Add all other fields similarly */}
        </div>

        <div>
          <h3 className="font-semibold">Academic Details</h3>
          <p>Applying For: Class {application.applying_for}</p>
          <p>Subjects: {application.subjects.join(", ")}</p>
        </div>
      </div>

      {application.photo && (
        <div className="mt-4">
          <h3 className="font-semibold">Photo</h3>
          <img
            src={`${process.env.REACT_APP_API_URL}/uploads/${application.photo}`}
            alt="Student"
            className="h-32 border rounded"
          />
        </div>
      )}
    </div>
  );
};

export default ViewApplication;
