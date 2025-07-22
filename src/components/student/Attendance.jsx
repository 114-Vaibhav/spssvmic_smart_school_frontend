import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StudentAttendance = ({ rollNo }) => {
  const [attendance, setAttendance] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch(
          `/api/student/attendance?month=${month}&year=${year}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          setAttendance(data.attendance);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAttendance();
  }, [rollNo, month, year]);

  const handleMonthChange = (date) => {
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">My Attendance</h2>

      <div className="mb-6">
        <label className="block text-gray-700 mb-1">Select Month</label>
        <DatePicker
          selected={new Date(year, month - 1)}
          onChange={handleMonthChange}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {attendance.length === 0 ? (
        <p>No attendance records found for selected month</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        record.status === "present"
                          ? "bg-green-100 text-green-800"
                          : record.status === "absent"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {record.status.charAt(0).toUpperCase() +
                        record.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentAttendance;
