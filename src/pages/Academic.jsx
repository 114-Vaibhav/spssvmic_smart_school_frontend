import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AcademicPrograms from "../components/AcademicPrograms";

const Academic = () => {
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
    "General Hindi",
    "English",
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
  ];

  const academicCalendar = [
    {
      month: "April",
      events: ["Session Begins (1st April)", "Unit Test - I (15th-20th April)"],
    },
    {
      month: "May",
      events: ["Summer Vacation (15th May - 30th June)"],
    },
    {
      month: "July",
      events: [
        "School Reopens (1st July)",
        "Independence Day Celebration (15th July)",
      ],
    },
    {
      month: "August",
      events: ["Unit Test - II (10th-15th August)"],
    },
    {
      month: "September",
      events: ["Teachers Day Celebration (5th September)"],
    },
    {
      month: "October",
      events: ["Half Yearly Examinations (1st-15th October)"],
    },
    {
      month: "November",
      events: [
        "Diwali Vacation (10th-20th November)",
        "Annual Sports Day (25th November)",
      ],
    },
    {
      month: "December",
      events: [
        "Unit Test - III (5th-10th December)",
        "Winter Vacation (25th December - 1st January)",
      ],
    },
    {
      month: "January",
      events: ["Board Practical Examinations (For Class 12)"],
    },
    {
      month: "February",
      events: ["Pre-Board Examinations (For Classes 10 & 12)"],
    },
    {
      month: "March",
      events: ["Board Theory Examinations", "Session Ends (31st March)"],
    },
  ];

  const feeStructure = [
    {
      class: "9th",
      tuitionFee: "1200/month",
      admissionFee: "2000 (one-time)",
      otherCharges: "1500/year",
    },
    {
      class: "10th",
      tuitionFee: "1300/month",
      admissionFee: "2000 (one-time)",
      otherCharges: "1500/year",
    },
    {
      class: "11th (Science)",
      tuitionFee: "1500/month",
      admissionFee: "2500 (one-time)",
      otherCharges: "2000/year",
    },
    {
      class: "12th (Science)",
      tuitionFee: "1600/month",
      admissionFee: "2500 (one-time)",
      otherCharges: "2000/year",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-8">
            Academic Information
          </h1>
          {/* <AcademicPrograms /> */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                Academic Programs
              </h2>

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
                  Students can choose between Mathematics and Biology groups in
                  Class 11. The curriculum prepares students for competitive
                  exams and higher education.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                Academic Calendar 2023-24
              </h2>

              <div className="space-y-4">
                {academicCalendar.map((monthData, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 pb-4 last:border-0"
                  >
                    <h3 className="font-semibold text-lg text-blue-600">
                      {monthData.month}
                    </h3>
                    <ul className="list-disc pl-5 mt-1 text-gray-700">
                      {monthData.events.map((event, eventIndex) => (
                        <li key={eventIndex}>{event}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Fee Structure
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 border-b text-left">Class</th>
                    <th className="py-3 px-4 border-b text-left">
                      Tuition Fee
                    </th>
                    <th className="py-3 px-4 border-b text-left">
                      Admission Fee
                    </th>
                    <th className="py-3 px-4 border-b text-left">
                      Other Charges
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {feeStructure.map((fee, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b font-medium">
                        {fee.class}
                      </td>
                      <td className="py-3 px-4 border-b">{fee.tuitionFee}</td>
                      <td className="py-3 px-4 border-b">{fee.admissionFee}</td>
                      <td className="py-3 px-4 border-b">{fee.otherCharges}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-yellow-50 p-4 rounded border border-yellow-200">
              <h3 className="font-semibold text-yellow-800 mb-2">
                Payment Process
              </h3>
              <ol className="list-decimal pl-5 space-y-1 text-yellow-700">
                <li>Payments can be made monthly or quarterly</li>
                <li>
                  Cash payments at school office between 9 AM to 1 PM on working
                  days
                </li>
                <li>Online payment through student login.</li>
                {/* <li>Late fee of ₹50 per day after 10th of each month</li> */}
                <li>
                  Fee concession available for economically weaker students
                  (contact office)
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Academic;
