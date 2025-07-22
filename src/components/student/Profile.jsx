import React from "react";

const StudentProfile = ({ student }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 flex justify-center">
          <img
            src={student.photo || "/default-profile.jpg"}
            alt="Student"
            className="w-48 h-48 rounded-full object-cover border-4 border-blue-100"
          />
        </div>

        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-500">Roll No</p>
              <p className="font-medium">{student.roll_no}</p>
            </div>
            <div>
              <p className="text-gray-500">Class</p>
              <p className="font-medium">{student.class}</p>
            </div>
            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-medium">{student.name}</p>
            </div>
            <div>
              <p className="text-gray-500">Date of Birth</p>
              <p className="font-medium">
                {new Date(student.dob).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium">{student.email}</p>
            </div>
            <div>
              <p className="text-gray-500">Mobile</p>
              <p className="font-medium">{student.mobile}</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Parent Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Father's Name</p>
              <p className="font-medium">{student.father_name}</p>
            </div>
            <div>
              <p className="text-gray-500">Mother's Name</p>
              <p className="font-medium">{student.mother_name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Print Profile
        </button>
      </div>
    </div>
  );
};

export default StudentProfile;
