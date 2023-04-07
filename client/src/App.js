import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import Home from './components/Home.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Navbar from './components/Navbar.js';
import Orders from './components/Orders.js';
import Cart from './components/Cart.js';
import Footer from './components/Footer.js';
import AdminAccount from "./components/AdminAccount.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllItemPage from "./components/AllItemPage.js";
import SearchPage from "./components/SearchPage.js";
import SingleItemPage from "./components/SingleItemPage.js";
import SingleOrderPage from "./components/SingleOrderPage.js";
import MyAccount from "./components/MyAccount.js";
import { useEffect, useState } from "react";
import Contact from "./components/Contact.js";
import ForgotPassword from "./components/ForgotPassword.js";
import ErrorPage from "./components/ErrorPage.js";
import Address from "./components/Address.js";
import Payment from "./components/Payment.js";
import PaymentWrapper from "./components/PaymentWrapper.js";
import ResetPassword from "./components/ResetPassword.js";


function App() {
  const [cookieValue, setCookieValue] = useState(Cookies.get('email'));

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedCookieValue = Cookies.get('email');
      if (updatedCookieValue !== cookieValue) {
        setCookieValue(updatedCookieValue);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [cookieValue]);
  
  return (
    <div className="App ">
      <ToastContainer />

      <Router>
        <Navbar />
        <Routes>
          {cookieValue == undefined && <Route path="/login" element={<Login />} />}
          {cookieValue == process.env.REACT_APP_ADMIN_MAIL && <Route path="/login" element={<AdminAccount />} />}
          {(cookieValue != process.env.REACT_APP_ADMIN_MAIL && cookieValue != undefined) && <Route path="/login" element={<MyAccount />} />}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/singleorderpage" element={<SingleOrderPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/allitempage" element={<AllItemPage />} />
          <Route path="/searchpage" element={<SearchPage />} />
          <Route path="/singleitempage" element={<SingleItemPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/address" element={<Address />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/paymentwrapper" element={<PaymentWrapper />} />


          <Route path="*" element={<ErrorPage />} />
        </Routes>

        <Footer />

      </Router>

    </div>
  );
}

export default App;
