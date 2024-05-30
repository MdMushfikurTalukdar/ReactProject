import React, { useState } from 'react';
import './NavbarNew.css';
import {Link} from "react-router-dom"

export const NavbarNew = () => {

    const roll="student";

    const mainOptin = ["General","Academic","Residential","Others"];
    const general = ["Profile","Change Password","Logout"];
    const academic = ["Bonafide Certificate","Academic Fee","Semester Registration","Internal Semester Marks","No dues for degree","Assignment Submission","Transfer/Leaving Certificate","Character Certificate"];
    const residential = ["Hostel Allotment Request","Hostel/Mess Fee Payment","Hostel/Mess Fee Receipts","Hostel No Dues Request"];
    const others = ["Guest Room Request","Complaints"];

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNestedDropdownGeneralOpen, setIsNestedDropdownGeneralOpen] = useState(false);
    const [isNestedDropdownAcademicOpen, setIsNestedDropdownAcademicOpen] = useState(false);
    const [isNestedDropdownResidentialOpen, setIsNestedDropdownResidentialOpen] = useState(false);
    const [isNestedDropdownOthersOpen, setIsNestedDropdownOthersOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleNestedDropdownGeneral = (e) => {
      e.stopPropagation(); // Prevents the parent dropdown from closing
      setIsNestedDropdownGeneralOpen(!isNestedDropdownGeneralOpen);
      setIsNestedDropdownAcademicOpen(false);
      setIsNestedDropdownResidentialOpen(false);
      setIsNestedDropdownOthersOpen(false);
    };
    const toggleNestedDropdownAcademic = (e) => {
      e.stopPropagation(); // Prevents the parent dropdown from closing
      setIsNestedDropdownGeneralOpen(false);
      setIsNestedDropdownAcademicOpen(!isNestedDropdownAcademicOpen);
      setIsNestedDropdownResidentialOpen(false);
      setIsNestedDropdownOthersOpen(false);
    };
    const toggleNestedDropdownResidential = (e) => {
      e.stopPropagation(); // Prevents the parent dropdown from closing
      setIsNestedDropdownGeneralOpen(false);
      setIsNestedDropdownAcademicOpen(false);
      setIsNestedDropdownResidentialOpen(!isNestedDropdownResidentialOpen);
      setIsNestedDropdownOthersOpen(false);
    };
    const toggleNestedDropdownOthers = (e) => {
      e.stopPropagation(); // Prevents the parent dropdown from closing
      setIsNestedDropdownGeneralOpen(false);
      setIsNestedDropdownAcademicOpen(false);
      setIsNestedDropdownResidentialOpen(false);
      setIsNestedDropdownOthersOpen(!isNestedDropdownOthersOpen);
    };

    return (
        <>
            <nav className="navbar"  onClick={toggleDropdown} style={{zIndex:"1000"}}>
                <div className="navbar-container">
                    <div className="menu-icon" onClick={toggleDropdown} >
                        <i className="fas fa-bars"></i>
                    </div>
                    {isDropdownOpen && (
                        <div className="dropdown-content">
                            <div className='hover' onClick={toggleNestedDropdownGeneral} >
                              {mainOptin[0]}
                              {isNestedDropdownGeneralOpen && (
                                    <div className="nested">
                                        <a className='hover second' href="/profile">{general[0]}</a>
                                        <a className='hover second' href="/change-password">{general[1]}</a>
                                        <a className='hover second' href="/security">{general[2]}</a>
                                    </div>
                                )}
                              </div>
                              {roll === 'student' && (
                            <div className='hover' onClick={toggleNestedDropdownAcademic} >
                                {mainOptin[1]}
                                {isNestedDropdownAcademicOpen && (
                                    <div className="nested">
                                        <Link className='hover second' to="/security">{academic[0]}</Link>
                                        <Link className='hover second' to="/security">{academic[1]}</Link>
                                        <Link className='hover second' to="/security">{academic[2]}</Link>
                                        <Link className='hover second' to="/security">{academic[3]}</Link>
                                        <Link className='hover second' to="/security">{academic[4]}</Link>
                                        <Link className='hover second' to="/security">{academic[5]}</Link>
                                        <Link className='hover second' to="/security">{academic[6]}</Link>
                                        <Link className='hover second' to="/security">{academic[7]}</Link>
                                    </div>
                                )}
                            </div>
                              )}

                            {roll === 'student' && (
                            <div className='hover' onClick={toggleNestedDropdownResidential} >
                                {mainOptin[2]}
                                {isNestedDropdownResidentialOpen && (
                                    <div className="nested">
                                        <Link className='hover second' to="/security">{residential[0]}</Link>
                                        <Link className='hover second' to="/security">{residential[1]}</Link>
                                        <Link className='hover second' to="/security">{residential[2]}</Link>
                                        <Link className='hover second' to="/security">{residential[3]}</Link>
                                    </div>
                                )}
                            </div>
                              )}


                              <div className='hover' onClick={toggleNestedDropdownOthers} >
                              {mainOptin[3]}
                                {isNestedDropdownOthersOpen && (
                                    <div className="nested">
                                        <Link className='hover second' to="/security">{others[0]}</Link>
                                        <Link className='hover second' to="/security">{others[1]}</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="navbar-logo">
                        SmartTechnology
                    </div>
                    
                    <div className="profile-icon">
                      <Link to="/profile">
                        <span className='profile'>Profile</span><span className='profile-text'><i className="fas fa-user"></i></span>
                      </Link>
                    </div>
                    
                    
                </div>
            </nav>
        </>
    );
};

export default NavbarNew;
