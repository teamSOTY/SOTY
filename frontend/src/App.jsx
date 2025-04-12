// App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './homePage/Home';
import StudentRegister from './homePage/registration/studentRegistration/StudentRegister';
import About from './about/About';
import Faq from './faq/Faq';
import Contact from './contact/Contact';
import InstituteRegister from './homePage/registration/instituteRegistration/InstituteRegister';
import PaymentComponent from './homePage/registration/studentRegistration/PaymentComponent';
import StudentDashboard from './dashboard/studentDashboard/StudentDashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<StudentRegister />} />
      <Route path="/about" element={<About></About>}/>
      <Route path="/faq" element={<Faq></Faq>}/>
      <Route path="/contact" element={<Contact></Contact>}/>
      <Route path="/institute-register" element={<InstituteRegister></InstituteRegister>}/>
      <Route path="/payment" element={<PaymentComponent></PaymentComponent>}/>
      <Route path="/studentDashboard" element={<StudentDashboard></StudentDashboard>}/>
    </Routes>
  );
};

export default App;
