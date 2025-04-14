import { Routes, Route } from 'react-router-dom';
import Home from './homePage/Home';
import About from './about/About';
import Faq from './faq/Faq';
import Contact from './contact/Contact';

import StudentRegister from './homePage/registration/studentRegistration/StudentRegister';
import InstituteRegister from './homePage/registration/instituteRegistration/InstituteRegister';
import PaymentComponent from './homePage/registration/studentRegistration/PaymentComponent';
import StudentDashboard from './dashboard/studentDashboard/StudentDashboard';

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/contact" element={<Contact />} />

      {/* Registration Routes */}
      <Route path="/register/student" element={<StudentRegister />} />
      <Route path="/register/institute" element={<InstituteRegister />} />

      {/* Payment & Dashboard */}
      <Route path="/payment" element={<PaymentComponent />} />
      <Route path="/studentDashboard" element={<StudentDashboard />} />
    </Routes>
  );
};

export default App;
