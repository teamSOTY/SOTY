import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserCircle, LogOut, BookOpen, Mail, Phone, Cake, School, User } from "lucide-react";

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

          const res = await fetch("https://soty-backend-n1b1.onrender.com/api/students/login", {
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
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-emerald-700 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with logout button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm bg-white hover:bg-gray-50 text-emerald-700 px-4 py-2 rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow font-medium"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
        
        {/* Main Dashboard Content */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {studentData ? (
            <>
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 p-8 text-white">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative">
                    {studentData.profilePhoto ? (
                      <img 
                        src={studentData.profilePhoto} 
                        alt="Profile" 
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center border-4 border-white shadow-lg">
                        <UserCircle size={64} className="text-emerald-300" />
                      </div>
                    )}
                  </div>
                  <div className="text-center sm:text-left">
                    <h1 className="text-3xl font-bold">
                      {studentData.firstName} {studentData.lastName}
                    </h1>
                    <p className="text-emerald-50 mt-1">{studentData.schoolName}</p>
                  </div>
                </div>
              </div>

              {/* Student Details */}
              <div className="p-6 md:p-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
                  Student Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3 group transition-all p-4 rounded-xl hover:bg-emerald-50 hover:shadow-sm">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Email Address</p>
                      <p className="text-gray-800 font-medium">{studentData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 group transition-all p-4 rounded-xl hover:bg-emerald-50 hover:shadow-sm">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                      <School size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">School</p>
                      <p className="text-gray-800 font-medium">{studentData.schoolName}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group transition-all p-4 rounded-xl hover:bg-emerald-50 hover:shadow-sm">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Gender</p>
                      <p className="text-gray-800 font-medium">{studentData.gender}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group transition-all p-4 rounded-xl hover:bg-emerald-50 hover:shadow-sm">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Class</p>
                      <p className="text-gray-800 font-medium">{studentData.class}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group transition-all p-4 rounded-xl hover:bg-emerald-50 hover:shadow-sm">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Phone Number</p>
                      <p className="text-gray-800 font-medium">{studentData.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group transition-all p-4 rounded-xl hover:bg-emerald-50 hover:shadow-sm">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                      <Cake size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Date of Birth</p>
                      <p className="text-gray-800 font-medium">{new Date(studentData.dob).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="px-8 py-4 bg-gray-50 text-center">
                <p className="text-sm text-gray-500">© {new Date().getFullYear()} Student Dashboard | Last login: {new Date().toLocaleDateString()}</p>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <div className="rounded-full bg-red-50 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <UserCircle size={32} className="text-red-500" />
              </div>
              <p className="text-red-500 font-medium">No student data found. Please try logging in again.</p>
              <button 
                onClick={() => navigate("/login")}
                className="mt-4 text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition"
              >
                Return to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;