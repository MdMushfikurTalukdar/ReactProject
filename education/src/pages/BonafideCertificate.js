import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const BonafideCertificate = () => {
  const [result, setResult] = useState([]);
  const [profile, setProfile] = useState([]);
 
  const navigate = useNavigate();

  useEffect(()=>{
    let data1 = JSON.stringify({
      college: 1,
      student: jwtDecode(localStorage?.getItem("accesstoken")).user_id,
      roll_no: jwtDecode(localStorage?.getItem("accesstoken")).user_id,
      required_for: localStorage?.getItem("required_for"),
      status: "approved",
      supporting_documents: localStorage?.getItem("file"),
      fee_structure: 'false',
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://amarnath013.pythonanywhere.com/api/user/bonafide/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
      data: data1,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(response.data);
        setResult(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);
    
  

  useEffect(() => {
    if (localStorage?.getItem("accesstoken")) {
      const response = jwtDecode(localStorage?.getItem("accesstoken"));
      console.log(response.exp);
      if (
        response.token_type !== "access" &&
        response.exp < Math.floor(Date.now() / 1000)
      ) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://amarnath013.pythonanywhere.com/api/user/profile/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response?.data);       
        setProfile(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="container mx-auto print:px-0 print:py-0 print:mx-0 print:w-full print:max-w-none">
        <div className="flex justify-between items-center pb-4 print:flex-col print:items-start">
          <div className="flex items-center space-x-2 print:hidden"></div>
        </div>
        <div className="border border-gray-200 rounded-lg px-8 py-12 print:border-none print:rounded-none print:px-16 print:py-16">
          <div className="text-center pb-4">
            <div className="flex flex-col items-center space-y-4">
              <img
                src="https://imgs.search.brave.com/nlEnn1zTIbZ2U6Nip9RwamR_i6LXgcdLZbNJO_-Qxnk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vMy8zNy9N/b3RpaGFyaV9Db2xs/ZWdlX29mX0VuZ2lu/ZWVyaW5nX2xvZ28u/anBn"
                alt="College Logo"
                className="w-24 h-24 print:w-32 print:h-32 object-cover rounded-lg"
              />
              <div className="text-center">
                <h2 className="text-2xl font-bold print:text-3xl">
                  DEPARTMENT OF SCIENCE & TECHNOLOGY
                </h2>
                <h3 className="text-xl font-medium print:text-2xl">
                  MOTIHARI COLLEGE OF ENGINEERING, MOTIHARI
                </h3>
                <p className="text-gray-500 print:text-lg">
                  BAIRIYA, FURSATPUR, MOTIHARI, EAST CHAMPARAN, BIHAR – 845401
                  <br />
                  PH. NO. 06252-290699/290695
                  <br />
                  E-MAIL ID- <span>mecmotihari4@gmail.com</span>
                </p>
              </div>
            </div>
          </div>
          <center>
            <h2
              className="text-2xl font-bold pb-2"
              style={{ textDecoration: "underline" }}
            >
              Bonafide Certificate
            </h2>
          </center>
          <p className="text-justify leading-loose print:text-lg">
            This is to certify that{" "}
            <b>
              {result?.student_details?.first_name?.slice(0, 1)?.toUpperCase()}
              {result?.student_details?.first_name?.slice(1)}{" "}
              {result?.student_details?.last_name?.slice(0, 1)?.toUpperCase()}
              {result?.student_details?.last_name?.slice(1)}
            </b>{" "}
            S/o or D/o{" "}
            <b>
              {" "}
              {result?.student_details?.father_name?.slice(0, 1)?.toUpperCase()}
              {result?.student_details?.father_name?.slice(1)}
            </b>{" "}
            bearing College Roll No.-{" "}
            <b> {result?.student_details?.registration_number}</b> is a bonafide student
            of<b> {profile?.academic_information?.current_year} </b>Semester/Year. (Batch{" "}
            <b>{profile?.academic_information?.batch}</b>)
            <b> {profile?.academic_information?.department?.toUpperCase()} Department</b>, under B.Tech
            Programme of this Institute. Class starts from{" "}
            <b>{profile?.academic_information?.enrollment_date}</b> After completing the usual
            academic procedure, he/she has been enrolled under the 04 years
            B.Tech programme of the Institute.
          </p>
          <div className="flex justify-end print:justify-center">
            <p className="text-right print:text-center">
              Principal/OSD
              <br />
              Motihari College of Engineering,
              <br />
              Motihari.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BonafideCertificate;
