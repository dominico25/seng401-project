import React, { useState, useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useAccount, AccountContext } from './AccountContext';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { setAccount } = useContext(AccountContext); // Access setAccount from AccountContext


  const onSuccess = async (credentialResponse) => {
    console.log(credentialResponse);
    const decodedToken = jwtDecode(credentialResponse.credential);
    const userEmail = decodedToken.email;
    console.log('Logged in User Email:', userEmail);

    // Call lambda function to check if the user exists
    // fetch using "load-acc-info" lambda
    const response = await fetch(`https://yduraosk52s64z3h5wjg7vq67m0nitip.lambda-url.ca-central-1.on.aws/?email=${userEmail}`);
    const data = await response.json();

    // If account doesn't exist, call lambda function to save the account
    // fetch using "save-account" lambda
    // if (response.status === 404) {
    //   await fetch(`https://7eurcnlrorzcemt7xnjxtem4zm0mgvyd.lambda-url.ca-central-1.on.aws/`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       email: userEmail
    //       // Add other necessary user data here
    //     })
    //   });
    // }
    if (response.status === 404) { 
      try {
        const formData = new FormData();
        formData.append("profile_picture", "https://static.vecteezy.com/system/resources/previews/019/879/198/non_2x/user-icon-on-transparent-background-free-png.png");
        formData.append("account_id", userEmail);
        formData.append("email", userEmail);
        formData.append("name", "Add your name!");
        formData.append("bio", "Add a bio!");

        // Make an HTTP request to the API Gateway endpoint
        const response = await fetch("https://k6oi5zjkqi4hjfs7hst5ovub3a0pqozu.lambda-url.ca-central-1.on.aws/", {
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
    // fetch using "load-acc-info" lambda
    const accountResponse = await fetch(`https://yduraosk52s64z3h5wjg7vq67m0nitip.lambda-url.ca-central-1.on.aws/?email=${userEmail}`);
    const accountData = await accountResponse.json();

    // Set the user object to state
    setUser(accountData);
    setAccount(accountData.email);
    navigate('/Home'); // Redirect to Home page
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