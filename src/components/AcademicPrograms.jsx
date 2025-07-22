import React from "react";

const AcademicPrograms = () => {
  const highSchoolSubjects = [
    "Hindi",
    "English",
    "Mathematics",
    "Science",
    "Social Science",
    "Drawing",
    "Computer",
  ];

  const interScienceSubjects = [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "English",
  ];

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-green-700">
          High School (Classes 9-10)
        </h3>
        <p className="text-gray-700 mb-2">Subjects Offered:</p>
        <ul className="list-disc pl-5 mb-4 text-gray-700">
          {highSchoolSubjects.map((subject, index) => (
            <li key={index}>{subject}</li>
          ))}
        </ul>
        <p className="text-gray-700">
          The high school curriculum follows the UP Board syllabus with
          additional focus on practical knowledge and skill development.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3 text-green-700">
          Intermediate (Classes 11-12, Science Stream)
        </h3>
        <p className="text-gray-700 mb-2">Subjects Offered:</p>
        <ul className="list-disc pl-5 mb-4 text-gray-700">
          {interScienceSubjects.map((subject, index) => (
            <li key={index}>{subject}</li>
          ))}
        </ul>
        <p className="text-gray-700">
          Students can choose between Mathematics and Biology groups in Class
          11. The curriculum prepares students for competitive exams and higher
          education.
        </p>
      </div>
    </div>
  );
};

export default AcademicPrograms;
