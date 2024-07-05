import React from 'react';

export const Footer = () => {
  return (
    <div style={{
      backgroundColor: '#35393b',
      color: 'white',
      padding: '40px',
      textAlign: 'center',
      position: 'relative',
      bottom: 0,
      width: '100%'
    }}>
      <div>
        <p>© {new Date().getFullYear()}. All Rights Reserved.</p>
        <p>Contact Us: Company@gmail.com</p>
        <p>Follow Us:</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span href="#" style={{ color: 'white', marginRight: '10px' }}>Facebook</span>
          <span href="#" style={{ color: 'white', marginRight: '10px' }}>Twitter</span>
          <span href="#" style={{ color: 'white' }}>Instagram</span>
        </div>
      </div>
    </div>
  );
}
