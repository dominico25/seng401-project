import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = '89532782253-gsmotckp4f5jcjv3mu1c1k1sk6od2pqa.apps.googleusercontent.com'; 

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
