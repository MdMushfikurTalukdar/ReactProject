import React from 'react';
import './VerifySemesterRegistration.css';
import ApprovedList from './ApprovedList';
import NavbarNew from "../NavbarNew";
import Footer from "../Home/Footer";
import { Link } from 'react-router-dom';

const students = [
    {
      "id": 1,
      "name": "John Doe",
      "semester": "Fall 2022",
      "registrationNo": "2022-001234"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "semester": "Spring 2023",
      "registrationNo": "2023-002345"
    },
    {
      "id": 4,
      "name": "Alice Brown",
      "semester": "Fall 2022",
      "registrationNo": "2022-004567"
    },
    {
      "id": 5,
      "name": "Mike Davis",
      "semester": "Spring 2023",
      "registrationNo": "2023-005678"
    }
];

const VerifySemesterRegistration = () => {

    return (
        <>
         <NavbarNew />
            <div className='printHide'>
            <h2 className='text1'>Semester Registration List</h2>
                <div>
                    {students.map((student) => (
                        <Link to={`/facultySemesterRegistration`} key={student.id}>
                            <div key={student.id} className="id-card">
                                <div className="info">
                                    <p>
                                        <span className="label">Name:</span> {student.name}
                                    </p>
                                    <p>
                                        <span className="label">Registration No:</span> {student.registrationNo}
                                    </p>
                                </div>
                                <div className="info2">
                                    <p>
                                        <span className="label">Semester:</span> {student.semester}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Approve list */}
            <ApprovedList/>
            <Footer />
        </>
    );
};

export default VerifySemesterRegistration;
