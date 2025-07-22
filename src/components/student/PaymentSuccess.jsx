import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(null);

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const sessionId = params.get("session_id");
        const feeId = params.get("fee_id");

        if (!sessionId || !feeId) {
          throw new Error("Missing payment information");
        }

        await axios.get("/api/student/confirm-payment", {
          params: { session_id: sessionId, fee_id: feeId },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log("payment confirmation initiated");
        setSuccess(true);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [location]);

  // Set countdown seconds based on success/failure once loading ends
  useEffect(() => {
    if (!loading) {
      setSecondsLeft(success ? 10 : 60);
    }
  }, [loading, success]);

  // Countdown timer effect
  useEffect(() => {
    if (secondsLeft === null) return;

    if (secondsLeft === 0) {
      navigate("/student/dashboard");
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
          <p className="text-gray-700 text-lg">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="flex items-center justify-center p-20 bg-gray-100 px-4">
        {/* <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4"> */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
          {success ? (
            <div className="success">
              <h2 className="text-2xl font-semibold text-green-600 mb-4">
                Payment Successful!
              </h2>
              <p className="text-gray-700 mb-6">
                Your fee payment has been processed successfully.
              </p>
              <p className="text-gray-600 mb-6">
                You will be redirected to the dashboard in{" "}
                <span className="font-semibold">{secondsLeft}</span> seconds.
              </p>
              <button
                onClick={() => navigate("/student/dashboard")}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded transition"
              >
                Return to Dashboard
              </button>
            </div>
          ) : (
            <div className="error">
              <h2 className="text-2xl font-semibold text-red-600 mb-4">
                Payment Verification Failed
              </h2>
              <p className="text-gray-700 mb-6">{error}</p>
              <p className="text-gray-600 mb-6">
                You will be redirected to the dashboard in{" "}
                <span className="font-semibold">{secondsLeft}</span> seconds.
              </p>
              <button
                onClick={() => navigate("/student/dashboard")}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded transition"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PaymentSuccess;
