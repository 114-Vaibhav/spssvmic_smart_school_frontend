import React from "react";
import { Link } from "react-router-dom";

const AdmissionInfo = ({ admissionData, title, btnColor, btnText }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4" style={{ color: btnColor }}>
        {title}
      </h2>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg text-blue-700 mb-2">
            Seat Availability
          </h3>
          <p>
            Total Seats:{" "}
            <span className="font-medium">{admissionData.seats}</span>
          </p>
          {admissionData.seatDetails &&
            admissionData.seatDetails.map((detail, index) => (
              <p key={index}>{detail}</p>
            ))}
        </div>

        <div>
          <h3 className="font-semibold text-lg text-blue-700 mb-2">
            Eligibility Criteria
          </h3>
          <p>{admissionData.eligibility}</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-blue-700 mb-2">
            Admission Process
          </h3>
          <ol className="list-decimal pl-5 space-y-1">
            {admissionData.process.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-blue-700 mb-2">
            Documents Required
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {admissionData.documents.map((doc, index) => (
              <li key={index}>{doc}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-blue-700 mb-2">
            Important Dates
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {admissionData.importantDates.map((date, index) => (
              <li key={index}>{date}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/admission-registration"
          className={`bg-${btnColor}-600 text-white py-2 px-6 rounded hover:bg-${btnColor}-700 transition inline-block`}
        >
          {btnText}
        </Link>
      </div>
    </div>
  );
};

export default AdmissionInfo;
