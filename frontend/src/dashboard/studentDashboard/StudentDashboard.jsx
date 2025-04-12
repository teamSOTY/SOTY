import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Initialize Firebase Auth
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Fetch student data from your backend
          const res = await fetch("http://localhost:5001/api/student", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.getIdToken()}`, // Using Firebase token
            },
          });

          const data = await res.json();
          if (data.success) {
            setStudentData(data.student); // assuming your backend returns student data
          } else {
            console.error("Error fetching student data");
            navigate("/login"); // Redirect to login if data is not found
          }
        } catch (error) {
          console.error("Error fetching student data", error);
          navigate("/login");
        } finally {
          setLoading(false);
        }
      } else {
        // If no user is logged in, redirect to login page
        navigate("/login");
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, [auth, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Welcome to Your Dashboard</h2>
        
        {studentData ? (
          <div>
            <p className="text-lg text-gray-700">Name: {studentData.name}</p>
            <p className="text-lg text-gray-700">Email: {studentData.email}</p>
            <p className="text-lg text-gray-700">Institute: {studentData.institute}</p>
            <p className="text-lg text-gray-700">Scholarship Status: {studentData.scholarshipStatus}</p>
          </div>
        ) : (
          <p>No student data found.</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
