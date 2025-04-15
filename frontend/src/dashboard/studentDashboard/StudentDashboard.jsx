import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();

          const res = await fetch("https://soty-backend.onrender.com/api/students/login", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json();
          if (data.success) {
            setStudentData(data.student);
          } else {
            console.error("Error fetching student data");
            navigate("/login");
          }
        } catch (error) {
          console.error("Error fetching student data", error);
          navigate("/login");
        } finally {
          setLoading(false);
        }
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      navigate("/"); // Navigate to home
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-600">
            Welcome, {studentData.firstName} {studentData.lastName}
          </h2>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            Logout
          </button>
        </div>

        {studentData ? (
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-emerald-50 p-4 rounded-md shadow">
              <p className="text-gray-700"><span className="font-semibold">Email:</span> {studentData.email}</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-md shadow">
              <p className="text-gray-700"><span className="font-semibold">School:</span> {studentData.schoolName}</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-md shadow">
              <p className="text-gray-700"><span className="font-semibold">Gender:</span> {studentData.gender}</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-md shadow">
              <p className="text-gray-700"><span className="font-semibold">Class:</span> {studentData.class}</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-md shadow">
              <p className="text-gray-700"><span className="font-semibold">Phone:</span> {studentData.phone}</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-md shadow">
              <p className="text-gray-700"><span className="font-semibold">DOB:</span> {new Date(studentData.dob).toLocaleDateString()}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500 mt-4">No student data found.</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
