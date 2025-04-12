import React, { useState, useRef } from "react";
import { FaInfoCircle } from "react-icons/fa";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const InstituteRegister = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 refs
  const instituteNameRef = useRef();
  const instituteAddressRef = useRef();
  const emailRef = useRef();
  const contactRef = useRef();

  // Step 2 refs
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const ownerEmailRef = useRef();
  const passwordRef = useRef();
  const phoneNumberRef = useRef();
  const studentCountRef = useRef();

  const handleNext = () => {
    if (currentStep === 1) {
      const step1Data = {
        instituteName: instituteNameRef.current.value,
        instituteAddress: instituteAddressRef.current.value,
        email: emailRef.current.value,
        contact: contactRef.current.value,
      };
      console.log("Step 1 - School Details:", step1Data);
      setCurrentStep(2);
    }
  };

  const handleRegister = () => {
    const step2Data = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: ownerEmailRef.current.value,
      password: passwordRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      studentCount: studentCountRef.current.value,
    };
    console.log("Step 2 - Owner Details:", step2Data);
    // Submit form logic here
  };

  const renderStep1 = () => (
    <form className="grid grid-cols-2 gap-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium">
          Institute Name <span className="text-gray-500">संस्थान का नाम</span>
        </label>
        <input
          type="text"
          ref={instituteNameRef}
          placeholder="Institute Name"
          className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09a375]"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">
          Address of Institution <span className="text-gray-500">संस्थान का पता</span>
        </label>
        <input
          type="text"
          ref={instituteAddressRef}
          placeholder="Address Of Institution"
          className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09a375]"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">
          Email Id <span className="text-gray-500">ईमेल आईडी</span>
        </label>
        <input
          type="email"
          ref={emailRef}
          placeholder="Email Id"
          className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09a375]"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">
          Contact No <span className="text-gray-500">संपर्क नंबर</span>
        </label>
        <input
          type="tel"
          ref={contactRef}
          placeholder="Contact No"
          className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09a375]"
        />
      </div>
      <div className="col-span-2">
        <button
          type="button"
          onClick={handleNext}
          className="w-full bg-[#09a375] text-white py-2 rounded-md font-semibold hover:bg-[#088a64]"
        >
          Next
        </button>
      </div>
    </form>
  );

  const renderStep2 = () => (
    <form className="grid grid-cols-2 gap-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium">
          First Name <span className="text-gray-500">पहला नाम</span>
        </label>
        <input
          type="text"
          ref={firstNameRef}
          placeholder="Name"
          className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09a375]"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">
          Last Name <span className="text-gray-500">उपनाम</span>
        </label>
        <input
          type="text"
          ref={lastNameRef}
          placeholder="Name"
          className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09a375]"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">
          Email <span className="text-gray-500">ईमेल</span>
        </label>
        <input
          type="email"
          ref={ownerEmailRef}
          placeholder="Email"
          className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09a375]"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">
          Password <span className="text-gray-500">पासवर्ड</span>
        </label>
        <input
          type="password"
          ref={passwordRef}
          placeholder="Password"
          className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09a375]"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">
          Phone Number <span className="text-gray-500">फोन नंबर</span>
        </label>
        <input
          type="tel"
          ref={phoneNumberRef}
          placeholder="hone Nmber"
          className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09a375]"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">
          No. of Students <span className="text-gray-500">छात्रों की संख्या</span>
        </label>
        <input
          type="number"
          ref={studentCountRef}
          placeholder="No. of Students"
          className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#09a375]"
        />
      </div>
      <div className="col-span-2 flex justify-between">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className="w-[48%] bg-[#09a375] text-white py-2 rounded-md font-semibold hover:bg-[#088a64]"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleRegister}
          className="w-[48%] bg-[#09a375] text-white py-2 rounded-md font-semibold hover:bg-[#088a64]"
        >
          Register Now
        </button>
      </div>
    </form>
  );

  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen flex items-center justify-center bg-[#09a375] px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Registration</h2>

        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className={`rounded-full border-2 border-[#09a375] text-[#09a375] w-6 h-6 flex items-center justify-center font-bold`}>
              1
            </span>
            <span className="font-medium text-[#09a375]">School Details</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`rounded-full border-2 ${currentStep === 2 ? "border-[#09a375] text-[#09a375]" : "border-gray-400 text-gray-400"} w-6 h-6 flex items-center justify-center font-bold`}>
              2
            </span>
            <span className={`font-medium ${currentStep === 2 ? "text-[#09a375]" : "text-gray-400"}`}>Owner Details</span>
          </div>
        </div>
        <hr className="mb-6" />

        {/* Render current step */}
        {currentStep === 1 ? renderStep1() : renderStep2()}
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default InstituteRegister;
