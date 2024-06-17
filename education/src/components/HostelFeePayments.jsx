

import React, { useState } from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = Array.from(
  new Array(10),
  (val, index) => new Date().getFullYear() + index
);

function HostelFeePayment() {
  const [name, setName] = useState("Siddharth");
  const [registrationNo, setRegistrationNo] = useState("12345678");
  const [feeType, setFeeType] = useState("Select");
  const [noOfMonths, setNoOfMonths] = useState(1);
  const [total, setTotal] = useState(0);
  const [startMonth, setStartMonth] = useState(months[new Date().getMonth()]);
  const [startYear, setStartYear] = useState(new Date().getFullYear());
  const [endMonth, setEndMonth] = useState(months[new Date().getMonth()]);
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const [monthlyCharges, setmonthlyCharges] = useState("1000")

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleRegistrationChange = (event) => {
    setRegistrationNo(event.target.value);
  };

  const handleFeeTypeChange = (event) => {
    setFeeType(event.target.value);
  };

  const handleNoOfMonthsChange = (event) => {
    setNoOfMonths(event.target.value);
  };
  const handlemonthlyCharge = (event) => {
    setmonthlyCharges(event.target.value);
  };

  const calculateTotal = () => {
    setTotal(monthlyCharges * noOfMonths);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white shadow-lg rounded-lg px-8 pb-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Hostel/Mess Fee Payment
        </h1>
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Name:</label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">
              Registration No:
            </label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2"
              value={registrationNo}
              onChange={handleRegistrationChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">From:</label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2"
              value={`${startMonth} ${startYear}`}
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">To:</label>
            <div className="flex">
              <select
                value={endMonth}
                onChange={(e) => setEndMonth(e.target.value)}
                className="w-32 border rounded-lg px-3 py-2 mr-2"
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                className="w-32 border rounded-lg px-3 py-2"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            
          </div>
        
        <div className="flex items-center gap-20 mt-4 ">
        <div className="flex flex-col ">
            <label className="text-gray-700 font-semibold mb-1">
              Fee Type:
            </label>
            <select
              value={feeType}
              onChange={handleFeeTypeChange}
              className="w-fit border rounded-lg px-3 py-2"
            >
              <option value="Select">Select</option>
              <option value="Maintenance Fee">Maintenance Fee</option>
              <option value="Mess Fee">Mess Fee</option>
              <option value="Security Money">Security Money</option>
            </select>
          </div>
          <div className="font-semibold flex flex-col items-center justify-center"><label htmlFor="charge">Monthly Charges:</label>
            <input className="px-2 py-2  ml-2 rounded-md" id="charge" type="text" value={monthlyCharges} onChange={handlemonthlyCharge} />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">
              No. of Months:
            </label>
            <input
              type="number"
              className="border w-fit rounded-lg px-3 py-2"
              value={noOfMonths}
              onChange={handleNoOfMonthsChange}
            />
          </div>
        </div>
        </div>

        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={calculateTotal}

          >
            Calculate Total
          </button>
        </div>
        <div className="text-gray-700 font-semibold text-right mb-4">
          Total: {total}
          <hr className="mt-2 font-bold" />
        </div>
        <div className="flex justify-center mb-4">
          <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600">
            Pay & Request to Verify
          </button>
        </div>
        <hr />
        <div className="border-t pt-4">
          <h2 className="text-xl font-bold mb-2">Previous Fee Payments:</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-gray-700 font-semibold">Fee Type:</div>
            <div className="text-gray-700 font-semibold">From:</div>
            <div className="text-gray-700 font-semibold">To:</div>
            <div>Maintenance Fee</div>
            <div>2023-01</div>
            <div>2023-03</div>
            <div>Security Money</div>
            <div>2023-09</div>
            <div>2024-01</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostelFeePayment;
