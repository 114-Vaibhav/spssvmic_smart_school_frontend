import React, { useState, useEffect } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

const AdmitCard = () => {
  const [admitData, setAdmitData] = useState(null);
  const [loading, setLoading] = useState(true);
  const admitCardRef = React.useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("sending req to backend for admitcard");
        const response = await axios.get("/api/admission/admit-card", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admissionToken")}`,
          },
        });
        setAdmitData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => admitCardRef.current,
  });

  if (loading) return <div>Loading...</div>;
  if (!admitData) return <div>Admit card not available yet</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-end mb-4">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Print Admit Card
        </button>
      </div>

      <div ref={admitCardRef} className="bg-white p-6 border-2 border-gray-300">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">SPSSVMIC</h1>
          <p className="text-gray-600">Admit Card for Entrance Test</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="col-span-2">
            <p>
              <strong>Name:</strong> {admitData.name}
            </p>
            <p>
              <strong>Father's Name:</strong> {admitData.father_name}
            </p>
            <p>
              <strong>Applying For:</strong> Class {admitData.applying_for}
            </p>
            <p>
              <strong>Roll Number:</strong> {admitData.rollNumber}
            </p>
          </div>
          <div className="flex justify-end">
            <img
              src={`${process.env.REACT_APP_API_URL}/uploads/${admitData.photo}`}
              alt="Student"
              className="h-24 w-24 border"
            />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-bold border-b pb-1 mb-2">Exam Details</h2>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(admitData.examDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong> {admitData.examTime}
          </p>
          <p>
            <strong>Center:</strong> {admitData.examCenter}
          </p>
        </div>

        <div className="text-sm text-gray-600">
          <p className="font-bold">Instructions:</p>
          <ul className="list-disc pl-5">
            <li>Bring this admit card to the exam center</li>
            <li>Carry original ID proof</li>
            <li>Report 30 minutes before exam time</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdmitCard;
