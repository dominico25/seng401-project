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
          const userEmail = "eshi.akalumhe@gmail.com"; // Set the email for fetching account details
          const response = await fetch(`https://rv4ymnazapctz6tev54qztsqlm0ugbkt.lambda-url.ca-central-1.on.aws/?email=${userEmail}`);
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
          
        </>
    );
      
      
      
}

export default Home;