import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  "pk_test_51RYOss02S6KXSezKTmRKGCD1qShD3miZqi4Yw5GBHVibFuS7F1EPKAwayYxZFWcGSb0XrWxiZonb4GfuMp2ep6c5001Hnianyz"
);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create payment intent
      const {
        data: { clientSecret },
      } = await axios.post(
        "/api/payment/create-intent",
        {
          amount: 10000, // 100 INR in paise
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admissionToken")}`,
          },
        }
      );

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) throw error;

      if (paymentIntent.status === "succeeded") {
        await axios.post(
          "/api/payment/save",
          {
            amount: 100,
            transactionId: paymentIntent.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("admissionToken")}`,
            },
          }
        );

        toast.success("Payment successful!");
        window.location.href = "/admission/dashboard/receipt";
      }
    } catch (err) {
      toast.error(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow"
    >
      <h2 className="text-xl font-bold mb-4">Pay Application Fee (₹100)</h2>
      <div className="mb-4">
        <CardElement className="p-2 border rounded" />
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-2 px-4 rounded text-white ${
          loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Processing..." : "Pay ₹100"}
      </button>
    </form>
  );
};

const Payment = () => (
  <div className="container mx-auto px-4 py-8">
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  </div>
);

export default Payment;
