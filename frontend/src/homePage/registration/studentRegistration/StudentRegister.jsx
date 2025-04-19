import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import axios from 'axios';

import { auth } from "../Firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from 'react-router-dom';

const StudentRegister = () => {
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [showPhoneOTP, setShowPhoneOTP] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [otpStatus, setOtpStatus] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpExpiryTimer, setOtpExpiryTimer] = useState(300);
  const [photo, setPhoto] = useState(null);
  const [aadhaar, setAadhaar] = useState(null);
  const [signature, setSignature] = useState(null);
  const [tenthMarksheet, setTenthMarksheet] = useState(null);

  const [phone, setPhone] = useState("");
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
    if (nextButtonDisabled) return;

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
      // Validation for required personal fields
      if (
        !firstName || !lastName || !email || !password ||
        !fatherName || !motherName || !guardianMobile || !contactNo ||
        !dob || !gender ||
        !houseNumber || !area || !landmark || !zipCode
      ) {
        return alert("Please fill out all required personal details before submitting!");
      }
      setNextButtonDisabled(true);
      setTimeout(() => setNextButtonDisabled(false), 15000);
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
        const firebaseUser = userCredential.user;

        const studentData = {
          ...personalData,
          firebaseUid: firebaseUser.uid,
          phone,
          class: classValue,
          lastClassPercentage,
          schoolName,
        };

        delete studentData.password;

        const response = await axios.post("http://localhost:5001/api/students", studentData);

        if (response.data.success) {
          const studentId = response.data.data._id;
          setStudentId(studentId);
          localStorage.setItem("studentId", studentId);
          console.log("User registered and saved successfully.");
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

  const handleSubmitDocuments = async () => {
    if (!studentId) {
      alert("Student ID not found. Please register first.");
      return;
    }

    setIsUploading(true);
    try {
      const uploads = {};

      const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const res = await axios.post('http://localhost:5001/api/cloudinaryUpload', formData);
        return res.data.secure_url;
      };

      if (photo) uploads.profilePhoto = await uploadToCloudinary(photo);
      if (aadhaar) uploads.aadharCard = await uploadToCloudinary(aadhaar);
      if (tenthMarksheet) uploads.tenthMarksheet = await uploadToCloudinary(tenthMarksheet);
      if (signature) uploads.signature = await uploadToCloudinary(signature);

      await axios.put(`http://localhost:5001/api/students/${studentId}/documents`, uploads);

      console.log("Documents uploaded ✅");
      navigate("/payment");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload documents.");
    } finally {
      setIsUploading(false);
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
        <label className="block mb-2 text-sm md:text-base font-medium">Phone Number मोबाइल नंबर</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          className="w-full px-3 py-2 border rounded-md text-sm"
          disabled={isPhoneVerified}
          required
        />
        {!isPhoneVerified && (
          <button
            type="button"
            onClick={sendOtpToPhone}
            disabled={otpTimer > 0}
            className={`mt-2 ${
              otpTimer > 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:shadow-xl hover:scale-105"
            } text-white py-2 px-4 rounded-md text-sm w-full md:w-auto transition-all duration-300`}
            
          >
            {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : "Send OTP"}
          </button>
        )}
        {showPhoneOTP && !isPhoneVerified && (
          <div className="mt-4 space-y-2">
            <input
              type="text"
              value={phoneOtp}
              onChange={(e) => setPhoneOtp(e.target.value)}
              placeholder="Enter Phone OTP"
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
            <button
              type="button"
              onClick={verifyPhoneOtp}
              className="w-full md:w-auto bg-green-600 text-white py-2 px-4 rounded-md text-sm"
            >
              Verify OTP
            </button>
          </div>
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
        className={`w-full bg-emerald-500 text-white py-2 px-4 rounded-md text-sm ${!isPhoneVerified ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={!isPhoneVerified}
      >
        Next
      </button>
    </form>
  );

  const renderInstituteDetailsForm = () => (
    <form className="space-y-4">
      <div>
        <label className="block mb-2 text-sm md:text-base font-medium">Class कक्षा</label>
        <input
          type="number"
          value={classValue}
          onChange={(e) => setClassValue(e.target.value)}
          placeholder="Class"
          className="w-full px-3 py-2 border rounded-md text-sm"
          min={9}
          max={12}
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-sm md:text-base font-medium">Last Class Percentage पिछली कक्षा का प्रतिशत</label>
        <input
          type="text"
          value={lastClassPercentage}
          onChange={(e) => setLastClassPercentage(e.target.value)}
          placeholder="Percentage"
          className="w-full px-3 py-2 border rounded-md text-sm"
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-sm md:text-base font-medium">School Name स्कूल का नाम</label>
        <input
          type="text"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
          placeholder="School Name"
          className="w-full px-3 py-2 border rounded-md text-sm"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <button type="button" onClick={handlePrevious} className="bg-gray-300 py-2 rounded-md text-sm">
          Previous
        </button>
        <button type="button" onClick={handleNext} className="bg-emerald-500 text-white py-2 rounded-md text-sm">
          Next
        </button>
      </div>
    </form>
  );

  const renderPersonalDetailsForm = () => (
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block mb-1 text-xs font-medium">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-xs font-medium">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block mb-1 text-xs font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-xs font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block mb-1 text-xs font-medium">Father's Name</label>
          <input
            type="text"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            placeholder="Father's Name"
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-xs font-medium">Mother's Name</label>
          <input
            type="text"
            value={motherName}
            onChange={(e) => setMotherName(e.target.value)}
            placeholder="Mother's Name"
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block mb-1 text-xs font-medium">Guardian Mobile</label>
          <input
            type="tel"
            value={guardianMobile}
            onChange={(e) => setGuardianMobile(e.target.value)}
            placeholder="Guardian Mobile"
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-xs font-medium">Contact No</label>
          <input
            type="tel"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            placeholder="Contact No"
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block mb-1 text-xs font-medium">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-xs font-medium">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block mb-1 text-xs font-medium">House Number</label>
          <input
            type="text"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
            placeholder="House Number"
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-xs font-medium">Area</label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Area"
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block mb-1 text-xs font-medium">Landmark</label>
          <input
            type="text"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            placeholder="Landmark"
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-xs font-medium">Zip Code</label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Zip Code"
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-6">
        <button 
          type="button" 
          onClick={handlePrevious} 
          className="bg-gray-300 py-2 rounded-md text-sm"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={nextButtonDisabled}
          className={`py-2 px-4 rounded-md text-white transition-all duration-200 text-sm ${
            nextButtonDisabled
              ? 'bg-emerald-300 cursor-not-allowed'
              : 'bg-emerald-500 hover:bg-emerald-600'
          }`}
        >
          {nextButtonDisabled ? 'Please wait...' : 'Next'}
        </button>
      </div>
    </form>
  );

  const renderDocumentStep = () => (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-center text-green-600 font-semibold mb-4 text-xs md:text-sm">
        {/* <div className="flex flex-col items-center">
          <div className="text-center">①<br />Institute Details</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-center">②<br />Personal Details</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-center">③<br />Required Documents</div>
        </div> */}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Current Photograph वर्तमान फोटोग्राफी</label>
          <input 
            type="file" 
            onChange={(e) => setPhoto(e.target.files[0])}
            className="mb-2 block w-full text-xs border border-gray-300 rounded-md p-2" 
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Signature हस्ताक्षर</label>
          <input 
            type="file" 
            onChange={(e) => setSignature(e.target.files[0])} 
            className="mb-2 block w-full text-xs border border-gray-300 rounded-md p-2" 
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">9th class marksheet 9वीं कक्षा की मार्कशीट</label>
          <input 
            type="file" 
            onChange={(e) => setTenthMarksheet(e.target.files[0])}  
            className="mb-2 block w-full text-xs border border-gray-300 rounded-md p-2" 
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Aadhar Card आधार कार्ड</label>
          <input 
            type="file" 
            onChange={(e) => setAadhaar(e.target.files[0])} 
            className="block w-full text-xs border border-gray-300 rounded-md p-2" 
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={handlePrevious}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md w-full text-sm"
        >
          Previous
        </button>
        <button
      onClick={handleSubmitDocuments}
      disabled={isUploading}
      className={`${
        isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'
      } text-white font-semibold py-2 px-4 rounded-md w-full text-sm`}
    >
      {isUploading ? 'Uploading...' : 'Submit Docs'}
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

  // Progress indicator component
  const ProgressIndicator = () => (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex flex-col items-center mb-2 sm:mb-0 w-full">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === step 
                  ? 'bg-emerald-500 text-white' 
                  : currentStep > step 
                    ? 'bg-emerald-200 text-emerald-700' 
                    : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step}
            </div>
            <span className={`mt-1 text-xs sm:text-sm text-center ${
              currentStep === step ? 'text-emerald-500 font-semibold' : 'text-gray-400'
            }`}>
              {step === 1 
                ? 'Phone Verification' 
                : step === 2 
                  ? 'School Details' 
                  : step === 3 
                    ? 'Personal Details' 
                    : 'Documents Upload'
              }
            </span>
            {step < 4 && (
              <div className="hidden sm:block w-full h-0.5 bg-gray-200">
                <div 
                  className={`h-full ${
                    currentStep > step ? 'bg-emerald-500' : 'bg-gray-200'
                  }`} 
                  style={{ width: currentStep > step ? '100%' : '0%' }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Mobile progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mt-2 sm:hidden">
        <div 
          className="h-full bg-emerald-500 rounded-full" 
          style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0aa375] flex items-center justify-center p-3 sm:p-6">
        <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md sm:max-w-xl md:max-w-2xl shadow-xl">
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 text-emerald-600">Student Registration</h1>
          
          <ProgressIndicator />
          
          {renderStepContent()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentRegister;