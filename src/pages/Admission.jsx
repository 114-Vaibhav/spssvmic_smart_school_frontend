import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdmissionInfo from "../components/AdmissionInfo";

const Admission = () => {
  const admissionInfo9th = {
    seats: 120,
    eligibility: "Passed 8th standard from recognized school",
    process: [
      "Submit online application form",
      "Appear for entrance test (English, Hindi, Mathematics, Science)",
      "Interview with parents",
      "Submit required documents",
      "Pay admission fee",
    ],
    documents: [
      "Birth Certificate",
      "Aadhar Card",
      "Transfer Certificate from previous school",
      "8th Class Mark Sheet",
      "Passport size photographs (4)",
    ],
    importantDates: [
      "Application Start Date: 1st March",
      "Last Date for Application: 30th April",
      "Entrance Test: 10th May",
      "Result Declaration: 20th May",
      "Admission Completion: 31st May",
    ],
  };

  const admissionInfo11th = {
    seats: 80,
    eligibility:
      "Passed 10th standard from recognized board with minimum 60% marks",
    process: [
      "Submit online application form",
      "Appear for entrance test (Physics, Chemistry, Mathematics/Biology)",
      "Interview with parents",
      "Submit required documents",
      "Pay admission fee",
    ],
    documents: [
      "10th Board Mark Sheet",
      "Aadhar Card",
      "Transfer Certificate from previous school",
      "Character Certificate",
      "Passport size photographs (4)",
    ],
    importantDates: [
      "Application Start Date: 1st April",
      "Last Date for Application: 31st May",
      "Entrance Test: 10th June",
      "Result Declaration: 20th June",
      "Admission Completion: 30th June",
    ],
  };

  return (
    // <AdmissionInfo />
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-8">
            Admission Process
          </h1>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Admission for Class 9th
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-blue-700 mb-2">
                    Seat Availability
                  </h3>
                  <p>
                    Total Seats:{" "}
                    <span className="font-medium">
                      {admissionInfo9th.seats}
                    </span>
                  </p>
                  <p>General Category: 60 seats</p>
                  <p>OBC: 30 seats</p>
                  <p>SC/ST: 30 seats</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-blue-700 mb-2">
                    Eligibility Criteria
                  </h3>
                  <p>{admissionInfo9th.eligibility}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-blue-700 mb-2">
                    Admission Process
                  </h3>
                  <ol className="list-decimal pl-5 space-y-1">
                    {admissionInfo9th.process.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-blue-700 mb-2">
                    Documents Required
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {admissionInfo9th.documents.map((doc, index) => (
                      <li key={index}>{doc}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-blue-700 mb-2">
                    Important Dates
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {admissionInfo9th.importantDates.map((date, index) => (
                      <li key={index}>{date}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/admission-login"
                  className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition inline-block"
                >
                  Click to Apply for 9th Class
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-purple-700 mb-4">
                Admission for Class 11th (Science Stream)
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-blue-700 mb-2">
                    Seat Availability
                  </h3>
                  <p>
                    Total Seats:{" "}
                    <span className="font-medium">
                      {admissionInfo11th.seats}
                    </span>
                  </p>
                  <p>Mathematics Group: 50 seats</p>
                  <p>Biology Group: 30 seats</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-blue-700 mb-2">
                    Eligibility Criteria
                  </h3>
                  <p>{admissionInfo11th.eligibility}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-blue-700 mb-2">
                    Admission Process
                  </h3>
                  <ol className="list-decimal pl-5 space-y-1">
                    {admissionInfo11th.process.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-blue-700 mb-2">
                    Documents Required
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {admissionInfo11th.documents.map((doc, index) => (
                      <li key={index}>{doc}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-blue-700 mb-2">
                    Important Dates
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {admissionInfo11th.importantDates.map((date, index) => (
                      <li key={index}>{date}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/admission-login"
                  className="bg-purple-600 text-white py-2 px-6 rounded hover:bg-purple-700 transition inline-block"
                >
                  Click to Apply for 11th Class
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Additional Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Fee Concession & Scholarships
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-blue-700">
                  <li>25% fee concession for girls students</li>
                  <li>
                    Merit-based scholarships for top 3 entrance test scorers
                  </li>
                  <li>Special scholarships for economically weaker students</li>
                  <li>Sports quota scholarships available</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">
                  Transportation Facilities
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-green-700">
                  <li>School buses available on all major routes</li>
                  <li>Monthly charges: ₹800-₹1200 depending on distance</li>
                  <li>Bus routes can be checked at school office</li>
                  <li>Pickup and drop timing shared after admission</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-yellow-800 mb-2">Note:</h3>
              <p className="text-yellow-700">
                For any admission-related queries, please contact the admission
                office between 9 AM to 2 PM on working days or email at
                admissions@spssvmic.edu.in
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admission;
