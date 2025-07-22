import React, { useState } from "react";

const UpdateResults = () => {
  const [rollNo, setRollNo] = useState("");
  const [student, setStudent] = useState(null);
  const [results, setResults] = useState({
    exam_type: "quarterly",
    academic_year: "2023-2024",
    hindi: "0",
    english: "0",
    mathematics: "0",
    drawing: "0",
    science: "0",
    social_science: "0",
    computer: "0",
    physics: "0",
    chemistry: "0",
    biology: "0",
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

        // Fetch existing results if any
        const resResponse = await fetch(
          `/api/faculty/results?roll_no=${rollNo}&exam_type=${results.exam_type}&academic_year=${results.academic_year}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const resData = await resResponse.json();

        if (resData.success && resData.results.length > 0) {
          setResults(resData.results[0]);
        }
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
    setResults((prev) => ({
      ...prev,
      [name]: value === "" ? parseInt(0) : parseInt(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/faculty/update-result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          roll_no: rollNo,
          ...results,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Results updated successfully");
      } else {
        alert("Failed to update results");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating results");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">
        Update Student Results
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">Exam Type</label>
              <select
                name="exam_type"
                value={results.exam_type}
                onChange={(e) =>
                  setResults((prev) => ({ ...prev, exam_type: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="quarterly">Quarterly</option>
                <option value="half-yearly">Half Yearly</option>
                <option value="final">Final</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Academic Year</label>
              <input
                type="text"
                name="academic_year"
                value={results.academic_year}
                onChange={(e) =>
                  setResults((prev) => ({
                    ...prev,
                    academic_year: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border">Subject</th>
                  <th className="py-2 px-4 border">Marks (out of 100)</th>
                </tr>
              </thead>
              <tbody>
                {student.class.startsWith("9") ||
                student.class.startsWith("10") ? (
                  <>
                    <tr>
                      <td className="py-2 px-4 border">Hindi</td>
                      <td className="py-2 px-4 border">
                        <input
                          type="number"
                          name="hindi"
                          value={results.hindi || ""}
                          onChange={handleChange}
                          min="0"
                          max="100"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border">English</td>
                      <td className="py-2 px-4 border">
                        <input
                          type="number"
                          name="english"
                          value={results.english || ""}
                          onChange={handleChange}
                          min="0"
                          max="100"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>
                    </tr>
                    {/* Add other subjects for high school */}
                  </>
                ) : (
                  <>
                    <tr>
                      <td className="py-2 px-4 border">Physics</td>
                      <td className="py-2 px-4 border">
                        <input
                          type="number"
                          name="physics"
                          value={results.physics || ""}
                          onChange={handleChange}
                          min="0"
                          max="100"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border">Chemistry</td>
                      <td className="py-2 px-4 border">
                        <input
                          type="number"
                          name="chemistry"
                          value={results.chemistry || ""}
                          onChange={handleChange}
                          min="0"
                          max="100"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>
                    </tr>
                    {/* Add other subjects for intermediate */}
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Update Results
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateResults;
