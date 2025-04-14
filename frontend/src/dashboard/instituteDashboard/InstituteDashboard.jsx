import React, { useState } from 'react';

const InstituteDashboard = () => {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({
    code: '',
    discount: '',
    expiry: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!form.code || !form.discount || !form.expiry) return alert("Fill all fields");
    setCoupons([...coupons, form]);
    setForm({ code: '', discount: '', expiry: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Hello, Admin 👋</h1>

      <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Create a Coupon</h2>
        <form onSubmit={handleCreateCoupon} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Coupon Code</label>
            <input
              type="text"
              name="code"
              value={form.code}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="e.g. SAVE10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="e.g. 10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Expiry Date</label>
            <input
              type="date"
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Create Coupon
          </button>
        </form>
      </div>

      {coupons.length > 0 && (
        <div className="mt-8 max-w-xl mx-auto">
          <h3 className="text-lg font-semibold mb-2">Created Coupons</h3>
          <ul className="space-y-2">
            {coupons.map((coupon, index) => (
              <li key={index} className="bg-white p-4 rounded-md shadow-sm flex justify-between">
                <span className="font-medium">{coupon.code}</span>
                <span>{coupon.discount}%</span>
                <span className="text-sm text-gray-600">{coupon.expiry}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InstituteDashboard;
