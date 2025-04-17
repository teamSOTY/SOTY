import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const InstituteDashboard = () => {
  const [coupons, setCoupons] = useState([]);
  const [couponUsage, setCouponUsage] = useState([]);
  const [form, setForm] = useState({ code: '', discount: '', expiry: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // 🚫 If not logged in, redirect to homepage
        navigate('/');
      } else {
        // ✅ If logged in, fetch coupons
        fetchCouponUsage(user);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchCouponUsage = async (user) => {
    try {
      const token = user && (await user.getIdToken());
      const res = await fetch('https://soty-backend.onrender.com/api/tracking', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setCouponUsage(data.coupons);
    } catch (err) {
      console.error('Error fetching coupon usage:', err);
    }
  };

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigate('/'); // Redirect to homepage
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    if (!form.code || !form.discount || !form.expiry)
      return alert('Fill all fields');

    try {
      const auth = getAuth();
      const user = auth.currentUser ;
      const token = user && (await user.getIdToken());

      const res = await fetch('https://soty-backend.onrender.com/api/coupon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) return alert(data.message || 'Failed to create coupon');

      setCoupons([...coupons, data.coupon]);
      setForm({ code: '', discount: '', expiry: '' });
      fetchCouponUsage(user);
    } catch (err) {
      console.error(err);
      alert('Error creating coupon');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center">🎓 Institute Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Coupon Creation */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto mb-10">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Create a Coupon</h2>
        <form onSubmit={handleCreateCoupon} className="space-y-4">
          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Coupon Code (e.g. SAVE20)"
          />
          <input
            type="number"
            name="discount"
            value={form.discount}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Discount (%)"
          />
          <input
            type="date"
            name="expiry"
            value={form.expiry}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Create Coupon
          </button>
        </form>
      </div>

      {/* Coupon Usage */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-green-600 mb-6">📊 Coupon Usage Report</h2>
        {couponUsage.length === 0 ? (
          <p className="text-gray-500">No coupons created or used yet.</p>
        ) : (
          <div className="space-y-6">
            {couponUsage.map((coupon) => (
              <div
                key={coupon._id}
                className="border border-gray-200 p-4 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-bold text-lg">{coupon.code}</p>
                    <p className="text-sm text-gray-500">
                      Discount: {coupon.discount}% | Expires: {new Date(coupon.expiry).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="bg-gray-100 px-3 py-1 text-sm rounded-full">
                    Used by {coupon.usedBy?.length || 0} students
                  </span>
                </div>

                {coupon.usedBy && coupon.usedBy.length > 0 ? (
                  <ul className="pl-4 list-disc text-sm text-gray-700">
                    {coupon.usedBy.map((student) => (
                      <li key={student._id}>
                        {student.name} – {student.email}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400 italic">Not used yet</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstituteDashboard;