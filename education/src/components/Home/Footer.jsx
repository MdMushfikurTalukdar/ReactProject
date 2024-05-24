// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <h3 className="font-bold">Contact Information</h3>
          <p>Address, Phone, Email</p>
        </div>
        <div>
          <h3 className="font-bold">Quick Links</h3>
          <p>Admissions, Careers, Privacy Policy</p>
        </div>
        <div>
          <h3 className="font-bold">Newsletter Signup</h3>
          <input type="email" placeholder="Your email" className="px-4 py-2 rounded mt-2 w-full" />
        </div>
        <div>
          <h3 className="font-bold">Accreditations and Partnerships</h3>
          <p>Logos or brief mentions</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;