import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavbarNew.css"; // If you have custom CSS, keep this import
import { jwtDecode } from "jwt-decode";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Box, Button, Divider } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { Height, Padding } from "@mui/icons-material";

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
  // const other_responsibilities = [
  //   { name: "Add Subject", link: "/sem-sub-register" },
  //    { name: "Add Branch", link: "/sem-branch-register" },
  //    { name: "Add College", link: "/add-college" },
  //   { name: "Semester Registration Request", link: "/verifySemesterRegistration" }
  // ];

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
  const  [hide,setHide]=useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Hello User! Ready to begin your journey with us?", time: "5 min ago" },
    { id: 2, text: "You have successfully enrolled in this semester. Happy Learning!", time: "8 min ago" },
    { id: 3, text: "Your profile has been updated successfully.", time: "10 min ago" },
    { id: 4, text: "Reminder: Your assignment for [Course Name] is due on [Date].", time: "14 min ago" },
    { id: 5, text: "You have a new message from [Instructor Name].", time: "15 min ago" },
    { id: 6, text: "Reminder: Your subscription will renew on [Date].", time: "25 min ago" },
    { id: 7, text: "Reminder: Your subscription will end on [Date].", time: "26 min ago" },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
  };

  const navigate=useNavigate();



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
                      className="hover:bg-blue-50 px-4 py-2 cursor-pointer"
                      onClick={toggleNestedDropdownGeneral}
                    >
                      {mainOptions[0]}
                      {isNestedDropdownGeneralOpen && (
                        <div
                          className="hover:bg-blue-50 mt-2 bg-white rounded-lg shadow-md"
                          style={{ textDecoration: "none" }}
                        >
                          {general.map((item, index) => (
                            <Link
                              key={index}
                              className="block px-4 py-2 text-gray-800 hover:bg-blue-100 "
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
                          className="hover:bg-blue-50 px-4 py-2 cursor-pointer"
                          onClick={toggleNestedDropdownAcademic}
                        >
                          {mainOptions[1]}
                          {isNestedDropdownAcademicOpen && (
                            <div className="hover:bg-blue-50 mt-2 bg-white rounded-lg shadow-md">
                              {academic.map((item, index) => (
                                <Link
                                  key={index}
                                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
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
                          className="hover:bg-blue-50 px-4 py-2 cursor-pointer"
                          onClick={toggleNestedDropdownResidential}
                        >
                          {mainOptions[2]}
                          {isNestedDropdownResidentialOpen && (
                            <div className="mt-2 bg-white rounded-lg shadow-md">
                              {residential.map((item, index) => (
                                <Link
                                  key={index}
                                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
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
                    {/* {roll !== "student" && roll !== "caretaker" && (
                      <div
                        className="hover:bg-blue-50 px-4 py-2 cursor-pointer"
                        onClick={toggleNestedDropdownOther_responsibilities}
                      >
                        {mainOptions[3]}
                        {isNestedDropdownOther_responsibilitiesOpen && (
                          <div className="mt-2 bg-white rounded-lg shadow-md">
                            {other_responsibilities.map((item, index) => (
                              <Link
                                key={index}
                                className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                                to={item.link}
                                style={{ textDecoration: "none" }}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )} */}
                    {roll === "caretaker" && (
                      <div
                        className="hover:bg-blue-50 px-4 py-2 cursor-pointer"
                        onClick={toggleNestedDropdownOther_responsibilities}
                      >
                        {mainOptions[4]}
                        {isNestedDropdownOther_responsibilitiesOpen && (
                          <div className="mt-2 bg-white rounded-lg shadow-md">
                            {fees_add.map((item, index) => (
                              <Link
                                key={index}
                                className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
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
                        className="hover:bg-blue-50 px-4 py-2 cursor-pointer"
                        onClick={toggleNestedDropdownOthers}
                      >
                        {mainOptions[5]}
                        {isNestedDropdownOthersOpen && (
                          <div className="mt-2 bg-white rounded-lg shadow-md">
                            {others.map((item, index) => (
                              <Link
                                key={index}
                                className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
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
                        className="hover:bg-blue-50 px-4 py-2 cursor-pointer"
                        onClick={toggleNestedDropdownFacultyAcademic}
                      >
                        {mainOptions[1]}
                        {isNestedDropdownFacultyAcadamicOpen && (
                          <div className="mt-2 bg-white rounded-lg shadow-md">
                            {facultyAcadamic.map((item, index) => (
                              <Link
                                key={index}
                                className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
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
                        className="hover:bg-blue-50 px-4 py-2 cursor-pointer"
                        onClick={toggleNestedDropdownHOD}
                      >
                        {mainOptions[6]}
                        {isNestedDropdownHODOpen && (
                          <div className="mt-2 bg-white rounded-lg shadow-md">
                            {hod.map((item, index) => (
                              <Link
                                key={index}
                                className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
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
          <div className="flex items-center space-x-4">
            <div className="relative cursor-pointer" onClick={() => setShowNotifications(!showNotifications)}>
              <IoIosNotificationsOutline size={24} />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
                  {notifications.length}
                </span>
              )}
            </div>
            {showNotifications && (
              <div className="bg-white shadow-lg rounded-md z-10" style={{position:"absolute",top:"54px",right:"24px",width:"16.7rem",backgroundColor:"whitesmoke"}}>
                <Box p={2} style={{overflowY:'scroll',height:"450px"}}>
                  <div className="flex justify-between items-center">
                    <h4>Notifications</h4>
                    <Button variant="outlined" size="small" onClick={deleteAllNotifications} style={{color:"rgb(107, 169, 169)"}}>
                      Clear All
                    </Button>
                  </div>
                  <Divider style={{marginTop:"5px"}}/>
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div key={notification.id} className="flex justify-between items-center py-2 font-semibold">
                        <div>
                          <p>{notification.text}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                        <Button size="small" onClick={() => deleteNotification(notification.id)} style={{color:"rgb(107, 169, 169)"}}>
                          Delete
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-2 text-gray-500" style={{marginTop:"100px"}}>No notifications</p>
                  )}
                </Box>
              </div>
            )}
            <div className="relative">
              <CgProfile size={24} className="cursor-pointer" onClick={(e)=>{navigate('/profile')}}/>
            </div>
          </div>
        
        </div>
      </nav>
    </>
  );
};

export default NavbarNew;
