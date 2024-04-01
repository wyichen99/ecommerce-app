import React, { useState } from 'react';
import axios from 'axios';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

function LoginForm({ onLoginSuccess }) {
  // State hooks to store the username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle the login when the form is submitted
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Attempt to log in by sending a POST request to the login endpoint
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
        expiresInMins: 30, 
      });
      // Call the onLoginSuccess function passed as a prop with the received token
      onLoginSuccess(response.data.token);
    } catch (error) {
      // Log an error if the login fails
      console.error("Login failed:", error.response ? error.response.data : error);
    }
  };

  // The JSX returned by the LoginForm component
  return (
    // Container for the login form, using MDB Bootstrap classes for styling
    <MDBContainer fluid className="p-3 my-5 h-custom">
      
      {/* Row for layout, containing the image and form columns */}
      <MDBRow>
        {/* Column for the login image */}
        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample" />
        </MDBCol>

        {/* Column for the login form */}
        <MDBCol col='4' md='6'>
          <div className="d-flex flex-row align-items-center justify-content-center">
            {/* Greeting text */}
            <p className="lead fw-normal mb-0 me-3">Welcome to E-commerce App</p>
          </div>
          {/* Divider element */}
          <div className="divider d-flex align-items-center my-4"></div>

          {/* The form itself */}
          <form onSubmit={handleLogin}>
            {/* Input for username */}
            <MDBInput wrapperClass='mb-4' label='Username' id='formControlLg' type='text' size="lg"
              value={username} onChange={(e) => setUsername(e.target.value)} />
            {/* Input for password */}
            <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"
              value={password} onChange={(e) => setPassword(e.target.value)} />

            {/* Checkbox for "Remember me" option */}
            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            </div>

            {/* Login button */}
            <MDBBtn className="mb-0 px-5" size='lg' type="submit">Login</MDBBtn>
            {/* Link to registration */}
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!" className="link-danger">Register</a></p>
          </form>
        </MDBCol>
      </MDBRow>

      {/* Footer area (empty, could be filled with content as needed) */}
      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        {/* Footer Content */}
      </div>
    </MDBContainer>
  );
}

export default LoginForm;