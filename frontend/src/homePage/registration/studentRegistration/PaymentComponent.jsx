import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentComponent = () => {
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [finalAmount, setFinalAmount] = useState(199);
  const [loading, setLoading] = useState(false);
  const [couponStatus, setCouponStatus] = useState("");

  // ✅ Fetch initial amount on mount (no coupon)
  useEffect(() => {
    const fetchInitialAmount = async () => {
      try {
        const res = await fetch("https://soty-backend-n1b1.onrender.com/api/payment/prepare-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ coupon: null }),
        });

        const data = await res.json();
        if (data.success && data.amount) {
          setFinalAmount(data.amount);
        }else {
          // Ensure we have a default amount if API doesn't return one
          setFinalAmount(199);
        }
      } catch (err) {
        console.error("❌ Error fetching initial amount:", err);
        setFinalAmount(199);
      }
    };

    fetchInitialAmount();
  }, []);

  // ✅ Apply coupon by calling the same endpoint
  const applyCoupon = async () => {
    if (coupon.trim() === "") {
      setCouponStatus("❌ Please enter a coupon code first.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("https://soty-backend-n1b1.onrender.com/api/payment/prepare-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coupon: coupon === "" ? null : coupon,
          studentId: localStorage.getItem("studentId"),
        }),
      });

      const data = await res.json();

      if (data.success  && data.amount) {
        setFinalAmount(data.amount);
        setCouponStatus("✅ Coupon applied successfully!");
      } else {
        setCouponStatus(`❌ ${data.message || "Invalid or expired coupon."}`);
        setFinalAmount(199); // fallback
        
      }
    } catch (err) {
      console.error("Coupon error:", err);
      setCouponStatus("❌ Something went wrong.");
      setFinalAmount(199);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    const paymentAmount = finalAmount || 199;
    setLoading(true);
    try {
  // ✅ Check if studentId exists before proceeding
  const studentId = localStorage.getItem("studentId");
  if (!studentId) {
    alert("❌ Student ID is missing. Please log in or refresh the page.");
    return; // Stop further execution
  }

      // ✅ Re-validate amount on payment (for safety)
      const prepRes = await fetch("https://soty-backend-n1b1.onrender.com/api/payment/prepare-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coupon }),
      });

      const prepData = await prepRes.json();
      const amount = prepData.amount;
          // Ensure the amount is valid
    if (amount <= 0) {
      alert("❌ Invalid amount received from server. Please try again.");
      return;
    }
      setFinalAmount(amount);

      // ✅ Create Razorpay Order
      const res = await fetch("https://soty-backend-n1b1.onrender.com/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount:paymentAmount, currency: "INR" }),
      });

      const order = await res.json();

      // ✅ Razorpay Options
      const options = {
        key: "rzp_live_HvYgZPAU9zltEf", // Replace with your Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: "SOTY",
        description: "Secure Payment",
        order_id: order.id,
        handler: async function (response) {
          const studentId = localStorage.getItem("studentId");

          if (!studentId) {
            alert("❌ Student ID is missing. Please refresh page or login again or contact our team.");
            return;
          }

          const verifyRes = await fetch("https://soty-backend-n1b1.onrender.com/api/payment/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({...response, studentId}),
          });

          const result = await verifyRes.json();
          alert(result.message);

          if (result.success) {
            localStorage.removeItem("studentId");
            navigate("/studentDashboard");
          } else {
            alert("❌ Payment verification failed");
          }
        },
        prefill: {
          name: "Sid",
          email: "sid@example.com",
          contact: "9999999999",
        },
        theme: { color: "#10b981" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("❌ Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };
    // Always show a fallback amount if finalAmount is somehow undefined
    const displayAmount = finalAmount || 199;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Complete Your Payment</h2>

        <div className="mb-4">
          <p className="text-lg text-gray-700 font-medium">Amount to Pay:</p>
          <p className="text-3xl font-bold text-emerald-600">₹{displayAmount}</p>
        </div>

        <div className="my-6">
          <label className="block text-sm font-semibold mb-2">Have a coupon?</label>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              onClick={applyCoupon}
              disabled={loading}
              className={`px-4 py-2 bg-emerald-500 text-white rounded-r-md font-semibold hover:bg-emerald-600 transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Apply
            </button>
          </div>
          {couponStatus && (
            <p
              className={`mt-2 text-sm ${
                couponStatus.startsWith("✅") ? "text-green-600" : "text-red-500"
              }`}
            >
              {couponStatus}
            </p>
          )}
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-3 rounded-md text-white font-semibold text-lg bg-emerald-500 hover:bg-emerald-600 transition duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing..." : `Pay Now ₹${displayAmount}`}
        </button>
      </div>
    </div>
  );
};

export default PaymentComponent;
