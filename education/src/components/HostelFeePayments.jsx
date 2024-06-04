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
  const [monthlyCharges, setmonthlyCharges] = useState("1000");

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
    <div class="container mx-auto px-4 py-10">
  <div class="bg-white shadow-lg rounded-lg px-8 pb-8">
    <h1 class="text-3xl font-bold text-center mb-6">Hostel/Mess Fee Payment</h1>
    <div class="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
      <div class="flex flex-col">
        <label class="text-gray-700 font-semibold mb-1">Name:</label>
        <input
          type="text"
          class="border rounded-lg px-3 py-2"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div class="flex flex-col">
        <label class="text-gray-700 font-semibold mb-1">Registration No:</label>
        <input
          type="text"
          class="border rounded-lg px-3 py-2"
          value={registrationNo}
          onChange={handleRegistrationChange}
        />
      </div>
      <div class="flex flex-col">
        <label class="text-gray-700 font-semibold mb-1">From:</label>
        <input
          type="text"
          class="border rounded-lg px-3 py-2"
          value={`${startMonth} ${startYear}`}
          readOnly
        />
      </div>
      <div class="flex flex-col">
        <label class="text-gray-700 font-semibold mb-1">To:</label>
        <div class="flex">
          <select
            value={endMonth}
            onChange={(e) => setEndMonth(e.target.value)}
            class="w-32 border rounded-lg px-3 py-2 mr-2"
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
            class="w-32 border rounded-lg px-3 py-2"
          >
            {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
            ))}
          </select>
        </div>
      </div>
    
    </div>
    <div className="flex flex-wrap justify-between mb-4 gap-6">
    <div class="flex flex-col lg:flex sm:col-span-2">
        <label class="text-gray-700 font-semibold mb-1">Fee Type:</label>
        <select
          value={feeType}
          onChange={handleFeeTypeChange}
          class="w-fit border rounded-lg px-3 py-2"
        >
          <option value="Select">Select</option>
          <option value="Maintenance Fee">Maintenance Fee</option>
          <option value="Mess Fee">Mess Fee</option>
          <option value="Security Money">Security Money</option>
        </select>
      </div>
      <div class="flex flex-col sm:col-span-2">
        <label class="text-gray-700 font-semibold mb-1">Monthly Charges:</label>
        <input
          class="px-2 py-2 ml-2 rounded-md"
          id="charge"
          type="text"
          value={monthlyCharges}
          onChange={handlemonthlyCharge}
        />
      </div>
      <div class="flex flex-col sm:col-span-2">
        <label class="text-gray-700 font-semibold mb-1">No. of Months:</label>
        <input
          type="number"
          class="border w-20 rounded-lg px-3 py-2"
          value={noOfMonths}
          onChange={handleNoOfMonthsChange}
        />
      </div>
    </div>
    <div class="flex justify-end mb-4">
      <button
        class="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600"
        onClick={calculateTotal}
      >
        Calculate Total
      </button>
    </div>
    <div class="text-gray-700 font-semibold text-right mb-4">
      Total: {total}
      <hr class="mt-2 font-bold" />
    </div>
    <div class="flex justify-center mb-4">
      <button
        class="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600"
      >
        Pay & Request to Verify
      </button>
    </div>
    <hr />
    <div class="border-t pt-4">
      <h2 class="text-xl font-bold mb-2">Previous Fee Payments:</h2>
      <div class="grid grid-cols-3 gap-4">
        <div class="text-gray-700 font-semibold">Fee Type:</div>
        <div class="text-gray-700 font-semibold">From:</div>
        <div class="text-gray-700 font-semibold">To:</div>
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
