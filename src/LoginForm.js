import React, { useState } from 'react';
import axios from 'axios';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
        expiresInMins: 30, 
      });
      onLoginSuccess(response.data.token);
    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data : error);
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample" />
        </MDBCol>

        <MDBCol col='4' md='6'>
          <div className="d-flex flex-row align-items-center justify-content-center">
            
            <p className="lead fw-normal mb-0 me-3">Welcome to E-commerce App</p>
          </div>
          <div></div>
          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0"></p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <MDBInput wrapperClass='mb-4' label='Username' id='formControlLg' type='text' size="lg"
              value={username} onChange={(e) => setUsername(e.target.value)} />
            <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"
              value={password} onChange={(e) => setPassword(e.target.value)} />

            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            </div>

            <MDBBtn className="mb-0 px-5" size='lg' type="submit">Login</MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!" className="link-danger">Register</a></p>
          </form>
        </MDBCol>
      </MDBRow>

      {/* Footer */}
      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        {/* Footer Content */}
      </div>
    </MDBContainer>
  );
}

export default LoginForm;