import React, { useState, useEffect } from "react";

const StudentResults = ({ rollNo }) => {
  const [results, setResults] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/student/results`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setResults(data.results);
          if (data.results.length > 0) {
            setSelectedExam(data.results[0]);
          }
        } else {
          setResults([]);
          setSelectedExam(null);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchResults();
  }, []);

  // List of subjects to display (adjust as per your backend)
  const subjects = [
    "hindi",
    "english",
    "mathematics",
    "drawing",
    "science",
    "social_science",
    "computer",
    "physics",
    "chemistry",
    "biology",
  ];

  // Helper to format subject name nicely
  const formatSubjectName = (subj) =>
    subj
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">My Results</h2>

      {results.length === 0 ? (
        <p>No results found</p>
      ) : (
        <div>
          {/* Exam selection dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Select Exam</label>
            <select
              value={results.findIndex(
                (r) =>
                  r.exam_type === selectedExam?.exam_type &&
                  r.academic_year === selectedExam?.academic_year
              )}
              onChange={(e) => setSelectedExam(results[e.target.value])}
              className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {results.map((result, index) => (
                <option key={index} value={index}>
                  {result.exam_type.toUpperCase()} ({result.academic_year})
                </option>
              ))}
            </select>
          </div>

          {/* Display selected exam marks */}
          {selectedExam && (
            <div>
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border">Subject</th>
                      <th className="py-2 px-4 border">Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map(
                      (subject) =>
                        selectedExam[subject] !== null &&
                        selectedExam[subject] !== undefined && (
                          <tr key={subject}>
                            <td className="py-2 px-4 border">
                              {formatSubjectName(subject)}
                            </td>
                            <td className="py-2 px-4 border">
                              {selectedExam[subject]}
                            </td>
                          </tr>
                        )
                    )}

                    <tr className="bg-gray-50">
                      <td className="py-2 px-4 border font-semibold">Total</td>
                      <td className="py-2 px-4 border font-semibold">
                        {selectedExam.total}
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-2 px-4 border font-semibold">
                        Percentage
                      </td>
                      <td className="py-2 px-4 border font-semibold">
                        {selectedExam.percentage !== null &&
                        selectedExam.percentage !== undefined
                          ? `${parseFloat(selectedExam.percentage).toFixed(2)}%`
                          : "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Print Result
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentResults;
