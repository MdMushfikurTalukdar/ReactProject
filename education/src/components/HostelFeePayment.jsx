import React, { useState } from 'react'

function HostelFeePayment() {
  const [name, setName] = useState('John Doe') 
  const [registrationNo, setRegistrationNo] = useState('12345678') 
  const [feeType, setFeeType] = useState('Monthly')
  const [noOfMonths, setNoOfMonths] = useState(1)
  const [total, setTotal] = useState(0)

  const today = new Date().toISOString().slice(0, 10);

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleRegistrationChange = (event) => {
    setRegistrationNo(event.target.value)
  }

  const handleFeeTypeChange = (event) => {
    setFeeType(event.target.value)
  }

  const handleNoOfMonthsChange = (event) => {
    setNoOfMonths(event.target.value)
  }

  const calculateTotal = () => {
    setTotal(feeType === 'Monthly' ? 1000 * noOfMonths : 2000)
  }

   // Fetch or receive student data on component mount (if not provided as a prop)
  // useEffect(() => {
  //   // Your logic to fetch student data
  //   // Example:
  //   // fetch('/api/students/:studentId')
  //   //   .then(response => response.json())
  //   //   .then(data => {
  //   //     setName(data.name);
  //   //     setRegistrationNo(data.registrationNo);
  //   //   });
  // }, []); 
     
  return (
      <div className="container mx-auto px-4 py-10">
        <div className="bg-white shadow-lg rounded-lg px-8 pb-8">
          <h1 className="text-3xl font-bold text-center mb-6">Hostel/Mess Fee Payment</h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-gray-700 font-semibold">Name:</div>
            <div>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="text-gray-700 font-semibold">Registration No:</div>
            <div>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                value={registrationNo}
                onChange={handleRegistrationChange}
              />
            </div>
            <div className="text-gray-700 font-semibold">From:</div>
            <div>
              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2"
                min={today}
                defaultValue={today}
              />
            </div>
            <div className="text-gray-700 font-semibold">To:</div>
            <div>
              <input type="date" className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div className="text-gray-700 font-semibold">Fee Type:</div>
            <div>
              <select value={feeType} onChange={handleFeeTypeChange} className="w-full border rounded-lg px-3 py-2">
                <option value="Monthly">Monthly</option>
                <option value="Semester">Semester</option>
              </select>
            </div>
            <div className="text-gray-700 font-semibold">No. of Months:</div>
            <div>
              <input
                type="number"
                min="1"
                className="w-full border rounded-lg px-3 py-2"
                value={noOfMonths}
                onChange={handleNoOfMonthsChange}
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600" onClick={calculateTotal}>
              Calculate Total
            </button>
          </div>
          <div className="text-gray-700 font-semibold mt-4 text-right">Total: {total}</div>
          <div className="flex justify-end mt-4">
            <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600">
              Pay & Request to Verify
            </button>
          </div>
        </div>
      </div>
  )
}

export default HostelFeePayment

 