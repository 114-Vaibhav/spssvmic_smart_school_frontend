import React, { useState, useEffect } from "react";
import axios from "axios";

const Result = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admission/result", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admissionToken")}`,
          },
        });
        setResult(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading results...</div>;
  if (!result) return <div>Results not declared yet</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Entrance Test Result</h2>

      <div className="mb-6 p-4 bg-blue-50 rounded">
        <p className="font-semibold">
          Your Status:
          <span
            className={`ml-2 ${
              result.status === "Selected" ? "text-green-600" : "text-red-600"
            }`}
          >
            {result.status}
          </span>
        </p>
        {result.rank && (
          <p className="mt-2">
            Your Rank: <span className="font-bold">{result.rank}</span>
          </p>
        )}
      </div>

      {result.status === "Selected" && (
        <div className="border-t pt-4">
          <h3 className="font-bold mb-2">Next Steps:</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              Complete admission formalities by{" "}
              {new Date(result.deadline).toLocaleDateString()}
            </li>
            <li>Pay the admission fee</li>
            <li>Submit required documents</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default Result;
