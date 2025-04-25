import React from 'react';
import Navbar from '../homePage/components/navbar/Navbar';
import Footer from '../homePage/components/footer/Footer';

const Terms = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4">Terms of Use</h1>
          <div className="h-1 w-32 bg-emerald-500 mx-auto mb-4"></div>
          <p className="text-emerald-700 font-medium">Effective Date: 07/03/2025</p>
        </div>
        
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-l-4 border-emerald-500">
          <p className="text-gray-700 leading-relaxed">
            Welcome to the website of <span className="italic font-medium">Scholar of the Year</span>, an initiative by Muserurals Pvt. Ltd. 
            These Terms of Use ("Terms") govern your use of our website and services. By accessing or using our website in any manner, 
            you agree to be bound by these Terms. If you do not agree with these Terms, please do not use our website.
          </p>
        </div>
        
        {/* Terms Sections */}
        <div className="space-y-4">
          {/* Section 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 text-left bg-emerald-600 text-white font-medium">
              <span className="text-lg">1. Terms</span>
            </div>
            <div className="p-4 bg-white">
              <p className="text-gray-700">
                By accessing or using our website in any manner, including but not limited to browsing, registering, or applying for the scholarship, 
                you agree to be bound by these Terms of Use.
              </p>
            </div>
          </div>
          
          {/* Section 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 text-left bg-emerald-600 text-white font-medium">
              <span className="text-lg">2. Eligibility</span>
            </div>
            <div className="p-4 bg-white">
              <p className="text-gray-700">
                Our services are intended for users who meet the eligibility criteria for the scholarship as outlined on our website. 
                By using our services, you represent and warrant that you meet all eligibility requirements.
              </p>
            </div>
          </div>
          
          {/* Section 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 text-left bg-emerald-600 text-white font-medium">
              <span className="text-lg">3. User Responsibilities</span>
            </div>
            <div className="p-4 bg-white">
              <p className="text-gray-700 mb-3">
                You agree to use our website and services only for lawful purposes and in accordance with these Terms. 
                You are responsible for maintaining the confidentiality of your account information and for all activities under your account. 
                You agree not to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Submit false, misleading, or fraudulent information.</li>
                <li>Attempt to gain unauthorized access to our systems or data.</li>
                <li>Use the site for any illegal or unethical activities.</li>
                <li>Engage in any activity that disrupts or interferes with the proper functioning of the website.</li>
              </ul>
            </div>
          </div>
          
          {/* Section 4 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 text-left bg-emerald-600 text-white font-medium">
              <span className="text-lg">4. Scholarship Program</span>
            </div>
            <div className="p-4 bg-white">
              <p className="text-gray-700">
                Details about the scholarship program, including eligibility criteria, application process, and award distribution, 
                are available on our website. Muserurals Pvt. Ltd. reserves the right to modify, suspend, or terminate the scholarship 
                program at any time without prior notice. Scholarship award decisions are final. In case of disputes, users may contact 
                our support team for review, but Muserurals reserves the right to make the final determination.
              </p>
            </div>
          </div>
          
          {/* Section 5 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 text-left bg-emerald-600 text-white font-medium">
              <span className="text-lg">5. Intellectual Property</span>
            </div>
            <div className="p-4 bg-white">
              <p className="text-gray-700">
                All content on this website, including text, graphics, logos, and images, is the property of Muserurals Pvt. Ltd. and is 
                protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express 
                written permission. Unauthorized use or reproduction may be legally actionable.
              </p>
            </div>
          </div>
          
          {/* Section 6 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 text-left bg-emerald-600 text-white font-medium">
              <span className="text-lg">6. Limitation of Liability</span>
            </div>
            <div className="p-4 bg-white">
              <p className="text-gray-700">
                To the fullest extent permitted by law, Muserurals Pvt. Ltd. shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages, or any loss of profits or revenues arising out of your use of our website or 
                participation in the scholarship program.
              </p>
            </div>
          </div>
          
          {/* Section 7 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 text-left bg-emerald-600 text-white font-medium">
              <span className="text-lg">7. Indemnification</span>
            </div>
            <div className="p-4 bg-white">
              <p className="text-gray-700">
                You agree to indemnify and hold harmless Muserurals Pvt. Ltd. and its affiliates, officers, agents, and employees from any claims, 
                damages, obligations, losses, liabilities, costs, or debt arising from your use of our website or violation of these Terms.
              </p>
            </div>
          </div>
          
          {/* Section 8 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 text-left bg-emerald-600 text-white font-medium">
              <span className="text-lg">8. Changes to Terms</span>
            </div>
            <div className="p-4 bg-white">
              <p className="text-gray-700">
                We may update these Terms from time to time. Any changes will be posted on this page with an updated effective date. 
                Your continued use of our website after such changes constitutes your acceptance of the new Terms.
              </p>
            </div>
          </div>
          
          {/* Section 9 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 text-left bg-emerald-600 text-white font-medium">
              <span className="text-lg">9. Governing Law</span>
            </div>
            <div className="p-4 bg-white">
              <p className="text-gray-700">
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.
              </p>
            </div>
          </div>
          
          {/* Section 10 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 text-left bg-emerald-600 text-white font-medium">
              <span className="text-lg">10. Contact Us</span>
            </div>
            <div className="p-4 bg-white">
              <p className="text-gray-700 mb-3">If you have any questions about these Terms, please contact us at:</p>
              <ul className="text-gray-700 space-y-1">
                <li><span className="font-semibold">Email:</span> <a href="mailto:support@scholaroftheyear.com" className="text-emerald-600 hover:text-emerald-800 underline">support@scholaroftheyear.com</a></li>
                <li><span className="font-semibold">Phone:</span> <a href="tel:+918882796281" className="text-emerald-600 hover:text-emerald-800 underline">+91 88827 96281</a></li>
                <li><span className="font-semibold">Address:</span> D-1/38, F/F Palam extention Sec-7 Dwarka Opp. Vishal Mega Mart New Delhi 110075</li>
              </ul>
            </div>
          </div>
          
          {/* Section 11 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 text-left bg-emerald-600 text-white font-medium">
              <span className="text-lg">11. Privacy Policy Reference</span>
            </div>
            <div className="p-4 bg-white">
              <p className="text-gray-700">
                Please review our Privacy Policy to understand how we collect, use, and safeguard your information.
              </p>
            </div>
          </div>
        </div>
        
        {/* Final Acknowledgement */}
        <div className="mt-10 p-6 bg-emerald-50 rounded-lg border border-emerald-200 text-center">
          <p className="text-emerald-800 font-medium">
            By using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.
          </p>
        </div>
        
        {/* Footer */}
        <div className="mt-12 text-center text-sm text-emerald-600">
          <p>&copy; {new Date().getFullYear()} Scholar of the Year - Muserurals Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default Terms;