import React from "react";

const FacultyList = ({ facultyMembers }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {facultyMembers.map((teacher) => (
        <div
          key={teacher.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <div className="h-48 overflow-hidden">
            <img
              src={teacher.photo}
              alt={teacher.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold text-blue-800">
              {teacher.name}
            </h3>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Subject:</span> {teacher.subject}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Qualification:</span>{" "}
              {teacher.qualification}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Experience:</span>{" "}
              {teacher.experience}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FacultyList;
