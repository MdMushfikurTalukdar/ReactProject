import React from "react";
import  {Header}  from "../components/Home/Header.jsx";
import Footer from "../components/Home/Footer.jsx";
import {SemesterRegistration} from "../components/SemesterRegistration/SemesterRegistration.jsx";

function SemesterRegistrationForm() {
  return (
    <>
      <Header />
      <SemesterRegistration />
      <Footer />
    </>
  );
}

export default SemesterRegistrationForm;
