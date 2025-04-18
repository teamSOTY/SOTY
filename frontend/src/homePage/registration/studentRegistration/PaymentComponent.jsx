import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentComponent = () => {
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [finalAmount, setFinalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [couponStatus, setCouponStatus] = useState("");

  // ✅ Fetch initial amount on mount (no coupon)
  useEffect(() => {
    const fetchInitialAmount = async () => {
      try {
        const res = await fetch("https://soty-backend.onrender.com/api/payment/prepare-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ coupon: null }),
        });

        const data = await res.json();
        if (data.success) {
          setFinalAmount(data.amount);
        }
      } catch (err) {
        console.error("❌ Error fetching initial amount:", err);
      }
    };

    fetchInitialAmount();
  }, []);

  // ✅ Apply coupon by calling the same endpoint
  const applyCoupon = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://soty-backend.onrender.com/api/payment/prepare-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coupon:coupon ===''?null:coupon,   studentId: 'your_student_id' }),
      });

      const data = await res.json();

      if (data.success) {
        setFinalAmount(data.amount);
        setCouponStatus("✅ Coupon applied successfully!");
      } else {
        setCouponStatus("❌ Invalid coupon.");
        setFinalAmount(500); // fallback
      }
    } catch (err) {
      setCouponStatus("❌ Something went wrong.");
      setFinalAmount(500);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      // ✅ Re-validate amount on payment (for safety)
      const prepRes = await fetch("https://soty-backend.onrender.com/api/payment/prepare-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coupon }),
      });

      const prepData = await prepRes.json();
      const amount = prepData.amount;
      setFinalAmount(amount);

      // ✅ Create Razorpay Order
      const res = await fetch("https://soty-backend.onrender.com/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency: "INR" }),
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
          const verifyRes = await fetch("https://soty-backend.onrender.com/api/payment/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const result = await verifyRes.json();
          alert(result.message);

          if (result.success) {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Complete Your Payment</h2>

        <div className="mb-4">
          <p className="text-lg text-gray-700 font-medium">Amount to Pay:</p>
          <p className="text-3xl font-bold text-emerald-600">₹{finalAmount}</p>
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
          {loading ? "Processing..." : `Pay Now ₹${finalAmount}`}
        </button>
      </div>
    </div>
  );
};

export default PaymentComponent;
