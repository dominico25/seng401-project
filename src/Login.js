import React from 'react';
import { GoogleLogin } from '@react-oauth/google';import { GoogleOAuthProvider } from '@react-oauth/google';

import "./login.css";


const clientId = '52196466868-3n2nemknh184a6nsp6vp900g77jqd0ak.apps.googleusercontent.com';

const Login = () => {
  const onSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
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
        <form id = "login_form">  
            <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
              onSuccess={onSuccess}
              onFailure={onFailure}
              clientId={clientId}
              buttonText="Login with Google"
              cookiePolicy={'single_host_origin'}
              ></GoogleLogin>
          </GoogleOAuthProvider>
        </form>      
      </div>
      </div>
   
    
  );
};

export default Login;
