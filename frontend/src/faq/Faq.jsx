import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../homePage/components/navbar/Navbar';
import Footer from '../homePage/components/footer/Footer';
import HeroImage from '../assets/heroImage.webp'
import faqImg from '../assets/faq.jpg'

const faqs = [
  {
    question: 'Objective of providing Educational Scholarship through SOTY?',
    answer: `Promote Academic Excellence: Reward students with outstanding academic performance. (अच्छे मार्क्स वाले स्टूडेंट्स को रिवार्ड देना।)
Financial Assistance: Help deserving students from economically disadvantaged backgrounds. (जरूरतमंद स्टूडेंट्स की मदद करना।)
Equal Opportunity: Bridge educational gaps by providing resources to underprivileged students. (सबको पढ़ाई के लिए बराबरी का मौका देना।)
Motivation and Recognition: Inspire students to achieve higher goals by acknowledging their efforts. (अच्छे काम के लिए स्टूडेंट्स को प्रोत्साहित करना।)
Empower Future Leaders: Foster skill development, career growth, and social responsibility. (स्किल्स और करियर डेवलप करने में मदद करना।)`
  },
  {
    question: 'How to register on SOTY portal?',
    answer: `Visit the official website: Go to www.scholaroftheyear.com. (आधिकारिक वेबसाइट पर जाएं: www.scholaroftheyear.com।)
Click on ‘registration’: In the menu, click on the ‘Registration’ label, then select ‘student registration’ from the dropdown to begin the registration process. (मेन्यू में "रजिस्ट्रेशन" पर क्लिक करें और "स्टूडेंट रजिस्ट्रेशन" चुनें।)
Fill in your details: Complete the registration form with accurate information. (रजिस्ट्रेशन फॉर्म को सही तरीके से भरें।)
Create a password: Choose a strong password to secure your account. (एक मजबूत पासवर्ड चुनें।)
Submit the Form: After filling in the details, click ‘submit’ to complete the registration process. (जानकारी भरने के बाद "सबमिट" बटन पर क्लिक करें।)
Verify your Email/Mobile: Follow the verification link sent to your email or enter the OTP received on your registered mobile number. (वेरिफिकेशन लिंक पर क्लिक करें या ओटीपी डालें।)
Once verified, you can log in to your account and start exploring scholarship opportunities, exam notifications, and result updates. (एक बार वेरिफाई करने के बाद, आप अपने अकाउंट में लॉगिन करके स्कॉलरशिप्स और अपडेट्स एक्सप्लोर कर सकते हैं।)`
  },
  {
    question: 'Where to contact for any query?',
    answer: `You can contact the support team through the following channels:
Email: support@scholaroftheyear.com
Phone: +91-8882796281
Support hours: 9 AM to 7 PM. (समर्थन समय: सुबह 9 बजे से शाम 7 बजे तक उपलब्ध।)`
  },
  {
    question: 'List of documents I need to be ready with before filing application.',
    answer: `Aadhaar Card (आधार कार्ड)
9th Class Marksheet (9वीं कक्षा की मार्कशीट)
Bank passbook copy (बैंक पासबुक कॉपी)
Passport size photograph (पासपोर्ट साइज फोटोग्राफ)`
  },
  {
    question: 'How the fund for scholarship is disbursed/transferred?',
    answer: `The scholarship funds are typically disbursed through the following process:
Verification Process: After successful application submission, documents are verified. (आवेदन के बाद डॉक्यूमेंट्स की जांच होती है।)
Selection & Approval: Eligible candidates are shortlisted, and approvals are processed. (योग्य उम्मीदवारों को शॉर्टलिस्ट किया जाता है।)
Bank Account Transfer: Funds are directly transferred to the student’s registered bank account. (फंड सीधे बैंक खाते में ट्रांसफर होते हैं।)
Confirmation & Notification: Students are informed about the disbursement through email, SMS, or portal updates. (ईमेल, एसएमएस या पोर्टल अपडेट्स से जानकारी दी जाती है।)`
  },
  {
    question: 'Eligibility criteria for scholarship?',
    answer: `Must have achieved a minimum of 45% in the previous academic year. (पिछले साल की पढ़ाई में कम से कम 45% अंक होने चाहिए।)
Consistent academic performance is required. (लगातार अच्छा प्रदर्शन जरूरी है।)
Applicants must be enrolled in a recognized school. (मान्यता प्राप्त स्कूल में एडमिशन होना चाहिए।)
The previous academic year’s marksheet must be submitted. (पिछले वर्ष की मार्कशीट जमा करना अनिवार्य है।)
Applicants should be between 13-17 years of age. (उम्र: 13 से 17 साल के बीच होनी चाहिए।)
Candidates must be residents of India. (उम्मीदवार भारत के निवासी होने चाहिए।)`
  },
  {
    question: 'What is the application fees ?',
    answer: `The scholarship application fee is ₹199, and it's valid for one year. Contact your institute or coaching centre to check for discounts. If they are registered with us, you can receive up to a 50% discount.`
  }
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
