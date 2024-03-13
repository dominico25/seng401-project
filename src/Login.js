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

import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import Header from './Header';

const Login = () => {
  const [user, setUser] = useState(null);

  const onSuccess = async (credentialResponse) => {
    console.log(credentialResponse);
    const decodedToken = jwtDecode(credentialResponse.credential);
    const userEmail = decodedToken.email;
    console.log('Logged in User Email:', userEmail);

    // Call lambda function to check if the user exists
    const response = await fetch('YOUR_SAVE_ACCOUNT_LAMBDA_ENDPOINT', {
      method: 'POST',
      body: JSON.stringify({ email: userEmail }),
    });
    const data = await response.json();

    // If account doesn't exist, call lambda function to save the account
    if (response.status === 404) {
      await fetch('YOUR_SAVE_ACCOUNT_LAMBDA_ENDPOINT', {
        method: 'POST',
        body: JSON.stringify({
          email: userEmail,
          // Add other necessary user data here
        }),
      });
    }

    // Call lambda function to retrieve account details
    const accountResponse = await fetch('YOUR_LOAD_ACCOUNT_DETAILS_LAMBDA_ENDPOINT', {
      method: 'POST',
      body: JSON.stringify({ email: userEmail }),
    });
    const accountData = await accountResponse.json();

    // Set the user object to state
    setUser(accountData);
  };

  return (
    <Box>
      <Header />
      <GoogleLogin
        onSuccess={onSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
      >
        <Flex align="center" justify="center" h="100vh">
          <Box textAlign="center">
            <Heading mb={8}>Log in to Dream Closet with Google</Heading>
            <Button size="lg">Log in with Google</Button>
          </Box>
        </Flex>
      </GoogleLogin>
    </Box>
  );
};

export default Login;