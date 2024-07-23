import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    textAlign: 'center',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
  };

  const linkStyle = {
    margin: '0 0.5rem',
    color: '#007bff',
    textDecoration: 'none',
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer style={footerStyle}>
      <div>
        <a href="/privacy-policy" style={linkStyle}>Privacy Policy</a>
        <a href="/terms-of-service" style={linkStyle}>Terms of Service</a>
        <a href="/contact" style={linkStyle}>Contact Us</a>
      </div>
      <div style={{ marginTop: '0.5rem' }}>
        &copy; {currentYear} E-Commerce Dashboard. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
