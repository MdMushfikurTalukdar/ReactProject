import React, { useState } from 'react';
import NavbarNew from './NavbarNew';
import Footer from './Home/Footer';

const VerifyBonafiedCertificate = ({ firstName, enrollment, marksheetImage }) => {
    const [verified, setVerified] = useState(false);

    
    const handleCheckboxChange = (event) => {
      setVerified(event.target.checked);
    };
  
    const handleAccept = () => {
      if (verified) {
        alert("Documents Accepted");
      } else {
        alert("Please verify all documents before proceeding.");
      }
    };
  
    const handleReject = () => {
      if (verified) {
        alert("Documents Rejected");
      } else {
        alert("Please verify all documents before proceeding.");
      }
    };
  
    return (
      <>
      <NavbarNew/>
      <div className="p-4 max-w-md mx-auto mt-6 bg-white shadow-md rounded-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">First Name:</label>
          <input
            type="text"
            value={firstName}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Enrollment:</label>
          <input
            type="text"
            value={enrollment}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Marksheet Image:</label>
          {marksheetImage && (
            <div className="mt-4">
              <img src={marksheetImage} alt="Marksheet Preview" className="w-full h-auto border border-gray-300 rounded-md" />
            </div>
          )}
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="verify"
            className="mr-2"
            checked={verified}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="verify" className="text-gray-700">I have verified ALL THE DOCUMENTS</label>
        </div>
        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring focus:ring-green-200"
            onClick={handleAccept}
            disabled={!verified}
          >
            Accept
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none focus:ring focus:ring-red-200"
            onClick={handleReject}
            disabled={!verified}
          >
            Reject
          </button>
        </div>
      </div>
      <Footer/>
      </>
    );
  };

export default VerifyBonafiedCertificate;


