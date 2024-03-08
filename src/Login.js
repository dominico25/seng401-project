import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const clientId = '589526242989-q47tifbpeb3kkjuhlh8plbkfgsdtcvb6.apps.googleusercontent.com'; 

const Login = () => {
  const onSuccess = (response) => {
    console.log('Login Success:', response.profileObj);
  };

  const onFailure = (error) => {
    console.error('Login Failure:', error);
  };

  return (
    <div>
      <h2>Login</h2>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default Login;
