import React, { useState, useEffect } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

const AdmitCard = () => {
  const [admitData, setAdmitData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const admitCardRef = React.useRef();

  useEffect(() => {
    const fetchAdmitCard = async () => {
      try {
        const response = await axios.get("/api/student/admit-card");
        setAdmitData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load admit card");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmitCard();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => admitCardRef.current,
  });

  if (loading) {
    return <div className="text-center py-8">Loading admit card...</div>;
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  if (!admitData) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-end mb-4">
        <button
          onClick={handlePrint}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Print Admit Card
        </button>
      </div>

      <div
        ref={admitCardRef}
        className="p-8 bg-white border border-gray-200 rounded-lg shadow-md"
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">SPSSVMIC</h1>
          <p className="text-gray-600">Admission Test Admit Card</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-2">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-2 border-b pb-1">
                  Candidate Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{admitData.student.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">
                      {new Date(admitData.student.dob).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Applying For</p>
                    <p className="font-medium">
                      {admitData.student.applying_for}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Roll Number</p>
                    <p className="font-medium">{admitData.exam.roll_number}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2 border-b pb-1">
                  Exam Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">
                      {new Date(admitData.exam.exam_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium">{admitData.exam.exam_time}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Center</p>
                    <p className="font-medium">{admitData.exam.exam_center}</p>
                    <p className="text-sm text-gray-600">
                      {admitData.exam.exam_center_address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-32 h-32 border border-gray-300 mb-4 overflow-hidden">
              {admitData.student.photo_url ? (
                <img
                  src={admitData.student.photo_url}
                  alt="Student"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Photo</span>
                </div>
              )}
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Candidate Signature</p>
              <div className="h-12 border-b border-gray-400 mt-2 w-32"></div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold mb-2">Instructions:</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Bring this admit card to the examination center.</li>
            <li>Carry a valid photo ID proof (Aadhaar Card/School ID).</li>
            <li>Report at least 30 minutes before the exam time.</li>
            <li>No electronic devices are allowed in the examination hall.</li>
            <li>Follow all COVID-19 safety protocols.</li>
          </ul>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>This is a computer generated document. No signature required.</p>
          <p className="mt-2">© SPSSVMIC {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default AdmitCard;
