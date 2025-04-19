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

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
    
  //   // If the field is 'code', make it uppercase and remove spaces and special characters
  //   let updatedValue = value;
  //   if (name === 'code') {
  //     updatedValue = updatedValue.toUpperCase().replace(/\s+/g, '').replace(/[^A-Z0-9]/g, '');
  //   }
  
  //   setForm({ ...form, [name]: updatedValue });
  // };

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };
  
  const handleGenerateCoupon = async () => {
    const code = generateRandomCode();
  
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const token = user && (await user.getIdToken());
  
      const res = await fetch('https://soty-backend.onrender.com/api/coupon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code }),
      });
  
      const data = await res.json();
  
      if (!res.ok) return alert(data.message || 'Failed to create coupon');
  
      setCoupons([...coupons, data.coupon]);
      fetchCouponUsage(user);
      alert(`🎉 Coupon "${code}" created successfully!`);
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
      {/* Coupon Creation */}
<div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto mb-10">
  <h2 className="text-xl font-semibold mb-4 text-blue-600">Generate a Coupon</h2>
  <p className="text-sm text-gray-600 mb-4">Each coupon gives ₹50 off and is valid for 4 days.</p>
  <button
    onClick={handleGenerateCoupon}
    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
  >
    Generate Coupon
  </button>
</div>


      {/* Coupon Usage */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-green-600 mb-6">📊 Coupon Usage Report</h2>
        {couponUsage.length === 0 ? (
          <p className="text-gray-500">No coupons created or used yet.</p>
        ) : (
          <div className="space-y-6">
            {couponUsage.map((coupon) => (
              <div key={coupon._id}
                className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-bold text-lg">{coupon.code}</p>
                    <p className="text-sm text-gray-500">
                      Discount: ₹{coupon.discount} | Expires: {new Date(coupon.expiry).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="bg-gray-100 px-3 py-1 text-sm rounded-full">
                    Used by {coupon.usedBy?.length || 0}/15 students
                  </span>
                  {coupon.usedBy.length >= 15 && (
        <p className="text-sm text-red-500 font-medium mt-1">⚠️ Usage limit reached</p>
      )}

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