import React from "react";
import {
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import Navbar from "../homePage/components/navbar/Navbar";
import Footer from "../homePage/components/footer/Footer";

const Contact = () => {
  return (
    <>
    <Navbar></Navbar>
    <section className="bg-[#f5f6fc]">
      {/* Header section with background image */}
      <div className="h-60 bg-[url('https://images.unsplash.com/photo-1473181488821-2d23949a045a?auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">Contact</h1>
      </div>

      {/* Info boxes */}
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between gap-4">
        <div className="bg-white shadow-md rounded-md flex-1 flex items-center justify-center flex-col py-4 px-6">
          <Phone className="text-green-500 mb-2" />
          <h2 className="font-semibold">Phone Number</h2>
          <p className="text-sm text-gray-600">91-88827-95281</p>
        </div>

        <div className="bg-white shadow-md rounded-md flex-1 flex items-center justify-center flex-col py-4 px-6">
          <Mail className="text-green-500 mb-2" />
          <h2 className="font-semibold">Email</h2>
          <p className="text-sm text-gray-600">info@scholaroftheyear.com</p>
        </div>

        <div className="bg-white shadow-md rounded-md flex-1 flex items-center justify-center flex-col py-4 px-6">
          <MapPin className="text-green-500 mb-2" />
          <h2 className="font-semibold">Location</h2>
          <p className="text-sm text-gray-600">State Delhi – 110057</p>
        </div>
      </div>

      {/* Form + Map */}
      <div className="max-w-5xl mx-auto px-4 pb-10 grid md:grid-cols-2 gap-6">
        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-bold mb-1">Get In touch</h2>
          <p className="text-sm text-gray-600 mb-4">Leave us a message</p>
          <form className="space-y-4">
            <div>
              <label className="text-red-500 text-sm">*</label>
              <input
                type="text"
                placeholder="Name"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="text-red-500 text-sm">*</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="text-red-500 text-sm">*</label>
              <input
                type="text"
                placeholder="Phone"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <textarea
                rows="4"
                placeholder="Message"
                className="w-full border border-gray-300 p-2 rounded resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Embedded Map */}
        <div className="h-[350px] border border-green-600 bg-green-100 rounded overflow-hidden">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.8392935742!2d77.0688995983066!3d28.527280343437175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3a72f08b4d5%3A0x53b3dfb55dfb9de6!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1683117815099!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
    <Footer></Footer>
    </>
  );
};

export default Contact;
