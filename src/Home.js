import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Heading, Container, Flex, Avatar } from "@chakra-ui/react"; // Import Chakra UI components
import Header from "./Header";
import { googleLogout } from '@react-oauth/google';
import Navigation from "./Navigation";

function Home(){
    const navigate = useNavigate();
    const [accountDetails, setAccountDetails] = useState(null);

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
          const userEmail = "rjugdev@gmail.com"; // Set the email for fetching account details
          const response = await fetch(`https://dhu6lzgfxt2mvshygjjmvho5qa0ftclg.lambda-url.ca-central-1.on.aws/?email=${userEmail}`);
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
