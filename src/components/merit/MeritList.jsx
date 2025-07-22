import React, { useState, useEffect } from "react";
import axios from "axios";

const MeritList = () => {
  const [meritData, setMeritData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeritList = async () => {
      try {
        const response = await axios.get("/api/student/merit-list");
        setMeritData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load merit list");
      } finally {
        setLoading(false);
      }
    };

    fetchMeritList();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading merit list...</div>;
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  if (!meritData) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Admission Merit List
      </h2>

      <div className="mb-8 p-4 border border-green-200 bg-green-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-green-800">
          Your Result
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded shadow">
            <p className="text-sm text-gray-500">Rank</p>
            <p className="text-2xl font-bold">{meritData.rank}</p>
          </div>
          <div className="bg-white p-3 rounded shadow">
            <p className="text-sm text-gray-500">Score</p>
            <p className="text-2xl font-bold">{meritData.score}%</p>
          </div>
          <div className="bg-white p-3 rounded shadow">
            <p className="text-sm text-gray-500">Status</p>
            <p
              className={`text-xl font-bold ${
                meritData.status === "selected"
                  ? "text-green-600"
                  : meritData.status === "waiting"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {meritData.status.charAt(0).toUpperCase() +
                meritData.status.slice(1)}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Next Steps</h3>
        {meritData.status === "selected" ? (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="font-medium text-blue-800">
              Congratulations! You have been selected for admission.
            </p>
            <p className="mt-2 text-blue-700">
              Please visit the school office with the required documents to
              complete your admission process.
            </p>
            <ul className="mt-3 list-disc pl-5 text-blue-700 space-y-1">
              <li>Original birth certificate</li>
              <li>Transfer certificate (if applicable)</li>
              <li>Previous class mark sheet</li>
              <li>Passport size photographs (2 copies)</li>
              <li>Aadhaar card copy</li>
            </ul>
          </div>
        ) : meritData.status === "waiting" ? (
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="font-medium text-yellow-800">
              You are on the waiting list.
            </p>
            <p className="mt-2 text-yellow-700">
              We will contact you if seats become available. Your current
              waitlist position is {meritData.rank}.
            </p>
          </div>
        ) : (
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="font-medium text-red-800">
              Thank you for your interest in SPSSVMIC.
            </p>
            <p className="mt-2 text-red-700">
              We regret to inform you that you have not been selected for
              admission this year.
            </p>
          </div>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3">Merit List Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Rank
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Applying For
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Score
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className={meritData.rank <= 10 ? "bg-green-50" : ""}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {meritData.rank}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {meritData.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {meritData.applying_for}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {meritData.score}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      meritData.status === "selected"
                        ? "bg-green-100 text-green-800"
                        : meritData.status === "waiting"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {meritData.status.charAt(0).toUpperCase() +
                      meritData.status.slice(1)}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Note: Only your position is shown. The complete merit list is
          displayed at the school notice board.
        </p>
      </div>
    </div>
  );
};

export default MeritList;
