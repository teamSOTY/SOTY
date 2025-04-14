import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import axios from 'axios';

import { auth } from "../Firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from 'react-router-dom';

const StudentRegister = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPhoneOTP, setShowPhoneOTP] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [otpStatus, setOtpStatus] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpExpiryTimer, setOtpExpiryTimer] = useState(300);
  const [photo, setPhoto] = useState(null); // State for photo upload

  const [phone, setPhone] = useState("");  // Phone number state
  const [classValue, setClassValue] = useState("");
  const [lastClassPercentage, setLastClassPercentage] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [guardianMobile, setGuardianMobile] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [zipCode, setZipCode] = useState("");

  const navigate = useNavigate();

  const otpIntervalRef = useRef(null);
  const otpExpiryRef = useRef(null);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => console.log("Recaptcha verified"),
          "expired-callback": () => console.warn("Recaptcha expired"),
        }
      );
    }
  };

  const sendOtpToPhone = async () => {
    if (!phone) return alert("Please enter a phone number");

    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(auth, `+91${phone}`, appVerifier);
      setConfirmationResult(result);
      setShowPhoneOTP(true);
      setOtpStatus("OTP sent successfully ✅");

      setOtpTimer(60);
      if (otpIntervalRef.current) clearInterval(otpIntervalRef.current);
      otpIntervalRef.current = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(otpIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      setOtpExpiryTimer(300);
      if (otpExpiryRef.current) clearTimeout(otpExpiryRef.current);
      otpExpiryRef.current = setTimeout(() => {
        setConfirmationResult(null);
        setOtpStatus("OTP expired ❌ Please resend.");
      }, 300000);
    } catch (err) {
      console.error("Error sending OTP", err);
      setOtpStatus("Failed to send OTP ❌");
    }
  };

  const verifyPhoneOtp = async () => {
    if (!confirmationResult || !phoneOtp) {
      setOtpStatus("Enter the OTP first ❗");
      return;
    }

    try {
      await confirmationResult.confirm(phoneOtp);
      setIsPhoneVerified(true);
      setOtpStatus("Phone verified successfully ✅");
      clearTimeout(otpExpiryRef.current);
    } catch (err) {
      setOtpStatus("Invalid OTP ❌");
      console.error("OTP verification error:", err);
 }
  };

  useEffect(() => {
    return () => {
      clearInterval(otpIntervalRef.current);
      clearTimeout(otpExpiryRef.current);
    };
  }, []);

  const handleNext = async () => {
    if (currentStep === 1 && isPhoneVerified) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      const instituteData = {
        class: classValue,
        lastClassPercentage,
        schoolName,
      };
      console.log('Institute data:', instituteData);
      setCurrentStep(3);
    } else if (currentStep === 3) {
      const personalData = {
        firstName,
        lastName,
        email,
        password,
        fatherName,
        motherName,
        guardianMobile,
        contactNo,
        dob,
        gender,
        houseNumber,
        area,
        landmark,
        zipCode,
      };

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser  = userCredential.user;

        const studentData = {
          ...personalData,
          firebaseUid: firebaseUser .uid,
          phone,
          class: classValue,
          lastClassPercentage,
          schoolName,
        };

        delete studentData.password;

        if (photo) {
          const formData = new FormData();
          formData.append('file', photo);
          formData.append('upload_preset', 'your_upload_preset');

          const uploadResponse = await axios.post('https://api.cloudinary.com/v1_1/dh7vksh4l/image/upload', formData);
          studentData.profilePicture = uploadResponse.data.secure_url;
        }

        const response = await axios.post("http://localhost:5001/api/students", studentData);

        if (response.data.success) {
          console.log("User  registered and saved successfully.");
          setCurrentStep(4);
        } else {
          console.error("Server Error:", response.data.message);
          alert("Failed to save data on server.");
        }
      } catch (error) {
        console.error("Firebase Auth Error:", error.message);
        alert("Error creating user: " + error.message);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderVerificationStep = () => (
    <form className="space-y-6" onSubmit={(e) => {
      e.preventDefault();
      if (isPhoneVerified) handleNext();
    }}>
      <div>
        <label className="block mb-2">Phone Number मोबाइल नंबर</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          className="w-full px-3 py-2 border rounded-md"
          disabled={isPhoneVerified}
        />
        {!isPhoneVerified && (
          <button
            type="button"
            onClick={sendOtpToPhone}
            disabled={otpTimer > 0}
            className={`mt-2 ${otpTimer > 0 ? "bg-gray-400" : "bg-gradient-to-br from-green-400 to-black hover:bg-green-900"} text-white py-1 px-4 rounded-md`}
          >
            {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : "Send OTP"}
          </button>
        )}
        {showPhoneOTP && !isPhoneVerified && (
          <>
            <input
              type="text"
              value={phoneOtp}
              onChange={(e) => setPhoneOtp(e.target.value)}
              placeholder="Enter Phone OTP"
              className="mt-2 w-full px-3 py-2 border rounded-md"
            />
            <button
              type="button"
              onClick={verifyPhoneOtp}
              className="mt-2 bg-green-600 text-white py-1 px-4 rounded-md"
            >
              Verify OTP
            </button>
          </>
        )}
        {otpStatus && (
          <p className={`text-sm mt-2 ${otpStatus.includes("❌") ? "text-red-500" : "text-green-600"}`}>
            {otpStatus}
          </p>
        )}
        <div id="recaptcha-container"></div>
      </div>
      <button
        type="button"
        onClick={handleNext}
        className={`w-full bg-emerald-500 text-white py-2 px-4 rounded-md ${!isPhoneVerified ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={!isPhoneVerified}
      >
        Next
      </button>
    </form>
  );

  const renderInstituteDetailsForm = () => (
    <form className="space-y-6">
      <div>
        <label className="block mb-2">Class कक्षा </label>
        <input
          type="number"
          value={classValue}
          onChange={(e) => setClassValue(e.target.value)}
          placeholder="Class"
          className="w-full px-3 py-2 border rounded-md"
          min={9}
          max={12}
          required
        />
      </div>

      <div>
        <label className="block mb-2">Last Class Percentage पिछली कक्षा का प्रतिशत</label>
        <input
          type="text"
          value={lastClassPercentage}
          onChange={(e) => setLastClassPercentage(e.target.value)}
          placeholder="Percentage"
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block mb-2">School Name स्कूल का नाम</label>
        <input
          type="text"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
          placeholder="School Name"
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button type="button" onClick={handlePrevious} className="bg-gray-300 py-2 rounded-md">
          Previous
        </button>
        <button type="button" onClick={handleNext} className="bg-emerald-500 text-white py-2 rounded-md">
          Next
        </button>
      </div>
    </form>
  );

  const renderPersonalDetailsForm = () => (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="border px-3 py-2 rounded-md"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="border px-3 py-2 rounded-md"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border px-3 py-2 rounded-md"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border px-3 py-2 rounded-md"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={fatherName}
          onChange={(e) => setFatherName(e.target.value)}
          placeholder="Father's Name"
          className="border px-3 py-2 rounded-md"
          required
        />
        <input
          type="text"
          value={motherName}
          onChange={(e) => setMotherName(e.target.value)}
          placeholder="Mother's Name"
          className="border px-3 py-2 rounded-md"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="tel"
          value={guardianMobile}
          onChange={(e) => setGuardianMobile(e.target.value)}
          placeholder="Guardian Mobile"
          className="border px-3 py-2 rounded-md"
        />
        <input
          type="tel"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
          placeholder="Contact No"
          className="border px-3 py-2 rounded-md"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="border px-3 py-2 rounded-md"
          required
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border px-3 py-2 rounded-md"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)}
          placeholder="House Number"
          className="border px-3 py-2 rounded-md"
        />
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="Area"
          className="border px-3 py-2 rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={landmark}
          onChange={(e) => setLandmark(e.target.value)}
          placeholder="Landmark"
          className="border px-3 py-2 rounded-md"
        />
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="Zip Code"
          className="border px-3 py-2 rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <button type="button" onClick={handlePrevious} className="bg-gray-300 py-2 rounded-md">Previous</button>
        <button type="button" onClick={handleNext} className="bg-emerald-500 text-white py-2 rounded-md">Next</button>
      </div>
    </form>
  );

  const renderDocumentStep = () => (
    <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Student Registration</h2>

      <div className="grid grid-cols-3 gap-6 text-left text-green-600 font-semibold mb-4 text-lg">
        <div className="flex flex-col items-center">
          <div className="text-center">①<br />Institute Details</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-center">②<br />Personal Details</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-center">③<br />Required Documents</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className="block mb-2">Current Photograph वर्तमान फोटोग्राफी</label>
          <input 
            type="file" 
            onChange={(e) => setPhoto(e.target.files[0])}
            className="mb-4 block w-full border border-gray-300 rounded-md p-2" 
          />

          <label className="block mb-2">9th class marksheet 9वीं कक्षा की मार्कशीट</label>
          <input type="file" className="block w-full border border-gray-300 rounded-md p-2" />
        </div>

        <div>
          <label className="block mb-2">Signature हस्ताक्षर</label>
          <input type="file" className="mb-4 block w-full border border-gray-300 rounded-md p-2" />

          <label className="block mb-2">Aadhar Card आधार कार्ड</label>
          <input type="file" className="block w-full border border-gray-300 rounded-md p-2" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <button
          onClick={handlePrevious}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-md w-full"
        >
          Previous
        </button>
        <button
          onClick={() => navigate('/payment')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-md w-full"
        >
          Submit Documents
        </button>
      </div>
    </div>
  );

  const renderStepContent = () => {
    if (currentStep === 1) return renderVerificationStep();
    if (currentStep === 2) return renderInstituteDetailsForm();
    if (currentStep === 3) return renderPersonalDetailsForm();
    if (currentStep === 4) return renderDocumentStep();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0aa375] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 w-full max-w-3xl">
          <h1 className="text-2xl font-semibold text-center mb-8">Student Registration</h1>
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full ${currentStep === step ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'} flex items-center justify-center`}>
                  {step}
                </div>
                <span className={`ml-2 ${currentStep === step ? 'text-emerald-500' : 'text-gray-400'}`}>
                  {step === 1 ? 'Verify Phone ' : step === 2 ? 'Institute Details' : step === 3 ? 'Personal Details' : 'Documents'}
                </span>
              </div>
            ))}
          </div>
          {renderStepContent()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentRegister;