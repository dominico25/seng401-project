import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Flex, Box, Text, Button, Heading, Avatar } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';
import logo from "./images/logo.gif";
import Navigation from "./Navigation";


function Header(){
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
        <Flex bg={'#282c34'} height={'20vh'} color={'white'} justifyContent={'space-between'} alignContent={'center'}>
            <Heading as ="h1" ><a href='/'> <img src={logo} alt="logo"   className ="logo" /></a></Heading>
            <Box id="navbar" bg = {'#282c34'} justifyContent={'center'}>
            <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/UploadItem">Upload Item</Link>
                </li>
                <li>
                    <Link to="/CreateOutfit">Create Outfit</Link>
                </li>
                <li>
                    <Link to="/BrowseItem">Browse Item</Link>
                </li>
                <li>
                    <Link to="/BrowseOutfit">Browse Outfit</Link>
                </li>
                <li>
                    <Link to="/GenerateOutfit">Generate Outfit</Link>
                </li>
                <li>
                    <Link to="/AccountInfo">Account Info</Link>
                </li>
            </ul>
        </nav>
            </Box>
            <Avatar size="2xl" name={accountDetails?.name} src={accountDetails?.profile_picture} mb={4} />
            {accountDetails && (
                <Flex alignItems="center">
                  <Avatar size="2xl" name={accountDetails.name} src={accountDetails.profile_picture} mb={4} />
                  <Link to="/AccountInfo">
                    <Button colorScheme="gray">Go to Account Details</Button>
                  </Link>
                  <Button onClick={logout} color={'#282c34'} bg={'white'}>Logout</Button>
                </Flex>
              )}
           
            {/* <Button onClick={logout} color={'#282c34'} bg={'white'}>Logout</Button> */}
        </Flex>
    )
}

export default Header