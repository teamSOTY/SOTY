import React from 'react';
import Navbar from '../homePage/components/navbar/Navbar';
import Footer from '../homePage/components/footer/Footer';
import Gologo from '../assets/gologo.avif'

const About = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-cover bg-center h-64 flex items-center justify-center text-white text-4xl font-bold shadow-md"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516979187457-637abb4f9353?fit=crop&w=1400&q=80')" }}>
        About Us
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-6 text-gray-800">
          <h2 className="text-2xl font-semibold text-gray-900">About Muserurals Pvt. Ltd.</h2>
          <p>
            Muserurals Pvt. Ltd., established in August 2023, is the culmination of a rich heritage in furniture manufacturing.
            Our journey began with a steadfast commitment to quality, which has allowed us to thrive in fulfilling government tenders
            and forming lasting partnerships with renowned architectural firms. Through hard work and innovation, we earned a reputation
            for delivering functional yet elegant furniture solutions that stand the test of time.
            Discover more about our work at <a href="https://www.gofurnishing.in" className="text-blue-600 underline">www.gofurnishing.in</a>.
          </p>
          <p>
            Our journey took a life-changing turn when our founder faced a moment of profound challenge—a financial hardship so overwhelming
            that it disrupted his academic dreams, forcing him to drop out of college. This personal struggle became a defining moment,
            planting the seeds of a bigger vision. It was in this moment of difficulty that he made a promise: no bright and ambitious student
            should ever have to abandon their education because of financial constraints.
          </p>
          <p>
            Fueled by this heartfelt conviction, we launched the <strong>Scholar of the Year (SOY)</strong> program to provide meaningful support
            to underprivileged but exceptionally talented students. This initiative is our way of ensuring that no potential goes unrealized,
            and no dream is left unfulfilled simply because of financial barriers.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-8">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?fit=crop&w=600&q=80"
            alt="Our Mission"
            className="w-full md:w-1/3 rounded-lg shadow-md"
          />
          <div className="space-y-6 text-gray-800">
            <h2 className="text-2xl font-semibold text-gray-900">Our Mission</h2>
            <p>
              Our mission is straightforward but profound: to break the cycle of limited opportunities by investing in the education of
              deserving students. By offering resources and support, we aim to create a future where financial challenges are no longer
              a roadblock to academic success.
            </p>
            <p>
              Through the SOY program, we envision not just helping individual students but also inspiring a ripple effect of positive
              change within families, communities, and beyond.
            </p>
            <p>
              Inspired by this mission, Muserurals Pvt. Ltd. is not just a name—it's a commitment to empowering communities and creating
              opportunities. Our efforts extend beyond furniture to include our flagship scholarship program,
              <strong> "Scholar of the Year (SOY)"</strong>, designed to uplift underprivileged yet deserving school students.
            </p>
            <p>
              At Muserurals, we believe that success is measured not by profit, but by the positive impact we leave behind. Join us on
              this journey of innovation, compassion, and transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <footer className="bg-gray-900 text-white py-10 text-center">
        <h2 className="text-xl font-semibold">Our Partners</h2>
        <div className="mt-4">
          <img
            src={Gologo}
            alt="Gofurnishing Logo"
            className="h-14 mx-auto bg-amber-50"
          />
        </div>
      </footer>
    </div>
    <Footer></Footer>
    </>
  );
};

export default About;
