import { Routes, Route,Navigate } from 'react-router-dom';
import Home from './homePage/Home';
import About from './about/About';
import Faq from './faq/Faq';
import Contact from './contact/Contact';
import ScrollToTop from './ScrollToTop';

import StudentRegister from './homePage/registration/studentRegistration/StudentRegister';
import InstituteRegister from './homePage/registration/instituteRegistration/InstituteRegister';
import PaymentComponent from './homePage/registration/studentRegistration/PaymentComponent';
import StudentDashboard from './dashboard/studentDashboard/StudentDashboard';
import InstituteDashboard from './dashboard/instituteDashboard/InstituteDashboard';
import StudentLogin from './homePage/login/studenLogin/StudentLogin';
import InstituteLogin from './homePage/login/instituteLogin/InstituteLogin';
import Terms from './termsandpolicy/Terms';
import Privacy from './termsandpolicy/Privacy';

const App = () => {
  return (
  <>
  <ScrollToTop/>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/contact" element={<Contact />} />

      {/* Registration Routes */}
      <Route path="/register/student" element={<StudentRegister />} />
      <Route path="/register/institute" element={<InstituteRegister />} />

      {/* login routes */}
      <Route path='/studentLogin' element={<StudentLogin></StudentLogin>}/>
      <Route path='/instituteLogin' element={<InstituteLogin></InstituteLogin>}/>

      {/* Payment & Dashboard */}
      <Route path="/payment" element={<PaymentComponent />} />
      <Route path="/studentDashboard" element={<StudentDashboard />} />

      {/* terms and privacy policy */}
      <Route path='/terms-conditions' element={<Terms></Terms>}/>
      <Route path='/privacy-policy' element={<Privacy></Privacy>}/>


      <Route path="/instituteDashboard" element={<InstituteDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </>
  );
};

export default App;
