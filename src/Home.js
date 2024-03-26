import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Heading, Container, Flex, Text, Box } from "@chakra-ui/react"; // Import Chakra UI components
import Header from "./Header";
import { googleLogout } from '@react-oauth/google';
import Navigation from "./Navigation";
import { AccountContext, useAccount } from "./AccountContext";
import b1 from './images/background1.jpg';
import b2 from './images/background2.jpg';
import b4 from './images/background4.jpg';


function Home(){
    return (
        <>
          <Header />
          <Container maxW="container.2xl"  width={"100%"} margin={"auto"} display={"flex"} flexDirection ={"column"} justifyContent={"center"} alignItems={"center"}>
            <Box display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"} border={"1px solid black"} borderRadius={"10px"} p={4} margin={"10px 10px"} textAlign={"center"} width={"100%"} height={'60vh'} alignItems={"center"} backgroundImage={`linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url(${b1}) `} backgroundSize={"cover"} backgroundRepeat={"no-repeat"}>
              <Heading background={"white"} size={"4xl"} p={4} borderRadius={"100%"} width = {"100px"} height={"100px"} _hover={{color: "white", cursor: "pointer", background:"#282c34"}}>1</Heading>
              <Link to="/Home"><Heading color={"white"} size={"4xl"}  _hover={{color: "#282c34", cursor: "pointer", textShadow:"2px 2px 4px #000000"}}>Dream Closet</Heading></Link>
              <Text color = {"white"} textShadow={"2px 2px 4px #000000"} fontSize={"2xl"} fontWeight={"50px"} width={"75%"}>Step into your personal style haven with our Dream Closet feature. 
                Here, you have the power to curate the wardrobe of your dreams. 
                From everyday essentials to statement pieces, this digital space is yours to organize and explore. 
                Browse through your collection effortlessly, mix and match items to create stunning outfits, and let your creativity shine.
                Whether you're planning for a special occasion or simply experimenting with new looks, your Dream Closet is the perfect place to express your unique style and fashion sense.
                </Text>
            </Box>


            <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} borderRadius={"10px"} p={4} margin={"10px 10px"} textAlign={"center"} width={"100%"} height={'60vh'} alignItems={"center"}>
              
              <Box width = {"50%"} height={'100%'}>
                <img src={b2} alt="background2" style={{borderRadius:"20px", width:"100%", height:"100%", border:"1px solid black"}}></img>
              </Box>

              <Box display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"} borderRadius={"10px"} p={4} margin={"10px 10px"} textAlign={"center"}  alignItems={"center"}  height={'60vh'} width = {"40%"}>
              <Heading background={"#282c34"} color={"white"} size={"4xl"} p={4} borderRadius={"100%"} width = {"100px"} height={"100px"} _hover={{color: "white", cursor: "pointer", background:"#282c34"}}>2</Heading>
              <Link to="/UploadItem"><Heading size={"4xl"}  _hover={{color: "#282c34", cursor: "pointer", textShadow:"2px 2px 4px #000000"}}>Upload Item</Heading></Link>
              <Text textShadow={"0px 0px 1px #000000"} fontSize={"lg"} fontWeight={"20px"} width={"100%"}>Take control of your closet like never before with our Upload Item feature. 
                Say goodbye to cluttered wardrobes and hello to digital organization. 
                Easily add your favorite clothing items by uploading images or providing details, ensuring that every piece is accounted for in your virtual closet. 
                From timeless classics to trendy finds, each item you upload becomes a building block for your personalized style journey. 
                With seamless uploading, you can effortlessly manage your wardrobe and unleash your fashion creativity with ease.
              </Text>
              </Box>
              
            </Box>

            <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}borderRadius={"10px"} p={4} margin={"10px 10px"} textAlign={"center"} width={"100%"} height={'70vh'} alignItems={"center"}>
              <Box display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"} borderRadius={"10px"} p={4} margin={"10px 10px"} textAlign={"center"}  alignItems={"center"}  height={'60vh'} width = {"70%"}>
              <Heading background={"#282c34"} color={"white"} size={"4xl"} p={4} borderRadius={"100%"} width = {"100px"} height={"100px"} _hover={{color: "white", cursor: "pointer", background:"#282c34"}}>3</Heading>
              <Link to="/CreateOutfit"><Heading size={"4xl"}  _hover={{color: "#282c34", cursor: "pointer", textShadow:"2px 2px 4px #000000"}}>Create Outfit</Heading></Link>
              <Text textShadow={"0px 0px 1px #000000"} fontSize={"lg"} fontWeight={"20px"} width={"90%"}>
                Welcome to your style studio, where every outfit is a masterpiece waiting to be crafted. 
                With our Create Outfit feature, the power to style is in your hands. 
                Mix and match items from your virtual closet to design the perfect ensemble for any occasion. 
                Experiment with colors, textures, and silhouettes until you find the look that speaks to you. 
                Whether you're planning a chic street style look or a sophisticated evening ensemble, our intuitive interface makes outfit creation a breeze. 
                Unleash your inner fashionista and bring your style vision to life with just a few clicks.
                </Text>
              </Box>
              <Box height={'100%'}>
                <img src={b4} alt="background3" style={{borderRadius:"20px", width:"100%", height:"100%"}}></img>
              </Box>
          </Box>



          <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}  borderRadius={"10px"} p={4} margin={"10px 10px"} textAlign={"center"} width={"100%"} height={'70vh'} alignItems={"center"}>
              
            <Box display={"flex"} bg={"#282c34"} flexDirection={"column"} justifyContent={"space-evenly"} alignItems={"center"} border={"1px solid black"} margin={"10px 10px"} borderRadius={"10px"} boxShadow={"0px 1px 1px #000000"} height={"100%"} position={"relative"}  _hover={{cursor: "pointer", boxShadow:"2px 2px 4px #000000", top : "-5px"}}>
                <Heading background={"white"} color={"#282c34"} size={"4xl"} p={4} borderRadius={"100%"} margin={"10px 10px"} width = {"100px"} height={"100px"} _hover={{color: "white", cursor: "pointer", background:"#282c34"}}>5</Heading>
                <Link to="/BrowseItem"><Heading size={"4xl"} color={"white"} _hover={{ cursor: "pointer", textShadow:"2px 2px 4px #000000"}}>Browse Item</Heading></Link>
                <Text color={"white"}  textShadow={"0px 0px 1px #000000"} fontSize={"lg"} fontWeight={"20px"} width={"90%"} padding={"10px"}>
                  Dive into a world of endless fashion possibilities with our Browse Item feature. 
                  Looking to expand your wardrobe? Browse through our extensive collection of clothing items sourced from top brands and designers with our Browse Item feature. 
                  Whether you're searching for wardrobe staples or statement pieces, you'll find a wide selection of clothing items to suit your style.
                  Filter by category, color, brand, and more to easily find the perfect additions to your closet. With easy navigation and personalized recommendations, finding your next fashion obsession has never been easier.
                  </Text>
              </Box>
            <Box display={"flex"} bg={"#282c34"} flexDirection={"column"} justifyContent={"space-evenly"} alignItems={"center"} border={"1px solid black"} margin={"10px 10px"}  borderRadius={"10px"} boxShadow={"0px 1px 1px #000000"} height={"100%"} position={"relative"} _hover={{cursor: "pointer", boxShadow:"2px 2px 4px #000000", top : "-5px"} }>
              <Heading background={"white"} color={"#282c34"} size={"4xl"} p={4} borderRadius={"100%"} margin={"10px 10px"} width = {"100px"} height={"100px"} _hover={{color: "white", cursor: "pointer", background:"#282c34"}}>6</Heading>
              <Link to = "/BrowseOutfit"><Heading size={"4xl"} color={"white"}  _hover={{ cursor: "pointer", textShadow:"2px 2px 4px #000000"}}>Browse Outfit</Heading></Link>
              <Text color={"white"} textShadow={"0px 0px 1px #000000"} fontSize={"lg"} fontWeight={"20px"} width={"100%"} padding={"10px"}> 
                Explore a diverse array of outfits created by users just like you, or draw inspiration from curated collections tailored to your tastes. 
                From casual chic to haute couture, there's something for every style preference and occasion. 
                Looking to expand your wardrobe? Browse through our extensive collection of clothing items sourced from top brands and designers. 
                With easy navigation and personalized recommendations, finding your next fashion obsession has never been easier.
                </Text>
            </Box>
          </Box>


          <Box display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"} borderRadius={"10px"} p={4} margin={"10px 10px"} textAlign={"center"} width={"100%"} height={'50vh'} alignItems={"center"}>
            <Heading background={"#282c34"} color={"white"} size={"4xl"} p={4} borderRadius={"100%"} width = {"100px"} height={"100px"} _hover={{color: "white", cursor: "pointer", background:"#282c34"}}>7</Heading>
            <Link to="/GenerateOutfit"><Heading size={"4xl"}  _hover={{color: "#282c34", cursor: "pointer", textShadow:"2px 2px 4px #000000"}} >Generate Outfit</Heading></Link>
            <Text textShadow={"0px 0px 1px #000000"} fontSize={"lg"} fontWeight={"20px"} width={"90%"}>Ready to shake up your style routine? Let our outfit generator ignite your fashion creativity.
              Say goodbye to outfit dilemmas and hello to effortless style inspiration. 
              With just a click, our outfit generator will create unique ensembles based on your preferences and wardrobe items. 
              Whether you're seeking a casual daytime look or a show-stopping evening outfit, our generator has you covered. 
              Discover new ways to wear your favorite pieces and experiment with different styles, all at the touch of a button. 
              Get ready to be inspired and redefine your fashion game with our cutting-edge outfit generator.
              </Text>
          </Box>


        </Container>
        </>
    );
      
}

export default Home;
