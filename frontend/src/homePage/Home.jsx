import React from 'react';
import Navbar from './components/navbar/Navbar'; // adjust path if needed
import PlaceholderImg from '../assets/Ellipse 2.png'
import CatImage from '../assets/cat.jpeg'
import HeroImg from '../assets/heroImage.jpg'
import HeroImage from '../assets/heroImage.webp'

import Footer from './components/footer/Footer';
import {
  PencilIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  StarIcon

} from '@heroicons/react/24/outline'

const Home = () => {
  return (
    <>
    <Navbar></Navbar>
    
    <div>
      {/* Hero Section */}
      <section
  className="relative w-full min-h-[90vh] flex items-center bg-center bg-cover"
  style={{ backgroundImage: `url(${HeroImg})` }}
>
  {/* Overlay for readability */}
  <div className="absolute inset-0  bg-opacity-30"></div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
    <div className="lg:w-1/2">
      <h1 className="text-4xl font-bold text-white mb-4">
        Scholar of the <span className="text-green-300">Year 2025</span>
      </h1>
      <p className="text-white mb-6">
        Celebrating academic excellence and dedication, the <strong>Scholar of the Year 2025 for Class 10th</strong> is a symbol of inspiration. 
        This platform honors both achievements and the journey of growth, passion, and perseverance in learning.
      </p>
      <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
        Register Now
      </button>
    </div>
  </div>
</section>




      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Registration */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <PencilIcon className="h-10 w-10 mx-auto text-green-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Registration</h3>
              <p className="text-gray-600">
                Take your first step with ease by registering through our student-centered platform. Your journey begins here.
              </p>
            </div>

            {/* Exam */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <DocumentTextIcon className="h-10 w-10 mx-auto text-green-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Exam:</h3>
              <p className="text-gray-600">
                We've got your back! Our exam includes questions from your own syllabus, ensuring you are fully supported while you showcase your potential.
              </p>
            </div>

            {/* Scholarship */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <AcademicCapIcon className="h-10 w-10 mx-auto text-green-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Scholarship:</h3>
              <p className="text-gray-600">
                Selected students will be awarded a comprehensive one-year scholarship, covering the entirety of your academic expenses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Read More Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between space-y-10 lg:space-y-0">
          <img
            src={HeroImg}
            alt="Students"
            className="rounded-lg lg:w-1/2"
          />
          <div className="lg:w-1/2 lg:pl-12">
            <p className="text-gray-700 mb-4">
              At Muserurals Pvt. Ltd., we understand that education is the foundation for a brighter future. That’s why we’ve taken a bold step to ensure that financial barriers do not stand in the way of ambitious young minds. Our <strong>Scholar of the Year (SOTY)</strong> program is designed to empower and uplift school-going students who demonstrate talent and determination.
            </p>
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Read More...
            </button>
          </div>
        </div>
      </section>

      {/* Difference Section */}
      <section
        className="relative py-20 bg-cover bg-center text-white"
        style={{
          backgroundImage: `url(${HeroImg})`, // Replace with background image
        }}
      >
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10">
            Here’s how we’re <span className="text-white font-extrabold">making a difference:-</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-start space-x-3 mb-2">
                <CheckCircleIcon className="h-6 w-6 text-white" />
                <h3 className="font-bold text-white text-lg">What We Offer</h3>
              </div>
              <p className="text-gray-200">
                Each selected student will receive full tuition fees for one academic year. To further ease their burden, we’ll also provide some prize money for additional educational needs.
              </p>
            </div>
            <div>
              <div className="flex items-start space-x-3 mb-2">
                <CheckCircleIcon className="h-6 w-6 text-white" />
                <h3 className="font-bold text-white text-lg">Eligibility</h3>
              </div>
              <p className="text-gray-200">
                This program is open to school students who aspire to continue their education but face financial challenges.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Selection Process Section */}
      <section
        className="relative text-white"
        style={{
          backgroundImage: `url(${HeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black bg-opacity-70 p-10 max-w-4xl mx-auto rounded-lg mt-10">
          <div className="flex items-start space-x-3 mb-4">
            <CheckCircleIcon className="h-6 w-6 text-white" />
            <h3 className="text-xl font-bold">Selection Process</h3>
          </div>
          <p className="text-gray-200 mb-4">
            To ensure fairness and meritocracy, students will participate in our SOTY scholarship exam tailored to their current class syllabus. This exam will test their knowledge and reward hard work and potential.
          </p>
          <p className="text-gray-300">
            At Muserurals, we believe every child deserves a chance to shine. Through the SOTY program, we aim to transform dreams into reality by unlocking the doors to education.
          </p>
        </div>
      </section>
{/* Testimonials Section */}
<section
        className="py-20 text-center text-white"
        style={{
          backgroundImage: `url(${HeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h2 className="text-3xl font-bold mb-2">Clients <span className="text-white">Love</span></h2>
        <p className="text-lg mb-10">Testimonial</p>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="bg-white text-gray-900 rounded-lg shadow-md p-6"
            >
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-600">
                Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life.
              </p>
              <p className="mt-4 font-semibold">— Happy Student</p>
            </div>
          ))}
        </div>
      </section>
    </div>

   <Footer></Footer>
    </>
  );
};

export default Home;
