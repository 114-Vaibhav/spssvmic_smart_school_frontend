import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const StudentFees = ({ rollNo }) => {
  const [fees, setFees] = useState([]);
  const [selectedFee, setSelectedFee] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await fetch(`/api/student/fees`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setFees(data.fees);
        }
      } catch (err) {
        console.error("Failed to fetch fees:", err);
        setError("Failed to load fee data. Please try again.");
      }
    };

    fetchFees();
  }, [rollNo]);
  const handlePayFee = async () => {
    console.log("handlePayFee called");
    console.log("Selected fee:", selectedFee);
    console.log("Payment amount:", paymentAmount);

    if (!selectedFee || !paymentAmount || parseFloat(paymentAmount) <= 0) {
      setError("Please select a fee and enter a valid amount");
      console.warn("Validation failed: invalid fee or payment amount");
      return;
    }

    const amount = parseFloat(paymentAmount);
    const balance = selectedFee.amount - selectedFee.paid_amount;

    console.log(`Parsed amount: ${amount}, Balance: ${balance}`);

    if (amount > balance) {
      const errorMsg = `Payment amount cannot exceed the balance of ₹${balance.toFixed(
        2
      )}`;
      setError(errorMsg);
      console.warn("Validation failed:", errorMsg);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("Sending payment request to /api/student/pay-fees");
      const response = await fetch("/api/student/pay-fees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          fee_id: selectedFee.id,
          amount: paymentAmount,
        }),
      });

      const data = await response.json();
      console.log("Response from payment API:", data);

      if (!response.ok || !data.id) {
        const errorMsg = data.message || "Failed to create checkout session";
        console.error("API error:", errorMsg);
        throw new Error(errorMsg);
      }

      console.log("Loading Stripe with publishable key");
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      );

      console.log("Redirecting to Stripe checkout with session ID:", data.id);
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.id,
      });

      if (stripeError) {
        console.error("Stripe redirect error:", stripeError);
        throw stripeError;
      }

      // Store payment info in localStorage in case redirect fails
      localStorage.setItem(
        "pendingPayment",
        JSON.stringify({
          feeId: selectedFee.id,
          amount: paymentAmount,
          timestamp: Date.now(),
        })
      );
      console.log("Stored pendingPayment in localStorage");
    } catch (err) {
      console.error("Payment error caught:", err);
      setError(err.message || "Payment processing failed");
      setLoading(false);
    }
  };

  // const handlePayFee = async () => {
  //   if (!selectedFee || !paymentAmount || parseFloat(paymentAmount) <= 0) {
  //     setError("Please select a fee and enter a valid amount");
  //     return;
  //   }

  //   const amount = parseFloat(paymentAmount);
  //   const balance = selectedFee.amount - selectedFee.paid_amount;

  //   if (amount > balance) {
  //     setError(
  //       `Payment amount cannot exceed the balance of ₹${balance.toFixed(2)}`
  //     );
  //     return;
  //   }

  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await fetch("/api/student/pay-fees", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       body: JSON.stringify({
  //         fee_id: selectedFee.id,
  //         amount: paymentAmount,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (!response.ok || !data.id) {
  //       throw new Error(data.message || "Failed to create checkout session");
  //     }

  //     const stripe = await loadStripe(
  //       import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  //     );
  //     const { error: stripeError } = await stripe.redirectToCheckout({
  //       sessionId: data.id,
  //     });

  //     if (stripeError) {
  //       throw stripeError;
  //     }

  //     // Store payment info in localStorage in case redirect fails
  //     localStorage.setItem(
  //       "pendingPayment",
  //       JSON.stringify({
  //         feeId: selectedFee.id,
  //         amount: paymentAmount,
  //         timestamp: Date.now(),
  //       })
  //     );
  //   } catch (err) {
  //     console.error("Payment error:", err);
  //     setError(err.message || "Payment processing failed");
  //     setLoading(false);
  //   }
  // };

  // Check for pending payments on component mount
  useEffect(() => {
    const pendingPayment = localStorage.getItem("pendingPayment");
    if (pendingPayment) {
      const { feeId, amount, timestamp } = JSON.parse(pendingPayment);

      // Only consider payments from the last 30 minutes
      if (Date.now() - timestamp < 30 * 60 * 1000) {
        const fee = fees.find((f) => f.id === feeId);
        console.log("fee.amount:", fee.amount, "type:", typeof fee.amount);
        if (fee) {
          setSelectedFee(fee);
          setPaymentAmount(amount);
          setError("You have a pending payment. Please complete or cancel it.");
        }
      } else {
        localStorage.removeItem("pendingPayment");
      }
    }
  }, [fees]);

  const handleMaxAmount = () => {
    if (selectedFee) {
      // console.log(
      //   "fee.amount:",
      //   selectedFee.amount,
      //   "type:",
      //   typeof selectedFee.amount
      // );
      const balance = (selectedFee.amount - selectedFee.paid_amount).toFixed(2);
      setPaymentAmount(balance);
    }
  };
  const handleChange = (e) => {
    const val = e.target.value;
    // Allow only numbers and decimals
    if (/^\d*\.?\d*$/.test(val)) {
      // setPayAmount(val);
      // setError(null);
      const numVal = parseFloat(val);
      var maxAmount = 0;

      maxAmount = (selectedFee.amount - selectedFee.paid_amount).toFixed(2);

      console.log("value: ", val);
      console.log("numvalue: ", numVal);
      if (!numVal || numVal <= 0) {
        setError("Enter a valid amount");
      } else if (numVal > maxAmount) {
        setError(`Amount cannot exceed ₹${Number(maxAmount).toFixed(2)}`);
      } else if (numVal % 50 !== 0) {
        setError("Amount must be multiple of ₹50");
      } else {
        setError("");
      }
      setPaymentAmount(val);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">My Fees</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Fee Records</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border">Fee Type</th>
                  <th className="py-2 px-4 border">Amount</th>
                  <th className="py-2 px-4 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((fee) => (
                  <tr
                    key={fee.id}
                    className={`cursor-pointer ${
                      selectedFee?.id === fee.id ? "bg-blue-50" : ""
                    } hover:bg-gray-50`}
                    onClick={() => {
                      setSelectedFee(fee);
                      setError(null);
                    }}
                  >
                    <td className="py-2 px-4 border">{fee.fee_type}</td>
                    <td className="py-2 px-4 border">
                      ₹{parseFloat(fee.amount).toFixed(2)}
                      {/* ₹{fee.amount} */}
                    </td>
                    <td className="py-2 px-4 border">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          fee.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : fee.status === "partial"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {fee.status.charAt(0).toUpperCase() +
                          fee.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          {selectedFee ? (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Fee Details</h4>
              <div className="space-y-2 mb-4">
                <p>
                  <span className="font-medium">Fee Type:</span>{" "}
                  {selectedFee.fee_type}
                </p>
                <p>
                  <span className="font-medium">Academic Year:</span>{" "}
                  {selectedFee.academic_year}
                </p>
                <p>
                  <span className="font-medium">Due Date:</span>{" "}
                  {new Date(selectedFee.due_date).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Total Amount:</span> ₹
                  {/* {selectedFee.amount} */}
                  {parseFloat(selectedFee.amount).toFixed(2)}
                </p>
                <p>
                  <span className="font-medium">Paid Amount:</span> ₹
                  {/* {selectedFee.paid_amount} */}
                  {parseFloat(selectedFee.paid_amount).toFixed(2)}
                </p>
                <p>
                  <span className="font-medium">Balance:</span> ₹
                  {(selectedFee.amount - selectedFee.paid_amount).toFixed(2)}
                  {/* {selectedFee.amount - selectedFee.paid_amount} */}
                </p>
              </div>

              {selectedFee.status !== "paid" && (
                <div>
                  <h4 className="font-semibold mb-2">Make Payment</h4>
                  <div className="mb-3">
                    <label className="block text-gray-700 mb-1">
                      Amount to Pay (₹)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={paymentAmount}
                        onChange={handleChange}
                        // onChange={(e) => {
                        //   setPaymentAmount(e.target.value);
                        //   setError(null);
                        // }}
                        min="0.01"
                        // max={selectedFee.amount - selectedFee.paid_amount}
                        max={(
                          selectedFee.amount - selectedFee.paid_amount
                        ).toFixed(2)}
                        step="0.01"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleMaxAmount}
                        className="px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-sm"
                      >
                        Max
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handlePayFee}
                    disabled={loading}
                    className={`px-4 py-2 text-white rounded transition ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {loading ? "Processing..." : "Pay Now"}
                  </button>
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Print Receipt
                </button>
                <button
                  onClick={() => {
                    setSelectedFee(null);
                    setPaymentAmount("");
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-center h-full">
              <p className="text-gray-500">
                Select a fee record to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentFees;
