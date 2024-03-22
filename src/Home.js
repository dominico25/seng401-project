import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Heading, Container, Flex, Avatar } from "@chakra-ui/react"; // Import Chakra UI components
import Header from "./Header";
import { googleLogout } from '@react-oauth/google';
import Navigation from "./Navigation";
import { AccountContext, useAccount } from "./AccountContext";


function Home(){
    const navigate = useNavigate();
    const [accountDetails, setAccountDetails] = useState(null);
    const { account } = useAccount();
    const { setAccount } = useContext(AccountContext);

    window.addEventListener('load', async function() {
      console.log("YOOOO", localStorage.getItem('account'))
      setAccount(localStorage.getItem('account'));
      setTimeout(() => {
        fetchAccountDetails();
      }, 1500);
      
      console.log("Account", accountDetails)
    });

    useEffect(() => {
        // Fetch account details when the component mounts
        fetchAccountDetails();
      }, []);

    // Define a logout function
    const logout = () => {
        googleLogout();
        console.log("Logged out")
        navigate('/');
    };

    const fetchAccountDetails = async () => {
        try {
          // lambda: lambda_load_acc_url
          const userEmail = account; // Set the email for fetching account details
          const response = await fetch(`https://iu6aiegbetabqqqtuup5adlj3m0zqcaz.lambda-url.ca-central-1.on.aws/?email=${userEmail}`);
          const data = await response.json();
          if (response.ok) {
            setAccountDetails(data);
          } else {
            console.error("Failed to fetch account details:", data.message);
          }
        } catch (error) {
          console.error("Error fetching account details:", error);
        }
    };

    return (
        <>
          <Header />
          <Container maxW="container.md" mt={8}>
            <Heading as="h1" size="xl">Home</Heading>
            <Flex mt={4} justifyContent="space-between" alignItems="center">
              {accountDetails && (
                <Flex alignItems="center">
                  <Avatar size="2xl" name={accountDetails.name} src={accountDetails.profile_picture} mb={4} />
                  <Link to="/AccountInfo">
                    <Button colorScheme="gray">Go to Account Details</Button>
                  </Link>
                </Flex>
              )}
              <Button colorScheme="teal" onClick={logout}>Logout</Button>
            </Flex>
          </Container>
          <Navigation />
        </>
    );
      
      
      
}

export default Home;
