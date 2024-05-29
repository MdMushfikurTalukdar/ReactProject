import React, { useState } from 'react';
import './NavbarNew.css';
import {Link} from "react-router-dom"

export const NavbarNew = () => {
    const roll="student";
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
            <nav className="navbar"  onClick={toggleDropdown}>
                <div className="navbar-container">
                    <div className="menu-icon" onClick={toggleDropdown} >
                        <i className="fas fa-bars"></i>
                    </div>
                    {isDropdownOpen && (
                        <div className="dropdown-content">
                            <div className='hover' onClick={toggleNestedDropdownGeneral} >
                              General
                              {isNestedDropdownGeneralOpen && (
                                    <div className="nested">
                                        <a className='hover second' href="/account">Profile</a>
                                        <a className='hover second' href="/security">Change Password</a>
                                        <a className='hover second' href="/security">Logout</a>
                                    </div>
                                )}
                              </div>
                              {roll === 'student' && (
                            <div className='hover' onClick={toggleNestedDropdownAcademic} >
                                Academic
                                {isNestedDropdownAcademicOpen && (
                                    <div className="nested">
                                        <Link className='hover second' to="/security">Bonafide Certificate</Link>
                                        <Link className='hover second' to="/security">Academic Fee</Link>
                                        <Link className='hover second' to="/security">Semester Registration</Link>
                                        <Link className='hover second' to="/security">Internal Semester Marks</Link>
                                        <Link className='hover second' to="/security">No dues for degree</Link>
                                        <Link className='hover second' to="/security">Assignment Submission</Link>
                                        <Link className='hover second' to="/security">Transfer/Leaving Certificate</Link>
                                        <Link className='hover second' to="/security">Character Certificate</Link>
                                    </div>
                                )}
                            </div>
                              )}

                            {roll === 'student' && (
                            <div className='hover' onClick={toggleNestedDropdownResidential} >
                                Residential
                                {isNestedDropdownResidentialOpen && (
                                    <div className="nested">
                                        <Link className='hover second' to="/security">Hostel Allotment Request</Link>
                                        <Link className='hover second' to="/security">Hostel/Mess Fee Payment</Link>
                                        <Link className='hover second' to="/security">Hostel/Mess Fee Receipts</Link>
                                        <Link className='hover second' to="/security">Hostel No Dues Request</Link>
                                    </div>
                                )}
                            </div>
                              )}


                              <div className='hover' onClick={toggleNestedDropdownOthers} >
                                Others
                                {isNestedDropdownOthersOpen && (
                                    <div className="nested">
                                        <Link className='hover second' to="/security">Guest Room Request</Link>
                                        <Link className='hover second' to="/security">Complaints</Link>
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
