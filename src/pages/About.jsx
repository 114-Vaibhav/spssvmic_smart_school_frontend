import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutCollege from "../components/AboutCollege";

const About = () => {
  const organizationMembers = [
    {
      id: 1,
      name: "Shri Chhabinath Singh Yadav",
      position: "Chairman",
      photo: "",
    },
    {
      id: 2,
      name: "Shri Ram Kumar Gupta",
      position: "Vice President",
      photo: "",
    },
    {
      id: 3,
      name: "Shri Radheshyam Gupta",
      position: "Manager",
      photo: "",
    },
    {
      id: 4,
      name: "Shri Umashankar Gupta",
      position: "Co-manager",
      photo: "",
    },
    {
      id: 5,
      name: "Shri Ram Mohan Gupta",
      position: "Treasurer",
      photo: "",
    },
    {
      id: 6,
      name: "Shri Ram Milan Gupta",
      position: "Member",
      photo: "",
    },
    {
      id: 7,
      name: "Mr. Pramod Kumar Singh Yadav",
      position: "Member",
      photo: "",
    },
    {
      id: 8,
      name: "Shri Gyan Prakash Gupta",
      position: "Member",
      photo: "",
    },
    {
      id: 9,
      name: "Shri Rajkumar Singh",
      position: "Member",
      photo: "",
    },
    {
      id: 10,
      name: "Shri Ramshankar Gupta",
      position: "Member",
      photo: "",
    },
    {
      id: 11,
      name: "Shri Rakesh Kumar Gupta",
      position: "Member",
      photo: "",
    },
    {
      id: 12,
      name: "Mr. Uttam Kumar Mishra",
      position: "Ex-officio member",
      photo: "",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h1 className="text-3xl font-bold text-blue-800 mb-6">
              About Our College
            </h1>
            {/* <AboutCollege /> */}
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                Shri Pal Singh Saraswati Vidya Mandir Inter College (SPSSVMIC)
                was established in 2004 with the vision to provide quality
                education to the youth of the region. Over the years, we have
                grown into one of the most prestigious educational institutions
                in the area, known for our academic excellence and value-based
                education.
              </p>

              <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-3">
                Our Affiliation
              </h2>
              <p className="text-gray-700 mb-4">
                The college is affiliated to the Uttar Pradesh Board of High
                School and Intermediate Education (UP Board). Our affiliation
                number is UDISE : 09231410003, and we follow the curriculum
                prescribed by the board while incorporating innovative teaching
                methodologies.
              </p>

              <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-3">
                Infrastructure
              </h2>
              <p className="text-gray-700 mb-4">
                Spread over 5 acres of land, our campus includes:
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-700">
                <li>30 well-ventilated classrooms</li>
                <li>
                  Fully equipped science laboratories (Physics, Chemistry,
                  Biology)
                </li>
                <li>Computer lab with 40 systems</li>
                {/* <li>Library with over 10,000 books</li> */}
                <li>
                  Sports facilities including playground, basketball court, and
                  indoor games
                </li>
                {/* <li>Auditorium with 500 seating capacity</li> */}
              </ul>

              <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-3">
                Our Achievements
              </h2>
              <p className="text-gray-700 mb-2">
                - Consistently achieving 95%+ pass percentage in board
                examinations
              </p>
              <p className="text-gray-700 mb-2">
                - Winners of District Level Science Exhibition for 3 consecutive
                years
              </p>
              {/* <p className="text-gray-700">
                - Recognized as "Best School in Academic Excellence" by District
                Education Officer in 2022
              </p> */}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">
              College Organization
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    {/* <th className="py-3 px-4 border-b text-left">Photo</th> */}
                    <th className="py-3 px-4 border-b text-left">Name</th>
                    <th className="py-3 px-4 border-b text-left">Position</th>
                  </tr>
                </thead>
                <tbody>
                  {organizationMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      {/* <td className="py-3 px-4 border-b">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-12 h-12 object-cover rounded-full"
                        />
                      </td> */}
                      <td className="py-3 px-4 border-b font-medium">
                        {member.name}
                      </td>
                      <td className="py-3 px-4 border-b">{member.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
