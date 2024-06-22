import React, { useState } from 'react'
import './VerifySemesterRegistration.css';

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

const ApprovedList = () => {
    const [print, setPrint] = useState(false);

    const handlePrint = () => {
        setPrint(true);
        window.print();
        setPrint(false);
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(students);
    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        const filteredStudents = students.filter((student) => {
          return (
            student.semester.toLowerCase().includes(searchTerm) ||
            student.registrationNo.toLowerCase().includes(searchTerm)
          );
        });
        setSearchResults(filteredStudents);
      };

  return (
    <>
    <div className='print'>
    <h2 className='text1'>Approved List</h2>

    <div className="search-bar">
          <input
            type="search"
            id="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <ul id="search-results"></ul>
        </div>


        <button className='printbtn' onClick={handlePrint}>Download</button>
            <div >
                {searchResults.map((student) => (
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
                ))}
    </div>
    </div>
    
    </>
  )
}

export default ApprovedList
