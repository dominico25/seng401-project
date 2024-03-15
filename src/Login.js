import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import b1 from './background_images/img1.jpeg';
import b2 from './background_images/img2.jpeg';
import b3 from './background_images/img3.jpeg';
import b4 from './background_images/img4.jpeg';
import b5 from './background_images/img5.jpg';
import b6 from './background_images/img6.jpg';
import b7 from './background_images/img7.jpg';
import home_logo from "./images/homepage_logo.png";


import email_icom from "./icons/email.png";
import password_icon from "./icons/password.png";


import './login.css';

const clientId = '52196466868-3n2nemknh184a6nsp6vp900g77jqd0ak.apps.googleusercontent.com';
const images = [b1, b2, b3, b4, b5, b6, b7];

const Login = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(""); // Declare and initialize userEmail state
  const [userPassword, setUserPassword] = useState(""); // Declare and initialize userPassword state
  const [backgroundImage, setBackgroundImage] = useState(""); // Declare and initialize background state
  

  useEffect(() => {
    const numOfImages = images.length;
    const randomNum = Math.floor(Math.random() * numOfImages);    
    setBackgroundImage(`${images[randomNum]}`);
  }, []);
  
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
    <div id='login_page' style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7) ), url(${backgroundImage})`}}>

      <div className="title">
        <img src = {home_logo} alt = "Dream Closet" className = "logo"></img>
        <p>Sign in or Create an account </p>
      </div>

      <div className='login_container'>

        <div className="signup_content">
          <h1>Sign in</h1>
          <p>New User ? Create an account</p>
        </div>
       
        <div className="Inputs">
          <div className="input">
            <img src={email_icom} alt="email" className="icon"></img>
            <input type='text' id='email' placeholder='Email' onChange={(e) => setUserEmail(e.target.value)}>
          </input></div>

          <div className="input">
            <img src={password_icon} alt="password" className="icon"></img>
            <input type='password' id='password' placeholder='Password'>
          </input></div>

        

        </div>

        <div className="signup_buttons">
          <div className="signin"><button type='submit' id='signup_button'>Sign up</button></div>

          <div className="signin"> <button type='submit' id='signin_button'>Login in</button></div>
        </div>

        <form id='login_form'>
          <GoogleOAuthProvider clientId={clientId} id = 'google_login'>
            <GoogleLogin
              onSuccess={onSuccess}
              onFailure={onFailure}
              onError={() => {
                console.log('Login Failed');
              }}
              clientId={clientId}
              buttonText='Login with Google'
              cookiePolicy={'single_host_origin'}
              id='google_login'
            ></GoogleLogin>
          </GoogleOAuthProvider>
        </form>
      </div>

   
    </div>
   
     
  );
};

export default Login;
