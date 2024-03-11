import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './login.css';

const clientId = '52196466868-3n2nemknh184a6nsp6vp900g77jqd0ak.apps.googleusercontent.com';

const Login = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(""); // Declare and initialize userEmail state

  const onSuccess = async (credentialResponse) => {
    try {
      const response = await fetch('YOUR_GET_ACCOUNT_DETAILS_LAMBDA_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });

      if (response.ok) {
        const userDetails = await response.json();
        console.log('Account exists:', userDetails);
      } else if (response.status === 404) {
        // Account doesn't exist, save the account details
        const saveAccountResponse = await fetch('YOUR_SAVE_ACCOUNT_LAMBDA_ENDPOINT', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail }),
        });

        if (saveAccountResponse.ok) {
          const savedAccountDetails = await saveAccountResponse.json();
          console.log('Account saved successfully:', savedAccountDetails);
        } else {
          console.error('Failed to save account:', saveAccountResponse);
        }
      } else {
        console.error('Error checking account details:', response);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }

    // Redirect to the Home page
    navigate('/Home');
  };
  
  const onFailure = (error) => {
    console.error('Login Failed:', error);
  };

  return (
    <div className='login_page'>
      <div className='background'></div>
      <div className='login_container'>
        <h1>Dream Closet</h1>
        <h2>Login</h2>
        <form id='login_form'>
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
              onSuccess={onSuccess}
              onFailure={onFailure}
              clientId={clientId}
              buttonText='Login with Google'
              cookiePolicy={'single_host_origin'}
            ></GoogleLogin>
          </GoogleOAuthProvider>
        </form>
      </div>
    </div>
  );
};

export default Login;
