import React from "react";
import Navbar from "./components/navbar/Navbar"; // adjust path if needed
import DifferenceImg from "../assets/difference.jpg"
import { useNavigate, Link } from "react-router-dom";

import FirstImg from "../assets/firstImg.jpg";
import HeroImg from "../assets/heroImage.jpg";
import HeroImage from "../assets/heroImage.webp";

import Footer from "./components/footer/Footer";
import {
  PencilIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const Home = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register/student");
  };
  const testimonials = [
    {
      id: 1,
      text: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.",
      author: "Robin Ton",
      position: "Software Engineer.",
      rating: 5,
      avatar: FirstImg,
    },
    {
      id: 2,
      text: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.",
      author: "Magar Faw",
      position: "Software Engineer.",
      rating: 5,
      avatar: FirstImg,
    },
    {
      id: 3,
      text: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.",
      author: "Magar Fa",
      position: "Software Engineer.",
      rating: 5,
      avatar: FirstImg,
    },
  ];
  return (
    <>
      <Navbar />

      <div>
        {/* Hero Section - Made responsive with padding adjustments */}
        {/* Hero Section - Fixed background image display */}
        <section
          className="relative w-full min-h-screen flex items-center  justify-center"
          style={{
            backgroundImage: `url(${FirstImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Dark Overlay - Adjusted opacity for better image visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/70 to-emerald-700/80"></div>

          {/* Content - Added responsive padding and width */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 ">
            <div className="w-full lg:w-1/2 ">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Scholar of the <span className="text-green-500">Year 2025</span>
              </h1>
              <p className="text-white text-sm sm:text-base mb-6">
                Celebrating academic excellence and dedication, the{" "}
                <strong>Scholar of the Year 2025 for Class 10th</strong> is a
                symbol of inspiration. This platform honors both achievements
                and the journey of growth, passion, and perseverance in
                learning.
              </p>
              <button
                onClick={handleRegisterClick}
                className="bg-green-600 text-white px-4 sm:px-6 py-2 rounded hover:bg-green-700 text-sm sm:text-base"
              >
                Register Now
              </button>
            </div>
          </div>
        </section>

        {/* Features Section - Improved grid for mobile */}
        <section className="bg-gray-50 py-10 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-center">
              {/* Registration */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <PencilIcon className="h-8 sm:h-10 w-8 sm:w-10 mx-auto text-green-600 mb-3 sm:mb-4" />
                <h3 className="font-semibold text-base sm:text-lg mb-2">
                  Registration
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Take your first step with ease by registering through our
                  student-centered platform. Your journey begins here.
                </p>
              </div>

              {/* Exam */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <DocumentTextIcon className="h-8 sm:h-10 w-8 sm:w-10 mx-auto text-green-600 mb-3 sm:mb-4" />
                <h3 className="font-semibold text-base sm:text-lg mb-2">
                  Exam:
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  We've got your back! Our exam includes questions from your own
                  syllabus, ensuring you are fully supported while you showcase
                  your potential.
                </p>
              </div>

              {/* Scholarship */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <AcademicCapIcon className="h-8 sm:h-10 w-8 sm:w-10 mx-auto text-green-600 mb-3 sm:mb-4" />
                <h3 className="font-semibold text-base sm:text-lg mb-2">
                  Scholarship:
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Selected students will be awarded a comprehensive one-year
                  scholarship, covering the entirety of your academic expenses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Read More Section - Improved stacking on mobile */}
        <section className="bg-gray-100 py-10 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
            <img
              src={HeroImg}
              alt="Students"
              className="rounded-lg w-full lg:w-1/2 object-cover h-64 sm:h-auto"
            />
            <div className="w-full lg:w-1/2 lg:pl-8 xl:pl-12 mt-6 lg:mt-0">
            <h2 className="font-semibold text-4xl">Scholarship Program: Scholar of the Year</h2>
              <p className="text-gray-700 text-sm sm:text-base mb-4">
                At Muserurals Pvt. Ltd., we understand that education is the
                foundation for a brighter future. That's why we've taken a bold
                step to ensure that financial barriers do not stand in the way
                of ambitious young minds. Our{" "}
                <strong>Scholar of the Year (SOTY)</strong> program is designed
                to empower and uplift school-going students who demonstrate
                talent and determination.
              </p>
              <Link
                to="/about"
                className="inline-block bg-green-600 text-white px-4 sm:px-6 py-2 rounded hover:bg-green-700 text-sm sm:text-base"
              >
                Read More...
              </Link>
            </div>
          </div>
        </section>

{/* Combined Difference & Selection Process Section */}
<section className="relative w-full overflow-hidden py-16 md:py-24">
  {/* Background Image with Overlay */}
  <div className="absolute inset-0 z-0">
    <img 
      src={HeroImg}
      alt="Library with bookshelves"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/80"></div>
  </div>
  
  {/* Content Container */}
  <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
    {/* Section Header */}
    <div className="mb-12">
      <h2 className="text-2xl font-light">
        Here's how we're <span className="font-medium">making a difference:</span>
      </h2>
    </div>
    
    {/* Two-Column Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
      {/* Column 1: What We Offer */}
      <div>
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0 mr-4">
            <div className="bg-green-600 rounded-full p-1">
              <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-green-600 mb-2">What We Offer</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Each selected student will receive full tuition fees for one academic year. To further ease their burden, we'll also provide some prize money for additional educational needs.
            </p>
          </div>
        </div>
        
        {/* Column 1: Eligibility */}
        <div className="flex items-start mt-8">
          <div className="flex-shrink-0 mr-4">
            <div className="bg-green-600 rounded-full p-1">
              <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-green-600 mb-2">Eligibility</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              This program is open to school students who aspire to continue their education but face financial challenges.
            </p>
          </div>
        </div>
      </div>
      
      {/* Column 2: Selection Process */}
      <div>
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="bg-green-600 rounded-full p-1">
              <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-green-600 mb-2">Selection Process</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              To ensure fairness and meritocracy, students will participate in our SOTY scholarship exam tailored to their current class syllabus. This exam will test their knowledge and reward hard work and potential.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed mt-4">
              At Muserurals, we believe every child deserves a chance to shine. Through our SOTY program, we aim to transform dreams into reality by providing the means to succeed.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>




{/* Student Benefit Section */}
{/* Student Benefit Section */}
<section className="relative mt-20 w-full overflow-hidden py-16 md:py-24">
  {/* Background Image with Overlay */}
  <div className="absolute inset-0 z-0">
    <img 
      src={DifferenceImg}
      alt="Students studying in library"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/70"></div>
  </div>
  
  {/* Content Container - Positioned to the left */}
  <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
    {/* Black Box Container */}
    <div className="bg-black/80 backdrop-blur-sm border border-gray-800 rounded-lg shadow-2xl p-6 md:p-8 text-white max-w-2xl">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-light">
          <span className="font-medium">Scholarship Exam</span> for 10th Class Students
        </h2>
        <p className="text-gray-300 mt-2">
          We are excited to announce a scholarship exam exclusively for 10th-grade students! 
          This exam aims to support bright students in their academic journey.
        </p>
      </div>
      
      {/* Content Layout */}
      <div className="space-y-8">
        {/* Exam Date & Eligibility */}
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="bg-green-600 rounded-full p-1">
              <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-green-600 mb-2">Exam Date & Eligibility</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-2">
              📅 The exam will be conducted in <span className="font-medium">July 2025</span>.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              To participate, students must have scored a minimum of <span className="font-medium">40% marks in their 9th-grade final exams</span>.
            </p>
          </div>
        </div>
        
        {/* Exam Details */}
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="bg-green-600 rounded-full p-1">
              <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-green-600 mb-2">Exam Details</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="font-medium">Format:</span> 100 multiple-choice questions (MCQs)
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="font-medium">Mode:</span> Online
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="font-medium">Syllabus:</span> Based on student's own syllabus
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="font-medium">Subjects:</span> Science, Mathematics, English
            </p>
            <p className="text-sm text-gray-300 leading-relaxed mt-2">
              <span className="font-medium">Application Fee:</span> ₹199
            </p>
          </div>
        </div>
        
        {/* Scholarship & Prizes */}
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="bg-green-600 rounded-full p-1">
              <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-green-600 mb-2">Scholarship & Prizes</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-2">
              <span className="font-medium">Top 10 students (Ranks 1-10):</span> ₹1,000 per month for the entire financial year
            </p>
            <p className="text-sm text-gray-300 leading-relaxed mb-2">
              <span className="font-medium">Top 50 students (Ranks 11-50):</span> Cash prizes
            </p>
            <p className="text-sm text-gray-300 leading-relaxed mb-1">
              <span className="font-medium">Special Prizes for Toppers:</span>
            </p>
            <p className="text-sm text-gray-300 leading-relaxed pl-4">
              • 1st Rank: ₹10,000 cash prize<br />
              • 2nd Rank: ₹7,000 cash prize<br />
              • 3rd Rank: ₹5,000 cash prize
            </p>
            <p className="text-sm text-gray-300 leading-relaxed mt-2">
              <span className="font-medium">Recognition:</span> Names of top-ranking students will be published in the newspaper!
            </p>
          </div>
        </div>
        
        {/* Required Documents */}
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="bg-green-600 rounded-full p-1">
              <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-green-600 mb-2">Required Documents</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Students must submit the following to complete registration:
            </p>
            <ul className="text-sm text-gray-300 leading-relaxed mt-1">
              <li>✅ Aadhar Card</li>
              <li>✅ Passbook</li>
              <li>✅ 9th Class Marksheet</li>
              <li>✅ Recent Photograph (Passport Size)</li>
              <li>✅ Signature</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



        {/* Testimonials Section - Grid layout optimized for mobile */}
{/* Testimonials Section - Grid layout optimized for mobile */}
<section className="bg-teal-500 bg-opacity-80 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
  {/* Texture overlay */}
  <div className="absolute inset-0 bg-white bg-opacity-5 pointer-events-none" 
       style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', 
                backgroundSize: '20px 20px' }}>
  </div>
  
  <div className="max-w-7xl mx-auto">
    {/* Section Header with white line and title */}
    <div className="mb-2">
      <div className="flex items-center mb-2">
        <div className="h-1 w-12 bg-white mr-4"></div>
        <h2 className="text-4xl text-white font-light">Clients <span className="font-bold">Love</span></h2>
      </div>
      
      {/* Subtitle */}
      <div className="mb-12 pl-16">
        <p className="text-xl text-white text-opacity-90">Testimonial</p>
      </div>
    </div>
    
    {/* Testimonials grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-lg relative">
          {/* Star Rating */}
          <div className="flex mb-4 text-yellow-400">
            {[...Array(testimonial.rating)].map((_, i) => (
              <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          
          {/* Testimonial text */}
          <p className="text-gray-600 mb-8">
            {testimonial.text}
          </p>
          
          {/* Author info */}
          <div className="flex items-center">
            <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h4 className="font-bold text-gray-900">{testimonial.author}</h4>
              <p className="text-gray-500">{testimonial.position}</p>
            </div>
          </div>
          
          {/* Large quote mark */}
          <div className="absolute bottom-8 right-8 text-gray-200 opacity-50">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

        <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with green line and title */}
        <div className="flex items-center  justify-center mb-8">
          <div className="h-1 w-12 bg-green-400 mr-4"></div>
          <h2 className="text-4xl font-bold">Our <span className="font-extrabold">Team</span></h2>
        </div>
        
        {/* Subtitle */}
        <div className="mb-12 text-center">
          <p className="text-xl text-gray-500">Expert Team</p>
        </div>
        
        {/* Team members grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {/* First team member */}
          <div className=" flex justify-center">
            <img 
              src={HeroImage} 
              alt="Team member" 
              className="w-60 rounded-lg h-auto object-cover"
            />
          </div>
          
          {/* Second team member */}
          <div className=" flex justify-center">
            <img 
              src={HeroImage} 
              alt="Team member" 
              className="w-60 rounded-lg h-auto object-cover"
            />
          </div>
            {/* Second team member */}
            <div className=" flex justify-center">
            <img 
              src={HeroImage} 
              alt="Team member" 
              className="w-60 rounded-lg h-auto object-cover"
            />
          </div>
          
          {/* You can add more team members here */}
        </div>
      </div>
    </section>

      </div>

      <Footer />
    </>
  );
};

export default Home;
