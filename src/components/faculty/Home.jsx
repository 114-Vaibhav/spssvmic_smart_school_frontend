import React from "react";

const FacultyHome = ({ faculty }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">
        Faculty Dashboard
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 flex justify-center">
          <img
            src={faculty.photo || "/default-profile.jpg"}
            alt="Faculty"
            className="w-48 h-48 rounded-full object-cover border-4 border-blue-100"
          />
        </div>

        <div className="md:w-2/3">
          <h3 className="text-xl font-semibold mb-4">
            Welcome, {faculty.first_name} {faculty.last_name}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Subject</h4>
              <p>{faculty.subject}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Qualification</h4>
              <p>{faculty.qualification}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2">Joining Date</h4>
              <p>{new Date(faculty.joining_date).toLocaleDateString()}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Email</h4>
              <p>{faculty.email}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Quick Actions</h4>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                View Class
              </button>
              <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition">
                Upload Materials
              </button>
              <button className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
                Send Notice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyHome;
