import React, { useState } from "react";

const UpdateFees = () => {
  const [rollNo, setRollNo] = useState("");
  const [student, setStudent] = useState(null);
  const [feeData, setFeeData] = useState({
    fee_type: "tuition",
    amount: "",
    due_date: "",
    academic_year: "2023-2024",
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/faculty/student/${rollNo}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();

      if (data.success) {
        setStudent(data.student);
      } else {
        alert("Student not found");
      }
    } catch (err) {
      console.error(err);
      alert("Error searching student");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/faculty/update-fees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          roll_no: rollNo,
          ...feeData,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Fee record added successfully");
        setFeeData({
          fee_type: "tuition",
          amount: "",
          due_date: "",
          academic_year: "2023-2024",
        });
      } else {
        alert("Failed to add fee record");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding fee record");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">
        Update Student Fees
      </h2>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 mb-1">Student Roll No</label>
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mt-auto">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {student && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-4">
            <img
              src={student.photo || "/default-profile.jpg"}
              alt="Student"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-bold">{student.name}</h3>
              <p>
                Roll No: {student.roll_no} | Class: {student.class}
              </p>
            </div>
          </div>
        </div>
      )}

      {student && (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">Fee Type</label>
              <select
                name="fee_type"
                value={feeData.fee_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="tuition">Tuition Fee</option>
                <option value="admission">Admission Fee</option>
                <option value="exam">Exam Fee</option>
                <option value="transport">Transport Fee</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Academic Year</label>
              <input
                type="text"
                name="academic_year"
                value={feeData.academic_year}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Amount (₹)</label>
              <input
                type="number"
                name="amount"
                value={feeData.amount}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                name="due_date"
                value={feeData.due_date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Add Fee Record
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateFees;
