import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../homePage/components/navbar/Navbar';
import Footer from '../homePage/components/footer/Footer';
import HeroImage from '../assets/heroImage.webp'
import faqImg from '../assets/faq.jpg'

const faqs = [
  { question: 'What are the features of SOTY Portal?', answer: 'Some placeholder answer for features.' },
  { question: 'Objective of providing Educational Scholarship through SOTY?', answer: 'To support deserving students with financial aid.' },
  { question: 'How to register on SOTY portal?', answer: 'Visit the official site, click on register, and fill out the required form.' },
  { question: 'Where to contact for any query?', answer: 'You can contact us at support@soty.com or through the contact form.' },
  { question: 'List of documents I need to be ready with before filing application.', answer: 'You will need your Aadhar, income proof, academic certificates, etc.' },
  { question: 'How the fund for scholarship is disbursed/transferred?', answer: 'Funds are transferred directly to the student’s bank account after verification.' },
  { question: 'Eligibility criteria for scholarship?', answer: 'Students from economically weaker sections with excellent academic performance.' },
  { question: 'What is the application fees ?', answer: 'The application is completely free of charge.' },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
    <Navbar></Navbar>
    <section className="bg-[#f5f6fc] py-10 px-4">
      <div className="max-w-3xl mx-auto">
      <div
  className="bg-center bg-no-repeat bg-cover h-44  mb-6 rounded-md"
  style={{ backgroundImage: `url(${faqImg})` }}
/>


        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#5d5d6f] text-white mb-2 rounded-md overflow-hidden shadow-md"
          >
            <button
              className="w-full text-left px-4 py-3 flex justify-between items-center font-medium"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-sm text-gray-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
    <Footer></Footer>
    </>
  );
};

export default Faq;
