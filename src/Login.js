import React, { useState, useContext, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { AccountContext } from './AccountContext';
import b1 from './background_images/img1.jpeg';
import b2 from './background_images/img2.jpeg';
import b3 from './background_images/img4.jpeg';
import b4 from './background_images/img5.jpg';
import b5 from './background_images/img6.jpg';
import b6 from './background_images/img7.jpg';
import home_logo from "./images/homepage_logo.png";

import './login.css';

const images = [b1, b2, b3, b4, b5, b6];

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { setAccount } = useContext(AccountContext); // Access setAccount from AccountContext
  const [backgroundImage, setBackgroundImage] = useState(""); // Declare and initialize background state
  useEffect(() => {
    const numOfImages = images.length;
    const randomNum = Math.floor(Math.random() * numOfImages);    
    setBackgroundImage(`${images[randomNum]}`);
  }, []);

  const onSuccess = async (credentialResponse) => {
    const decodedToken = jwtDecode(credentialResponse.credential);
    const userEmail = decodedToken.email;

    // Call lambda function to check if the user exists
    // lambda: lambda_load_acc_url
    const response = await fetch(`https://3tjmyt6xpa6nfilpkiyr5rtwba0roicr.lambda-url.ca-central-1.on.aws/?email=${userEmail}`);
    const data = await response.json();

    console.log('Logged in User Email:', userEmail);
    
    if (response.status === 404) { 
      try {
        const formData = new FormData();
        formData.append("profile_picture", "https://static.vecteezy.com/system/resources/previews/019/879/198/non_2x/user-icon-on-transparent-background-free-png.png");
        formData.append("account_id", userEmail);
        formData.append("email", userEmail);
        formData.append("name", "Add your name!");
        formData.append("bio", "Add a bio!");

        // Make an HTTP request to the API Gateway endpoint

        // lambda: lambda_save_acc_url
        const response = await fetch(`https://pcfb42vy7ki24kcqwb42kg32pa0qphmz.lambda-url.ca-central-1.on.aws/`, {

            method: "POST",
            body: formData, // Pass FormData directly as the body
        });
        const responseBody = await response.json();
  
        if (response.ok) {
          // Handle success
          console.log(responseBody);

        } else {
          // Handle error
          console.error(responseBody);
          // Optionally display an error message to the user
        }
      } catch (error) {
        console.error("Error during API request:", error);
        // Optionally display an error message to the user
      }
    }
    // Call lambda function to retrieve account details
  
    // lambda: lambda_load_acc_url
    const accountResponse = await fetch(`https://3tjmyt6xpa6nfilpkiyr5rtwba0roicr.lambda-url.ca-central-1.on.aws/?email=${userEmail}`);
    const accountData = await accountResponse.json();

    // Set the user object to state
    setUser(accountData);
    setAccount(accountData.email);
    console.log(accountData.email)
    navigate('/Home'); // Redirect to Home page
  };

  return (
    <div id='login_page' style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7) ), url(${backgroundImage})`}}>

      <div className="title">
        <img src = {home_logo} alt = "Dream Closet" className = "logo"></img>
        <p>Step Into Your Dream Closet </p>
      </div>

      <div className='login_container'>

        <div className="signup_content">
          <h1>Sign In</h1>
          <p>or Create an account with Google</p>
        </div>

        <form id='login_form'>
    
          <GoogleLogin
          
          onSuccess={onSuccess}
          onError={() => {
          console.log('Login Failed');
            }}></GoogleLogin>
        </form>
      </div>

   
    </div>
   
     
  );
};

export default Login;