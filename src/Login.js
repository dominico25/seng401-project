import React, { useState, useContext, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useAccount, AccountContext } from './AccountContext';
import b1 from './background_images/img1.webp';
import b2 from './background_images/img2.webp';
import b3 from './background_images/img4.webp';
import b4 from './background_images/img5.webp';
import b5 from './background_images/img6.webp';
import b6 from './background_images/img7.webp';
import home_logo from "./images/homepage_logo.webp";

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
    const response = await fetch(`https://5prapzdrjhfapsxx337jpkytzi0obarh.lambda-url.ca-central-1.on.aws/?email=${userEmail}`);
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
        const response = await fetch(`https://us7cng7pjgp3zvbzzaj7ubf37i0cqufw.lambda-url.ca-central-1.on.aws/`, {

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
    const accountResponse = await fetch(`https://5prapzdrjhfapsxx337jpkytzi0obarh.lambda-url.ca-central-1.on.aws/?email=${userEmail}`);
    const accountData = await accountResponse.json();

    // Set the user object to state
    setUser(accountData);
    setAccount(accountData.email);
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
          <p>New User ? Create an account</p>
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



// import React, { useState } from 'react';
// import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";
// import { Box, Button, Flex, Heading } from '@chakra-ui/react';
// import Header from './Header';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   const onSuccess = async (credentialResponse) => {
//     console.log(credentialResponse);
//     const decodedToken = jwtDecode(credentialResponse.credential);
//     const userEmail = decodedToken.email;
//     console.log('Logged in User Email:', userEmail);

//     // Call lambda function to check if the user exists
//     // fetch using "load-acc-info" lambda
//     const response = await fetch(`https://3v5owmywkqg6g3brxfqqhno65y0lvtfs.lambda-url.ca-central-1.on.aws/?email=${userEmail}`);
//     const data = await response.json();

//     // If account doesn't exist, call lambda function to save the account
//     // fetch using "save-account" lambda
//     if (response.status === 404) {
//       await fetch(`https://i3n6dghdj4er3m5stsnt3fr5ru0ayomz.lambda-url.ca-central-1.on.aws/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           email: userEmail
//           // Add other necessary user data here
//         })
//       });
//     }

//     // Call lambda function to retrieve account details
//     // fetch using "load-acc-info" lambda
//     const accountResponse = await fetch(`https://3v5owmywkqg6g3brxfqqhno65y0lvtfs.lambda-url.ca-central-1.on.aws/?email=${userEmail}`);
//     const accountData = await accountResponse.json();

//     // Set the user object to state
//     setUser(accountData);
//     navigate('/Home'); // Redirect to Home page
//   };

//   return (
//     <Box>
//       <Header />
//       <GoogleLogin
//         onSuccess={onSuccess}
//         onError={() => {
//           console.log('Login Failed');
//         }}
//       >
//         <Flex align="center" justify="center" h="100vh">
//           <Box textAlign="center">
//             <Heading mb={8}>Log in to Dream Closet with Google</Heading>
//             <Button size="lg">Log in with Google</Button>
//           </Box>
//         </Flex>
//       </GoogleLogin>
//     </Box>
//   );
// };

// export default Login;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
// import { useGoogleLogin, googleLogout } from '@react-oauth/google';
// import axios from 'axios'; 
// import './login.css';

// const clientId = '52196466868-3n2nemknh184a6nsp6vp900g77jqd0ak.apps.googleusercontent.com'; // Replace 'YOUR_CLIENT_ID_HERE' with your actual Google OAuth client ID

// const Login = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUser(parsedUser);
//       setProfile(parsedUser.profileObj);
//     }
//   }, []);

//   useEffect(() => {
//     if (user) {
//       axios
//         .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
//           headers: {
//             Authorization: `Bearer ${user.access_token}`,
//             Accept: 'application/json'
//           }
//         })
//         .then((res) => {
//           console.log("res", res)
//           setProfile(res.data);
//           localStorage.setItem("user", JSON.stringify(user));
//         })
//         .catch((err) => console.log(err));
//     }
//   }, [user]);

//   const onSuccess = async (credentialResponse) => {
//     try {
//       if (credentialResponse && credentialResponse.accessToken) {
//         setUser(credentialResponse);
//         setProfile(credentialResponse.profileObj);
//         localStorage.setItem("user", JSON.stringify(credentialResponse));
  
//         console.log('Google User Information:');
//         console.log('Email:', credentialResponse.profileObj.email);
  
//         navigate('/Home'); // Redirect to Home page
//       } else {
//         console.error('Error: Unable to retrieve user email');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//   };

//   const onFailure = (error) => {
//     console.error('Login Failed:', error);
//   };

//   const login = useGoogleLogin({
//     clientId: clientId,
//     onSuccess: onSuccess,
//     onFailure: onFailure
//   });

//   const logout = () => {
//     googleLogout();
//     setUser(null);
//     setProfile(null);
//     localStorage.removeItem('user');
//   };
  
//   return (
//     <div className='login_page'>
//       <div className='background'></div>
//       <div className='login_container'>
//         <h1>Dream Closet</h1>
//         <h2>Login</h2>
//         {profile ? (
//           <div>
//             <p>{profile.email} <button onClick={logout}>(Log out)</button></p>
//           </div>
//         ) : (
//           <form id='login_form'>
//             <button onClick={login}>
              
//               Sign in with Google
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;
