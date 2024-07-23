// import React, { useState } from 'react'

// const SignUp = () => {
//     const [name, setName] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')


//   return (
//     <div>
//       <h1>Register</h1>
      
//       <input type="text" placeholder='Enter Name' />
//       <input type="email" placeholder='Enter Email' />
//       <input type="password" placeholder='Enter Password' />
//       <button type='button'>Sign Up</button>
//     </div>
//   )
// }

// export default SignUp


import React, { useState } from 'react';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const collectData = () => {
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
  }

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    backgroundColor: '#f8f9fa',
    padding: '2rem',
    paddingBottom:'10rem'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    margin: '0.5rem 0',
    borderRadius: '4px',
    border: '1px solid #ced4da',
    fontSize: '1rem',
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    margin: '1rem 0',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#ffffff',
    fontSize: '1rem',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h1>Register</h1>
      <div style={formStyle}>
        <input
          type="text"
          placeholder="Enter Name"
          style={inputStyle}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter Email"
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" style={buttonStyle}
        onClick={collectData}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
