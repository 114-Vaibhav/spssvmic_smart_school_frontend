import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateAttendance = () => {
  const [rollNo, setRollNo] = useState("");
  const [absentRollNos, setAbsentRollNos] = useState("");
  const [date, setDate] = useState(new Date());
  const [student, setStudent] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const absentList = absentRollNos
        .split(",")
        .map((r) => r.trim())
        .filter((r) => r !== "");

      const response = await fetch("/api/faculty/update-attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          date: date.toISOString().split("T")[0],
          absent_roll_nos: absentList,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Attendance updated successfully");
        setAbsentRollNos("");
      } else {
        alert("Failed to update attendance");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating attendance");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">
        Update Student Attendance
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Search Student</h3>
          <form onSubmit={handleSearch} className="mb-6">
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">
                Student Roll No
              </label>
              <input
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>

          {student && (
            <div className="p-4 bg-blue-50 rounded-lg">
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
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Mark Absentees</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Date</label>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">
                Absent Roll Numbers (comma separated)
              </label>
              <textarea
                value={absentRollNos}
                onChange={(e) => setAbsentRollNos(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="e.g., 1025001, 1025002, 1025003"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Update Attendance
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateAttendance;
