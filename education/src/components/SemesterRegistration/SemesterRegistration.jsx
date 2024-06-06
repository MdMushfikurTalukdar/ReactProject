import React, { useState, useEffect,useNavigate } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
export const SemesterRegistration=()=> {
    const navigate = useNavigate();
    const [name, setName] = useState({});
    const [semesters, setSemesters] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [previousSemesters, setPreviousSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState('');
    const [userProfile, setUserProfile] = useState([]);
  
    useEffect(() => {
      if (localStorage?.getItem("accesstoken")) {
        const response = jwtDecode(localStorage?.getItem("accesstoken"));
        if (
          response.token_type!== "access" 
          && response.exp<Math.floor(Date.now() / 1000)
        ) {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    }, []);
  
    useEffect(() => {
      let config = {
        method: "GET",
        maxBodyLength: Infinity,
        url: "https://amarnath013.pythonanywhere.com/api/user/profile/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      };
  
      axios
        .request(config)
        .then((response) => {
          setUserProfile(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Semester Registration</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled
            />
          </div>
          <div>
            <label htmlFor="branch" className="block text-gray-700 font-bold mb-2">
              Branch:
            </label>
            <input
              type="text"
              id="branch"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={branch}
              onChange={e => setBranch(e.target.value)}
              disabled
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="registrationNo" className="block text-gray-700 font-bold mb-2">
              Registration No:
            </label>
            <input
              type="text"
              id="registrationNo"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={registrationNo}
              onChange={e => setRegistrationNo(e.target.value)}
              disabled
            />
          </div>
          <div>
            <label htmlFor="session" className="block text-gray-700 font-bold mb-2">
              Session:
            </label>
            <input
              type="text"
              id="session"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={session}
              onChange={e => setSession(e.target.value)}
              disabled
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="semester" className="block text-gray-700 font-bold mb-2">
            Semester:
            <select className='px-4 py-2'>
            <option value="">Select Semester</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
            <option value="5">Semester 5</option>
            </select>
          </label>
          <div
            id="semester"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={semester}
            onChange={e => setSemester(e.target.value)}
          >
         
         <div  className='p-4'>
            Subject:  
         </div>
        
            
        
        </div>

    </div>    
    </div>    
    </div>    

)  
};



