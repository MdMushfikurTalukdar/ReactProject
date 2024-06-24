import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavbarNew.css"; // If you have custom CSS, keep this import
import { jwtDecode } from "jwt-decode";

export const NavbarNew = () => {
  const response = jwtDecode(localStorage?.getItem("accesstoken"));
  const roll = response?.role;

  const mainOptions = [
    "General",
    "Academic",
    "Residential",
    "Other Responsibilities",
    "Actions",
    "Others",
    "HOD"
  ];
  const general = [
    { name: "Profile", link: "/profile" },
    { name: "Change Password", link: "/change-password" },
    { name: "Logout", link: "/logout" },
  ];
  const academic = [
    { name: "Bonafide Certificate", link: "/bonafide-form" },
    { name: "Academic Fee", link: "/underDevelopment" },
    { name: "Semester Registration", link: "/semesterRegistration" },
    { name: "Internal Semester Marks", link: "/underDevelopment" },
    { name: "No dues for degree", link: "/no-dues-for-degree" },
    { name: "Assignment Submission", link: "/underDevelopment" },
    { name: "Transfer/Leaving Certificate", link: "/underDevelopment" },
    { name: "Character Certificate", link: "/underDevelopment" },
  ];
  const residential = [
    { name: "Hostel Allotment Request", link: "/hostel-room-request" },
    { name: "Hostel/Mess Fee Payment", link: "/hostel-mess-fee-payment" },
    { name: "Hostel/Mess Fee Receipts", link: "/underDevelopment" },
    { name: "Leave Request", link: "/underDevelopment" },
    { name: "Hostel No Dues Request", link: "/hostel-no-dues-request" },
    { name: "Security Money Return Request", link: "/underDevelopment" },
  ];
  const other_responsibilities = [
    { name: "Add Subject", link: "/sem-sub-register" },
    { name: "Add Branch", link: "/sem-branch-register" },
    { name: "Add College", link: "/add-college" },
  ];

  const fees_add = [
    { name: "Add Fees", link: "/add-fees" },
    { name: "Hostel Room Allotment", link: "/hostel-room-allotment" },
    { name: "Show Hostel Room Requests", link: "/hostel-room-allotment-requests" }
  ];


  const others = [
    { name: "Guest Room Request", link: "/guest-room" },
    { name: "Complaints", link: "/complaints" },
  ];

  const facultyAcadamic = [
    { name: "Upload/Check Assignment", link: "/underDevelopment" },
    { name: "Upload Internal Sem Marks", link: "/underDevelopment" }
  ];

  const hod = [
    { name: "Verify Semester Registration", link: "/verifySemesterRegistration" },
    { name: "Update Branch Subjects", link: "/underDevelopment" },
    { name: "Sign No Dues(for TC)", link: "/underDevelopment" }
  ];


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNestedDropdownGeneralOpen, setIsNestedDropdownGeneralOpen] =
    useState(false);
  const [isNestedDropdownAcademicOpen, setIsNestedDropdownAcademicOpen] =
    useState(false);
  const [isNestedDropdownResidentialOpen, setIsNestedDropdownResidentialOpen] =
    useState(false);
  const [isNestedDropdownOthersOpen, setIsNestedDropdownOthersOpen] =
    useState(false);
  const [
    isNestedDropdownOther_responsibilitiesOpen,
    setIsNestedDropdownOther_responsibilitiesOpen,
  ] = useState(false);
  const [isNestedDropdownFacultyAcadamicOpen, setIsNestedDropdownFacultyAcadamicOpen] = useState(false);
  const [isNestedDropdownHODOpen, setIsNestedDropdownHODOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNestedDropdownGeneral = (e) => {
    e.stopPropagation();
    setIsNestedDropdownGeneralOpen(!isNestedDropdownGeneralOpen);
    setIsNestedDropdownAcademicOpen(false);
    setIsNestedDropdownResidentialOpen(false);
    setIsNestedDropdownOther_responsibilitiesOpen(false);
    setIsNestedDropdownFacultyAcadamicOpen(false);
    setIsNestedDropdownOthersOpen(false);
    setIsNestedDropdownHODOpen(false);
  };
  const toggleNestedDropdownAcademic = (e) => {
    e.stopPropagation();
    setIsNestedDropdownGeneralOpen(false);
    setIsNestedDropdownAcademicOpen(!isNestedDropdownAcademicOpen);
    setIsNestedDropdownResidentialOpen(false);
    setIsNestedDropdownOther_responsibilitiesOpen(false);
    setIsNestedDropdownFacultyAcadamicOpen(false);
    setIsNestedDropdownOthersOpen(false);
    setIsNestedDropdownHODOpen(false);
  };
  const toggleNestedDropdownResidential = (e) => {
    e.stopPropagation();
    setIsNestedDropdownGeneralOpen(false);
    setIsNestedDropdownAcademicOpen(false);
    setIsNestedDropdownResidentialOpen(!isNestedDropdownResidentialOpen);
    setIsNestedDropdownOther_responsibilitiesOpen(false);
    setIsNestedDropdownFacultyAcadamicOpen(false);
    setIsNestedDropdownOthersOpen(false);
    setIsNestedDropdownHODOpen(false);
  };
  const toggleNestedDropdownOthers = (e) => {
    e.stopPropagation();
    setIsNestedDropdownGeneralOpen(false);
    setIsNestedDropdownAcademicOpen(false);
    setIsNestedDropdownResidentialOpen(false);
    setIsNestedDropdownOthersOpen(!isNestedDropdownOthersOpen);
    setIsNestedDropdownFacultyAcadamicOpen(false);
    setIsNestedDropdownOther_responsibilitiesOpen(false);
    setIsNestedDropdownHODOpen(false);
  };
  const toggleNestedDropdownOther_responsibilities = (e) => {
    e.stopPropagation();
    setIsNestedDropdownGeneralOpen(false);
    setIsNestedDropdownAcademicOpen(false);
    setIsNestedDropdownResidentialOpen(false);
    setIsNestedDropdownOthersOpen(false);
    setIsNestedDropdownOther_responsibilitiesOpen(
      !isNestedDropdownOther_responsibilitiesOpen
    );
    setIsNestedDropdownFacultyAcadamicOpen(false);
    setIsNestedDropdownHODOpen(false);
  };
  const toggleNestedDropdownFacultyAcademic = (e) => {
    e.stopPropagation();
    setIsNestedDropdownGeneralOpen(false);
    setIsNestedDropdownAcademicOpen(false);
    setIsNestedDropdownResidentialOpen(false);
    setIsNestedDropdownOthersOpen(false);
    setIsNestedDropdownOther_responsibilitiesOpen(false);
    setIsNestedDropdownFacultyAcadamicOpen(!isNestedDropdownFacultyAcadamicOpen);
    setIsNestedDropdownHODOpen(false);
  };
  const toggleNestedDropdownHOD = (e) => {
    e.stopPropagation();
    setIsNestedDropdownGeneralOpen(false);
    setIsNestedDropdownAcademicOpen(false);
    setIsNestedDropdownResidentialOpen(false);
    setIsNestedDropdownOthersOpen(false);  
    setIsNestedDropdownOther_responsibilitiesOpen(false);
    setIsNestedDropdownFacultyAcadamicOpen(false);
    setIsNestedDropdownHODOpen(!isNestedDropdownHODOpen);
  };

  return (
    <>
      <nav className="bg-gray-200 text-[#041E49] px-4 py-5 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative" onClick={toggleDropdown}>
              <div className="cursor-pointer flex items-center space-x-2">
                <i className="fas fa-bars" style={{ marginTop: "5px" }}></i>
                <span className="text-xl">Menu</span>
              </div>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <div
                      className="hover:bg-purple-200 px-4 py-2 cursor-pointer"
                      onClick={toggleNestedDropdownGeneral}
                    >
                      {mainOptions[0]}
                      {isNestedDropdownGeneralOpen && (
                        <div
                          className="mt-2 bg-white rounded-lg shadow-md"
                          style={{ textDecoration: "none" }}
                        >
                          {general.map((item, index) => (
                            <Link
                              key={index}
                              className="block px-4 py-2 text-gray-800 hover:bg-purple-100 "
                              to={item.link}
                              style={{ textDecoration: "none" }}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                    {roll === "student" && (
                      <>
                        <div
                          className="hover:bg-purple-200 px-4 py-2 cursor-pointer"
                          onClick={toggleNestedDropdownAcademic}
                        >
                          {mainOptions[1]}
                          {isNestedDropdownAcademicOpen && (
                            <div className="mt-2 bg-white rounded-lg shadow-md">
                              {academic.map((item, index) => (
                                <Link
                                  key={index}
                                  className="block px-4 py-2 text-gray-800 hover:bg-purple-100"
                                  to={item.link}
                                  style={{ textDecoration: "none" }}
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                        <div
                          className="hover:bg-purple-200 px-4 py-2 cursor-pointer"
                          onClick={toggleNestedDropdownResidential}
                        >
                          {mainOptions[2]}
                          {isNestedDropdownResidentialOpen && (
                            <div className="mt-2 bg-white rounded-lg shadow-md">
                              {residential.map((item, index) => (
                                <Link
                                  key={index}
                                  className="block px-4 py-2 text-gray-800 hover:bg-purple-100"
                                  to={item.link}
                                  style={{ textDecoration: "none" }}
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                    {roll !== "student" && roll !== "caretaker" && (
                      <div
                        className="hover:bg-purple-200 px-4 py-2 cursor-pointer"
                        onClick={toggleNestedDropdownOther_responsibilities}
                      >
                        {mainOptions[3]}
                        {isNestedDropdownOther_responsibilitiesOpen && (
                          <div className="mt-2 bg-white rounded-lg shadow-md">
                            {other_responsibilities.map((item, index) => (
                              <Link
                                key={index}
                                className="block px-4 py-2 text-gray-800 hover:bg-purple-100"
                                to={item.link}
                                style={{ textDecoration: "none" }}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    {roll === "caretaker" && (
                      <div
                        className="hover:bg-purple-200 px-4 py-2 cursor-pointer"
                        onClick={toggleNestedDropdownOther_responsibilities}
                      >
                        {mainOptions[4]}
                        {isNestedDropdownOther_responsibilitiesOpen && (
                          <div className="mt-2 bg-white rounded-lg shadow-md">
                            {fees_add.map((item, index) => (
                              <Link
                                key={index}
                                className="block px-4 py-2 text-gray-800 hover:bg-purple-100"
                                to={item.link}
                                style={{ textDecoration: "none" }}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {roll === "student" && (
                      <div
                        className="hover:bg-purple-200 px-4 py-2 cursor-pointer"
                        onClick={toggleNestedDropdownOthers}
                      >
                        {mainOptions[5]}
                        {isNestedDropdownOthersOpen && (
                          <div className="mt-2 bg-white rounded-lg shadow-md">
                            {others.map((item, index) => (
                              <Link
                                key={index}
                                className="block px-4 py-2 text-gray-800 hover:bg-purple-100"
                                to={item.link}
                                style={{ textDecoration: "none" }}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Faculty common */}
                    {roll === "faculty" && (
                      <div
                        className="hover:bg-purple-200 px-4 py-2 cursor-pointer"
                        onClick={toggleNestedDropdownFacultyAcademic}
                      >
                        {mainOptions[1]}
                        {isNestedDropdownFacultyAcadamicOpen && (
                          <div className="mt-2 bg-white rounded-lg shadow-md">
                            {facultyAcadamic.map((item, index) => (
                              <Link
                                key={index}
                                className="block px-4 py-2 text-gray-800 hover:bg-purple-100"
                                to={item.link}
                                style={{ textDecoration: "none" }}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    {/* Faculty HOD */}
                    {roll === "faculty" && (
                      <div
                        className="hover:bg-purple-200 px-4 py-2 cursor-pointer"
                        onClick={toggleNestedDropdownHOD}
                      >
                        {mainOptions[6]}
                        {isNestedDropdownHODOpen && (
                          <div className="mt-2 bg-white rounded-lg shadow-md">
                            {hod.map((item, index) => (
                              <Link
                                key={index}
                                className="block px-4 py-2 text-gray-800 hover:bg-purple-100"
                                to={item.link}
                                style={{ textDecoration: "none" }}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    {/* faculty hod end */}

                  </div>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold ml-4">Campus</h1>
          </div>
          <div className="flex items-center">
            <Link
              to="/profile"
              style={{ textDecoration: "none" }}
              className="flex items-center space-x-2"
            >
              <span className="text-xl">Profile</span>
              <i className="fas fa-user" style={{ marginTop: "0.9px" }}></i>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarNew;
