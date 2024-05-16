// import React from 'react';
// import './Print.css'; // Import the custom print stylesheet

// const BonafideCertificate = () => {
//   return (
//     <div className="container mx-auto px-4 py-8 print:px-0 print:py-0 print:mx-0 print:w-full print:max-w-none">
//       <div className="flex justify-between items-center pb-4 print:flex-col print:items-start">
//         <div className="flex items-center space-x-2 print:hidden">
//         </div>
//       </div>
//       <div className="border border-gray-200 rounded-lg px-8 py-12 print:border-none print:rounded-none print:px-16 print:py-16">
//         <div className="text-center pb-8">
//           <div className="flex flex-col items-center space-y-4">
//             <img src="https://images.unsplash.com/photo-1525921429624-479b6a26d84d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D" alt="College Logo" className="w-24 h-24 object-cover object-center rounded print:w-32 print:h-32"/>
//             <div className="text-center">
//               <h2 className="text-2xl font-bold print:text-3xl">DEPARTMENT OF SCIENCE & TECHNOLOGY</h2>
//               <h3 className="text-xl font-medium print:text-2xl">MOTIHARI COLLEGE OF ENGINEERING, MOTIHARI</h3>
//               <p className="text-gray-500 print:text-lg">
//                 BAIRIYA, FURSATPUR, MOTIHARI, EAST CHAMPARAN, BIHAR – 845401<br />
//                 PH. NO. 06252-290699/290695<br />
//                 E-MAIL ID- <a href="mailto:mecmotihari4@gmail.com" className="text-blue-500">mecmotihari4@gmail.com</a>
//               </p>
//             </div>
//           </div>
//         </div>
//         <h2 className="text-xl font-bold text-center pb-4 print:text-2xl underline">Bonafide Certificate</h2>
//         <p className="text-justify leading-loose print:text-lg">
//           This is to certify that<br />
//           <b>Dio</b><br />
//           is a bonafide student of <b>Motihari College of Engineering</b><br />
//           bearing College Roll No.- <b>[Roll No Here]</b><br />
//           Semester/Year. (Batch <b>2020-24</b>)<br />
//           Computer Science & Engineering Department, under B.Tech Programme<br />
//           of this Institute. Class starts from [Start Date Here].<br />
//           After completing the usual academic procedure, he/she has been enrolled under the 04 years B.Tech programme of the Institute.
//         </p>
//         <div className="flex justify-end pt-8 print:justify-center">
//           <p className="text-right print:text-center">
//             Principal/OSD<br />
//             Motihari College of Engineering,<br />
//             Motihari.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BonafideCertificate;



import React, { useState, useEffect } from 'react';

const BonafideCertificate = ({setCertificateData,certificateData}) => {

 useEffect(() => {
  fetch('http://localhost:3000/certificate-data') // Ensure this URL matches your server's URL
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => setCertificateData(data[0]))
    .catch(error => console.error('Error fetching data:', error));
}, [certificateData]);

if (!certificateData) {
  return <p>Loading...</p>;
}
  return (
    <div className="container mx-auto px-4 py-8 print:px-0 print:py-0 print:mx-0 print:w-full print:max-w-none">
      <div className="flex justify-between items-center pb-4 print:flex-col print:items-start">
        <div className="flex items-center space-x-2 print:hidden">
          
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg px-8 py-12 print:border-none print:rounded-none print:px-16 print:py-16">
        <div className="text-center pb-8">
          <div className="flex flex-col items-center space-y-4">
            <img src={certificateData.logoUrl} alt="College Logo" className="w-24 h-24 print:w-32 print:h-32 object-cover rounded-lg"/>
            <div className="text-center">
              <h2 className="text-2xl font-bold print:text-3xl">DEPARTMENT OF SCIENCE & TECHNOLOGY</h2>
              <h3 className="text-xl font-medium print:text-2xl">MOTIHARI COLLEGE OF ENGINEERING, MOTIHARI</h3>
              <p className="text-gray-500 print:text-lg">
                BAIRIYA, FURSATPUR, MOTIHARI, EAST CHAMPARAN, BIHAR – 845401<br />
                PH. NO. 06252-290699/290695<br />
                E-MAIL ID- <a href={`mailto:${certificateData.email}`} className="text-blue-500">{certificateData.email}</a>
              </p>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center pb-4 print:text-2xl underline">Bonafide Certificate</h2>
        <p className="text-justify leading-loose print:text-lg">
          This is to certify that<br />
          <b>{certificateData.studentName}</b><br />
          is a bonafide student of <b>{certificateData.collegeName}</b><br />
          bearing College Roll No.- <b>{certificateData.rollNumber}</b><br />
          Semester/Year. (Batch <b>{certificateData.batch}</b>)<br />
          Computer Science & Engineering Department, under B.Tech Programme<br />
          of this Institute. Class starts from {certificateData.startDate}.<br />
          After completing the usual academic procedure, he/she has been enrolled under the 04 years B.Tech programme of the Institute.
        </p>
        <div className="flex justify-end pt-8 print:justify-center">
          <p className="text-right print:text-center">
            Principal/OSD<br />
            Motihari College of Engineering,<br />
            Motihari.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BonafideCertificate;

