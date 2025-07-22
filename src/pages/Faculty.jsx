import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FacultyList from "../components/FacultyList";

const Faculty = () => {
  const facultyMembers = [
    {
      id: 1,
      name: "Dr. Rajesh Sharma",
      subject: "Physics",
      qualification: "M.Sc, Ph.D",
      experience: "15 years",
      photo: "/physics-teacher.jpg",
    },
    {
      id: 2,
      name: "Mrs. Sunita Verma",
      subject: "Chemistry",
      qualification: "M.Sc, B.Ed",
      experience: "12 years",
      photo: "/chemistry-teacher.jpg",
    },
    {
      id: 3,
      name: "Mr. Amit Kumar",
      subject: "Mathematics",
      qualification: "M.Sc, M.Ed",
      experience: "10 years",
      photo: "/maths-teacher.jpg",
    },
    {
      id: 4,
      name: "Dr. Priya Singh",
      subject: "Biology",
      qualification: "M.Sc, Ph.D",
      experience: "18 years",
      photo: "/biology-teacher.jpg",
    },
    {
      id: 5,
      name: "Mrs. Rekha Gupta",
      subject: "English",
      qualification: "M.A, B.Ed",
      experience: "8 years",
      photo: "/english-teacher.jpg",
    },
    {
      id: 6,
      name: "Mr. Vijay Pal",
      subject: "Hindi",
      qualification: "M.A, M.Ed",
      experience: "14 years",
      photo: "/hindi-teacher.jpg",
    },
    {
      id: 7,
      name: "Mrs. Neeta Sharma",
      subject: "Social Science",
      qualification: "M.A, B.Ed",
      experience: "9 years",
      photo: "/social-science-teacher.jpg",
    },
    {
      id: 8,
      name: "Mr. Sanjay Kumar",
      subject: "Computer Science",
      qualification: "M.C.A, B.Ed",
      experience: "7 years",
      photo: "/computer-teacher.jpg",
    },
  ];

  return (
    // <FacultyList />
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-8">Our Faculty</h1>

          <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              Teaching Staff
            </h2>

            <p className="text-gray-700 mb-4">
              Our faculty members are highly qualified, experienced, and
              dedicated to providing quality education. They employ innovative
              teaching methodologies to ensure conceptual clarity and practical
              understanding.
            </p>
          </div>

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
                    <span className="font-medium">Subject:</span>{" "}
                    {teacher.subject}
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Faculty;
