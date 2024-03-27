import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { List, ListItem } from "@chakra-ui/react";
import { Flex, Box, Text, Button, Heading, Avatar } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';
import logo from "./images/logo.gif";
import Navigation from "./Navigation";
import { AccountContext, useAccount } from "./AccountContext";


function Header(){
    const navigate = useNavigate();
    const [accountDetails, setAccountDetails] = useState(null);
    let { account } = useAccount();
    const { setAccount } = useContext(AccountContext);
    const [display, setDisplay] = useState("none")

    // useEffect(() => {
    //     // Fetch account details when the component mounts
    //     fetchAccountDetails();
    //   }, []);
    const [accountLoaded, setAccountLoaded] = useState(false);
    useEffect(() => {
        const storedAccount = localStorage.getItem('account');
        if (storedAccount) {
            setAccount(storedAccount);
            setAccountLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (accountLoaded) {
            fetchAccountDetails();
        }
    }, [accountLoaded]); 
    window.addEventListener('load', async function() {
        console.log("YOOOO", localStorage.getItem('account'))
        setAccount(localStorage.getItem('account'));
        account = localStorage.getItem('account');
        setTimeout(() => {
            fetchAccountDetails();
        }, 1500);
        
    });

    // Define a function to toggle the menu
    const toggleMenu = () => {
        setDisplay(display === "none" ? "block" : "none");
    }

    // Define a logout function
    const logout = () => {
        googleLogout();
        localStorage.removeItem('account');
        console.log("Logged out");
        navigate('/');
    };

    const fetchAccountDetails = async () => {
        try {
          const userEmail = account; // Set the email for fetching account details
          const response = await fetch(`https://3tjmyt6xpa6nfilpkiyr5rtwba0roicr.lambda-url.ca-central-1.on.aws/?email=${userEmail}`);
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
        <Flex bg={'#282c34'} height={'15vh'} width = {'100vw'}color={'white'} justifyContent={'space-between'} alignContent={'center'}>
            <Heading as ="h1" ><a href='/Home'> <img src={logo} alt="logo"   className ="logo" /></a></Heading>
            {/* <Box id="navbar" bg = {'#282c34'} justifyContent={'center'}>
            <nav>
            <ul>
                <li>
                    <Link to="/Home">Home</Link>
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
                {accountDetails && (
                <Flex alignItems="center" justifyContent="center">
                  <Avatar size="lg" name={accountDetails.name} src={accountDetails.profile_picture} mb={4} className="avatar" bg={'white'} color={'#282c34'} onClick={toggleMenu}/>
                </Flex>
                  )}
              </ul>
            </nav>
            </Box> */}
            <Box id="navbar" bg="#282c34" justifyContent="center">
            <nav>
                <List display="flex" justifyContent="center" alignItems="center">
                <ListItem mx={2}>
                    <Link to="/Home">Home</Link>
                </ListItem>
                <ListItem mx={2}>
                    <Link to="/UploadItem">Upload Item</Link>
                </ListItem>
                <ListItem mx={2}>
                    <Link to="/CreateOutfit">Create Outfit</Link>
                </ListItem>
                <ListItem mx={2}>
                    <Link to="/BrowseItem">Browse Item</Link>
                </ListItem>
                <ListItem mx={2}>
                    <Link to="/BrowseOutfit">Browse Outfit</Link>
                </ListItem>
                <ListItem mx={2}>
                    <Link to="/GenerateOutfit">Generate Outfit</Link>
                </ListItem>
                {accountDetails && (
                    <Flex alignItems="center" justifyContent="center">
                    <Avatar
                        size="lg"
                        name={accountDetails.name}
                        src={accountDetails.profile_picture}
                        mb={4}
                        className="avatar"
                        bg="white"
                        color="#282c34"
                        onClick={toggleMenu}
                    />
                    </Flex>
                )}
                </List>
            </nav>
            </Box>
            {/* <Avatar size="2xl" name={accountDetails?.name} src={accountDetails?.profile_picture} mb={4} /> */}
            {/* <Button onClick={logout} color={'#282c34'} bg={'white'}>Logout</Button> */}
            </Flex>

          {accountDetails && (
            <Box display={display} backgroundColor={'grey'} width = {'20%'} height = {'35vh'} position={'fixed'} marginTop={'0.5vh'} borderRadius={'11%'} boxShadow={'0 1px 10px rgba(0, 0, 0, 0.8)'} right={"1vh"}>
            <Flex alignItems="center" justifyContent="center" display={"flex"} flexDirection={"column"} height={"100%"} width={"100%"} >
                    <Flex alignItems="center" justifyContent="center" display={"flex"} flexDirection={"row"} height={"50%"} width={"100%"}  >
                      <Avatar size="lg" name={accountDetails.name} src={accountDetails.profile_picture} mb={4} className="avatar" bg={'white'} color={'#282c34'} margin={"auto"} />
                      <Text margin={"auto"} fontSize={"1.2em"}  color={'white'} _hover={{bg: 'rgba(60, 63, 93, 0.287)', color: '#282c34', borderRadius: '10px', padding: '5px', cursor: 'pointer', fontStyle:"italic", fontWeight: 'bold'}}   >{accountDetails.name}</Text>
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-evenly" width={"100%"} height={'50%'} flexDirection={"column"}>
                      <Link to="/AccountInfo">
                          <Button color={'#282c34'} bg={'white'} _hover={{bg: '#282c34', color: 'white'}}>Go to Account Details</Button>
                      </Link>
                      <Button onClick={logout} color={'#282c34'} bg={'white'}  _hover={{bg: '#282c34', color: 'white'}}>Logout</Button>
                    </Flex>         
          </Flex>
          </Box>
          )}
      </>
        
    )
}

export default Header
