
import React, { useState, useEffect } from 'react';

const ComplaintForm = () => {
  const [prefilledData, setPrefilledData] = useState({
    registrationNo: '12134568907',
    name: 'Siddharth',
    branch: 'CSE'
  });
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Fetch prefilled data from backend
    const fetchPrefilledData = async () => {
      try {
        const response = await fetch('/api/userdata');
        const data = await response.json();
        setPrefilledData({
          registrationNo: data.registrationNo,
          name: data.name,
          branch: data.branch
        });
      } catch (error) {
        console.error('Error fetching prefilled data:', error);
      }
    };

    // Fetch complaints from backend
    const fetchComplaints = async () => {
      try {
        const response = await fetch('/api/complaints');
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchPrefilledData();
    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newComplaint = {
      type: formData.get('type'),
      subject: formData.get('subject'),
      description: formData.get('description')
    };

    try {
      // Send new complaint to backend
      const response = await fetch('/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComplaint)
      });
      if (!response.ok) throw new Error('Failed to submit complaint');

      // Fetch updated complaints list
      const updatedComplaints = await response.json();
      setComplaints(updatedComplaints);
    } catch (error) {
      console.error('Error submitting complaint:', error);
    }

    e.target.reset();
  };

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-4">
        <h1 className="text-2xl font-bold">Complaints Form</h1>
      </header>

      <form className="bg-white p-4 shadow-md rounded" onSubmit={handleSubmit}>
        <div className="mb-4  flex items-center justify-start gap-5">
          <label className="block text-gray-700">Registration/ Employee No:</label>
          <input type="text" className="mt-1 block w-60 bg-gray-100 p-2 rounded" value={prefilledData.registrationNo} disabled />
        </div>
        <div className="mb-4  flex gap-4 items-center flex-wrap">
          <label className="block text-gray-700">Name:</label>
          <input type="text" className="mt-1 block w-60 bg-gray-100 p-2 rounded" value={prefilledData.name} disabled />
          <label className="block text-gray-700">Branch:</label>
          <input type="text" className="mt-1 block w-60 bg-gray-100 p-2 rounded" value={prefilledData.branch} disabled />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Complaint Type:</label>
          <select name="type" className="mt-1 block w-60 bg-gray-100 p-2 rounded">
          <option value="Ragging related">Ragging related</option>
//             <option value="Academic fees">Academic fees</option>
//             <option value="Classes related">Classes related</option>
//             <option value="Others">Others</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Subject:</label>
          <input type="text" name="subject" className="mt-1 block w-60 bg-gray-100 p-2 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Complaint Description:</label>
          <textarea name="description" className="mt-1 block w-80 bg-gray-100 p-2 rounded" rows="4"></textarea>
        </div>
        <div className="text-center">
          <button type="submit" className="bg-[#6BA9A9]  text-white text-xl border-none hover:bg-[#558888] px-4 py-2 rounded">Register Complaint</button>
        </div>
      </form>

      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">Previous Complaints:</h2>
        {complaints.length > 0 ? (
          complaints.map((complaint, index) => (
            <div key={index} className="bg-gray-100 p-4 mb-4 rounded shadow">
              <p><strong>Complaint Type:</strong> {complaint.type}</p>
              <p><strong>Subject:</strong> {complaint.subject}</p>
              <p><strong>Registered on:</strong> {complaint.registeredOn}</p>
              <p><strong>Status:</strong> {complaint.status}</p>
            </div>
          ))
        ) : (
          <p>No previous complaints.</p>
        )}
      </section>
    </div>
  );
};

export default ComplaintForm;
