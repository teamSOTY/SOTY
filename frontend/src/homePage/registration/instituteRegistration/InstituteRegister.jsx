import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

const InstituteRegister = () => {
   const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  // Step 1 States
  const [instituteName, setInstituteName] = useState("");
  const [instituteAddress, setInstituteAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  // Step 2 States
  const [ownerFirstName, setOwnerFirstName] = useState("");
  const [ownerLastName, setOwnerLastName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [studentCount, setStudentCount] = useState("");

  const handleRegister = async () => {
    if (nextButtonDisabled) return;
    setNextButtonDisabled(true);
setTimeout(() => setNextButtonDisabled(false), 15000);


    // Validation
    if (
      !instituteName ||
      !instituteAddress ||
      !email ||
      !contact ||
      !ownerFirstName ||
      !ownerLastName ||
      !ownerEmail ||
      !password ||
      !phoneNumber ||
      !studentCount
    ) {
      alert("Please fill out all required fields before submitting!");
      return;
    }

    
  try {
    // Create Firebase User
    const userCredential = await createUserWithEmailAndPassword(auth, ownerEmail, password);
    const firebaseUid = userCredential.user.uid;

    // Prepare data with Firebase UID
    const instituteData = {
      instituteName,
      instituteAddress,
      email,
      contact,
      role: "admin",
      owner: {
        firstName: ownerFirstName,
        lastName: ownerLastName,
        email: ownerEmail,
        phoneNumber,
       
      },
      firebaseUid,
      studentCount,
    };

    // Send data to your backend
    const response = await fetch("https://soty-backend.onrender.com/api/institute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(instituteData),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      navigate("/instituteDashboard");
    } else {
      alert(data.message || "Registration failed");
    }

  } catch (error) {
    console.error("Error during registration:", error);
    if (error.code === "auth/email-already-in-use") {
      alert("Email is already in use.");
    } else {
      alert("Something went wrong during registration.");
    }
  }
};

  const renderStep1 = () => (
    <form className="grid grid-cols-2 gap-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium">Institute Name <span className="text-gray-500">संस्थान का नाम</span></label>
        <input type="text" value={instituteName} onChange={(e) => setInstituteName(e.target.value)}
          placeholder="Institute Name" className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09a375]" />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">Address of Institution <span className="text-gray-500">संस्थान का पता</span></label>
        <input type="text" value={instituteAddress} onChange={(e) => setInstituteAddress(e.target.value)}
          placeholder="Address Of Institution" className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09a375]" />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">Email Id <span className="text-gray-500">ईमेल आईडी</span></label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Id" className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09a375]" />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">Contact No <span className="text-gray-500">संपर्क नंबर</span></label>
        <input type="tel" value={contact} onChange={(e) => setContact(e.target.value)}
          placeholder="Contact No" className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09a375]" />
      </div>
      <div className="col-span-2">
        <button type="button" onClick={() => setCurrentStep(2)}
          className="w-full bg-[#09a375] text-white py-2 rounded-md font-semibold hover:bg-[#088a64]">
          Next
        </button>
      </div>
    </form>
  );

  const renderStep2 = () => (
    <form className="grid grid-cols-2 gap-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium">First Name <span className="text-gray-500">पहला नाम</span></label>
        <input type="text" value={ownerFirstName} onChange={(e) => setOwnerFirstName(e.target.value)}
          placeholder="First Name" className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09a375]" />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">Last Name <span className="text-gray-500">उपनाम</span></label>
        <input type="text" value={ownerLastName} onChange={(e) => setOwnerLastName(e.target.value)}
          placeholder="Last Name" className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09a375]" />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">Email <span className="text-gray-500">ईमेल</span></label>
        <input type="email" value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)}
          placeholder="Email" className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09a375]" />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">Password <span className="text-gray-500">पासवर्ड</span></label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09a375]" />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">Phone Number <span className="text-gray-500">फोन नंबर</span></label>
        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number" className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09a375]" />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">No. of Students <span className="text-gray-500">छात्रों की संख्या</span></label>
        <input type="number" value={studentCount} onChange={(e) => setStudentCount(e.target.value)}
          placeholder="No. of Students" className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09a375]" />
      </div>
      <div className="col-span-2 flex justify-between">
        <button type="button" onClick={() => setCurrentStep(1)}
          className="w-[48%] bg-[#09a375] text-white py-2 rounded-md font-semibold hover:bg-[#088a64]">
          Previous
        </button>
        <button
  type="button"
  onClick={handleRegister}
  disabled={nextButtonDisabled}
  className={`py-2 px-4 rounded-md text-white transition-all duration-200 ${
    nextButtonDisabled
      ? 'bg-emerald-300 cursor-not-allowed'
      : 'bg-emerald-500 hover:bg-emerald-600'
  }`}
>
  {nextButtonDisabled ? 'Please wait...' : 'Register'}
</button>
      </div>
    </form>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-[#09a375] px-4">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Registration</h2>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className={`rounded-full border-2 border-[#09a375] text-[#09a375] w-6 h-6 flex items-center justify-center font-bold`}>1</span>
              <span className="font-medium text-[#09a375]">School Details</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded-full border-2 ${currentStep === 2 ? "border-[#09a375] text-[#09a375]" : "border-gray-400 text-gray-400"} w-6 h-6 flex items-center justify-center font-bold`}>2</span>
              <span className={`font-medium ${currentStep === 2 ? "text-[#09a375]" : "text-gray-400"}`}>Owner Details</span>
            </div>
          </div>
          <hr className="mb-6" />
          {currentStep === 1 ? renderStep1() : renderStep2()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InstituteRegister;
