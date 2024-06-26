import React, { useEffect, useState } from "react";
import "./VerifySemesterRegistration.css";
import ApprovedList from "./ApprovedList";
import NavbarNew from "../NavbarNew";
import Footer from "../Home/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifySemesterRegistration = () => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchApprovedStudents = async () => {
      try {
        const response = await axios.get(
          "https://amarnath013.pythonanywhere.com/api/user/semester-registrations/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
            },
          }
        );
        console.log(response.data);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchApprovedStudents();
  }, []);

  const navigate=useNavigate();

  const handleCardClick = (id,reg) => {
    navigate(`/facultySemesterRegistration/${id}/${reg}`);
  };
  return (
    <>
      <NavbarNew />
      <div className="printHide">
        <h2 className="text1">Semester Registration List</h2>
        <div>
          {searchResults.map((data, index) => (
            <div key={index} className="id-card" onClick={() => handleCardClick(data.id,data.student_details.personal_information.registration_number)}>
              <div className="info">
                <p>
                  <span className="label">Name:</span>{" "}
                  {data.student_details.personal_information.first_name}{" "}
                  {data.student_details.personal_information.last_name}
                </p>
                <p>
                  <span className="label">Registration No:</span>{" "}
                  {data.student_details.personal_information.registration_number}
                </p>
              </div>
              <div className="info2">
                <p>
                  <span className="label">Semester:</span>{" "}
                  {data.semester.semester_name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Approve list */}
      <ApprovedList />
      <Footer />
    </>
  );
};

export default VerifySemesterRegistration;
