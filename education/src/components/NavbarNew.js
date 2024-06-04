import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavbarNew.css'; // If you have custom CSS, keep this import

export const NavbarNew = () => {
  const roll = "student";

  const mainOptions = ["General", "Academic", "Residential", "Others"];
  const general = [
    { name: "Profile", link: "/profile" },
    { name: "Change Password", link: "/change-password" },
    { name: "Logout", link: "/logout" }
  ];
  const academic = [
    { name: "Bonafide Certificate", link: "/bonafide-form" },
    { name: "Academic Fee", link: "/academic-fee" },
    { name: "Semester Registration", link: "/semesterRegistration" },
    { name: "Internal Semester Marks", link: "/internal-semester-marks" },
    { name: "No dues for degree", link: "/no-dues-for-degree" },
    { name: "Assignment Submission", link: "/assignment-submission" },
    { name: "Transfer/Leaving Certificate", link: "/transfer-leaving-certificate" },
    { name: "Character Certificate", link: "/character-certificate" }
  ];
  const residential = [
    { name: "Hostel Allotment Request", link: "/hostel-room-request" },
    { name: "Hostel/Mess Fee Payment", link: "//hostelfeePayment" },
    { name: "Hostel/Mess Fee Receipts", link: "/hostel-mess-fee-receipts" },
    { name: "Hostel No Dues Request", link: "/hostel-no-dues-request" }
  ];
  const others = [
    { name: "Guest Room Request", link: "/guest-room" },
    { name: "Complaints", link: "/complaints" }
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNestedDropdownGeneralOpen, setIsNestedDropdownGeneralOpen] = useState(false);
  const [isNestedDropdownAcademicOpen, setIsNestedDropdownAcademicOpen] = useState(false);
  const [isNestedDropdownResidentialOpen, setIsNestedDropdownResidentialOpen] = useState(false);
  const [isNestedDropdownOthersOpen, setIsNestedDropdownOthersOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNestedDropdownGeneral = (e) => {
    e.stopPropagation();
    setIsNestedDropdownGeneralOpen(!isNestedDropdownGeneralOpen);
    setIsNestedDropdownAcademicOpen(false);
    setIsNestedDropdownResidentialOpen(false);
    setIsNestedDropdownOthersOpen(false);
  };
  const toggleNestedDropdownAcademic = (e) => {
    e.stopPropagation();
    setIsNestedDropdownGeneralOpen(false);
    setIsNestedDropdownAcademicOpen(!isNestedDropdownAcademicOpen);
    setIsNestedDropdownResidentialOpen(false);
    setIsNestedDropdownOthersOpen(false);
  };
  const toggleNestedDropdownResidential = (e) => {
    e.stopPropagation();
    setIsNestedDropdownGeneralOpen(false);
    setIsNestedDropdownAcademicOpen(false);
    setIsNestedDropdownResidentialOpen(!isNestedDropdownResidentialOpen);
    setIsNestedDropdownOthersOpen(false);
  };
  const toggleNestedDropdownOthers = (e) => {
    e.stopPropagation();
    setIsNestedDropdownGeneralOpen(false);
    setIsNestedDropdownAcademicOpen(false);
    setIsNestedDropdownResidentialOpen(false);
    setIsNestedDropdownOthersOpen(!isNestedDropdownOthersOpen);
  };

  return (
    <>
      <nav className="bg-gray-200 text-[#041E49] px-4 py-5 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative" onClick={toggleDropdown}>
              <div className="cursor-pointer flex items-center space-x-2">
                <i className="fas fa-bars"></i>
                <span className="text-xl">Menu</span>
              </div>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <div className="hover:bg-purple-200 px-4 py-2 cursor-pointer" onClick={toggleNestedDropdownGeneral}>
                      {mainOptions[0]}
                      {isNestedDropdownGeneralOpen && (
                        <div className="mt-2 bg-white rounded-lg shadow-md">
                          {general.map((item, index) => (
                            
                            <Link key={index} className="block px-4 py-2 text-gray-800 hover:bg-purple-100 " to={item.link}>{item.name}</Link>
                            
                          ))}
                        </div>
                      )}
                    </div>
                    {roll === 'student' && (
                      <>
                        <div className="hover:bg-purple-200 px-4 py-2 cursor-pointer" onClick={toggleNestedDropdownAcademic}>
                          {mainOptions[1]}
                          {isNestedDropdownAcademicOpen && (
                            <div className="mt-2 bg-white rounded-lg shadow-md">
                              {academic.map((item, index) => (
                                <Link key={index} className="block px-4 py-2 text-gray-800 hover:bg-purple-100" to={item.link}>{item.name}</Link>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="hover:bg-purple-200 px-4 py-2 cursor-pointer" onClick={toggleNestedDropdownResidential}>
                          {mainOptions[2]}
                          {isNestedDropdownResidentialOpen && (
                            <div className="mt-2 bg-white rounded-lg shadow-md">
                              {residential.map((item, index) => (
                                <Link key={index} className="block px-4 py-2 text-gray-800 hover:bg-purple-100" to={item.link}>{item.name}</Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                    <div className="hover:bg-purple-200 px-4 py-2 cursor-pointer" onClick={toggleNestedDropdownOthers}>
                      {mainOptions[3]}
                      {isNestedDropdownOthersOpen && (
                        <div className="mt-2 bg-white rounded-lg shadow-md">
                          {others.map((item, index) => (
                            <Link key={index} className="block px-4 py-2 text-gray-800 hover:bg-purple-100" to={item.link}>{item.name}</Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold ml-4">Campus</h1>
          </div>
          <div className="flex items-center">
            <Link to="/profile" className="flex items-center space-x-2">
              <span className="text-xl">Profile</span>
              <i className="fas fa-user"></i>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarNew;