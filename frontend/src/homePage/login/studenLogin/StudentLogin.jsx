import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../homePage/registration/Firebase';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
  
      // Get Firebase ID token
      const idToken = await firebaseUser.getIdToken();
  
      // Send token to backend to fetch full student profile
      const response = await fetch('https://soty-backend.onrender.com/api/students/login', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
  
      const data = await response.json();
      // console.log("Full student data from backend:", data);
  
      if (data.success) {
        // You can now store this data or route the user
        navigate('/studentDashboard'); // Update to your actual route
      } else {
        setLoginError("Student data not found ⚠️");
      }
  
    } catch (error) {
      console.error("Login error:", error.message);
      setLoginError("Invalid email or password ❌");
    }
  };
  
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Student Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-3 py-2 border rounded-md"
        />
        {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
        <button type="submit" className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md">
          Login
        </button>
      </form>
    </div>
  );
};

export default StudentLogin;
