
import { useState, useRef, useContext } from "react";
import React from "react";
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import './create-outfit.css';
import Header from "./Header";
import { useEffect } from "react";
import { useAccount, AccountContext } from './AccountContext';
import { Text, useDisclosure, Button } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'



function CreateOutfit() {
    const { account } = useAccount();
    const { setAccount } = useContext(AccountContext);
    const { isOpen, onOpen, onClose } = useDisclosure()

    console.log("YOOOO", localStorage.getItem('account'))
    setAccount(localStorage.getItem('account'));
    
    useEffect(() => {loadItemsFromRemote()},[])
    const [saveOutfitClicked, setsaveOutfitClicked] = useState(false);
    //saveoutfit useEffect
    useEffect(() =>{
    if (saveOutfitClicked){
        const topImage = document.getElementById('clothing-pics-top')
        const bottomImage = document.getElementById('clothing-pics-bottom')
        const accessoriesImage = document.getElementById('clothing-pics-accessories')
        const shoesImage = document.getElementById('clothing-pics-shoes')
        const hatsImage =document.getElementById('clothing-pics-hats')
        const outerwearImage = document.getElementById('clothing-pics-outerwear')
        const bagsImage =document.getElementById('clothing-pics-bags')
        const dressesImage = document.getElementById('clothing-pics-dresses')


        const res =  fetch(
            `https://34q4hexz65b5guqi5zt4rzrfh40dwmhw.lambda-url.ca-central-1.on.aws/`,
              {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                      
                  },
                  body: JSON.stringify({
                    top_id: topImage.getAttribute('uniqueid'),
                    bottom_id: bottomImage.getAttribute('uniqueid'),
                    dress_id: accessoriesImage.getAttribute('uniqueid'),
                    outerwear_id: shoesImage.getAttribute('uniqueid'),
                    accessories_id : hatsImage.getAttribute('uniqueid'),
                    shoes_id: outerwearImage.getAttribute('uniqueid'),
                    hat_id: bagsImage.getAttribute('uniqueid'),
                    bag_id : dressesImage.getAttribute('uniqueid'),
                    account_id: '1234'})
            }
        )
        console.log(res.body)  
    }  
   },[saveOutfitClicked])
   

   

   const testoutfit = {
        top_id: "001",
        bottom_id: '002',
        dress_id: '003',
        outerwear_id: '004',
        accessories_id : '005',
        shoes_id: '006',
        hat_id: '007',
        bag_id : '008',
        account_id: '1234'

   }

   async function loadItemsFromRemote() {
    try {
        
        const response = await fetch(
            `https://bq2lnv2etovvmc3nnp3vwzhcra0jyhkn.lambda-url.ca-central-1.on.aws/?account_id=1234`,
            );
        console.log(response)
        

        const items = await response.json();

        // Store items in local storage
        localStorage.setItem("loadeditems", JSON.stringify(items));
        console.log(items);
        console.log("Items loaded and stored in local storage");
    } catch (error) {
        console.error("Error loading za items:", error);
    }
    }






  


   const [showTopModal, setShowTopModal] = useState(false);
   const toggleTopModal = () => {
       setShowTopModal(!showTopModal);
   };


   const [showBottomModal, setShowBottomModal] = useState(false);
   const toggleBottomModal = () => {
       setShowBottomModal(!showBottomModal);
   };


   const [showAccessoriesModal, setShowAccessoriesModal] = useState(false);
   const toggleAccessoriesModal = () => {
       setShowAccessoriesModal(!showAccessoriesModal);
   };


   const [showShoesModal, setShowShoesModal] = useState(false);
   const toggleShoesModal = () => {
       setShowShoesModal(!showShoesModal);
   };

   const [showDressModal, setShowDressModal] = useState(false);
   const toggleDressModal = () => {
       setShowDressModal(!showDressModal);
   };


   const [showHatModal, setShowHatModal] = useState(false);
   const toggleHatModal = () => {
       setShowHatModal(!showHatModal);
   };


   const [showBagModal, setShowBagModal] = useState(false);
   const toggleBagModal = () => {
       setShowBagModal(!showBagModal);
   };


   const [showOuterwearModal, setShowOuterwearModal] = useState(false);
   const toggleOuterwearModal = () => {
       setShowOuterwearModal(!showOuterwearModal);
   };
  
   const [showTopPlaceholder, setShowTopPlaceholder] = useState(true);
   const [showBottomPlaceholder, setShowBottomPlaceholder] = useState(true);
   const [showAccessoriesPlaceholder, setShowAccessoriesPlaceholder] = useState(true);
   const [showShoesPlaceholder, setShowShoesPlaceholder] = useState(true);
   const [showHatPlaceholder, setShowHatPlaceholder] = useState(true);
   const [showOuterwearPlaceholder, setShowOuterwearPlaceholder] = useState(true);
   const [showBagPlaceholder, setShowBagPlaceholder] = useState(true);
   const [showDressPlaceholder, setShowDressPlaceholder] = useState(true);

   const removePlaceholder = (category) =>{
       if (category == "Top"){
           setShowTopPlaceholder(false);
       }
       else if(category == "Bottom"){
           setShowBottomPlaceholder(false);
       }
       else if(category == "Accessories"){
           setShowAccessoriesPlaceholder(false);
       }
       else if(category == "Shoes"){
           setShowShoesPlaceholder(false);
       }
   };
  


   const includeImage = (imageurl, category,image) => {
      // Create an image element
       const img = document.createElement('img');
       img.src = imageurl; // Set the src attribute to the image URL
       
      
       if (category == "Top"){
           img.id = "clothing-pics-top"
           img.setAttribute('uniqueid', image.id)
           // Get the "displayedtops" div
           const displayedTopsDiv = document.getElementById('displayedtops');
           // Append the image to the "displayedtops" div
           displayedTopsDiv.appendChild(img);
           setShowTopPlaceholder(false)
       }
       //don't forget to do the same thing for the other categories
       else if (category == "Bottom"){
           img.id = "clothing-pics-bottom"
           img.setAttribute('uniqueid', image.id)
           const displayedBottomsDiv = document.getElementById('displayedbottoms');
           displayedBottomsDiv.appendChild(img);
       }
       else if (category == "Accessories"){
           img.id = "clothing-pics-accessories"
           img.setAttribute('uniqueid', image.id)
           const displayedAccessoriesDiv = document.getElementById('displayedaccessories');
           displayedAccessoriesDiv.appendChild(img);
       }
       else if (category == "Shoes"){
           img.id = "clothing-pics-shoes"
           img.setAttribute('uniqueid', image.id)
           const displayedShoesDiv = document.getElementById('displayedshoes');
           displayedShoesDiv.appendChild(img);
       }
       else if (category == "Outerwear"){
        img.id = "clothing-pics-outerwear"
        img.setAttribute('uniqueid', image.id)
        const displayedOuterwearDiv = document.getElementById('displayedouterwear');
        displayedOuterwearDiv.appendChild(img);
        }
        else if (category == "Dresses"){
            img.id = "clothing-pics-dresses"
            img.setAttribute('uniqueid', image.id)
            const displayedDressesDiv = document.getElementById('displayeddresses');
            displayedDressesDiv.appendChild(img);
        }
        else if (category == "Hats"){
            img.id = "clothing-pics-hats"
            img.setAttribute('uniqueid', image.id)
            const displayedHatsDiv = document.getElementById('displayedhats');
            displayedHatsDiv.appendChild(img);
        }
        else if (category == "Bags"){
            img.id = "clothing-pics-bags"
            img.setAttribute('uniqueid', image.id)
            const displayedBagsDiv = document.getElementById('displayedbags');
            displayedBagsDiv.appendChild(img);
        }
   }


 
  
   const displayOptions = (category) => {
   // Retrieve items from local storage and parse into an array
   const storedImages = JSON.parse(localStorage.getItem('loadeditems')) ?? [];
   //const storedImages = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15]
   // Create an array to hold the div elements for each image
   console.log("checking")
   console.log(storedImages)
   const filteredImages = storedImages.filter(image => image.type == category)
   const imageDivs = filteredImages.map((image, index) => (
       <div key={index} className="image-container">
           <img src={image.imageurl} className='displaymode' alt={`Item ${index + 1}`} />
           <button onClick={() => [removePlaceholder(category), includeImage(image.imageurl, category, image)]}>Add Image</button>
       </div>
   ));


   // Return the array of image divs to be rendered in the modal content
   return imageDivs;
   }
  
   
    
       
   








   //useEffect(() => {
   //    function show() {
   //        document.getElementById("navbar").classList.toggle("active");
   //    }  
   //    document.getElementById("activator").addEventListener("click", show);
   //    return () => {
   //        document.getElementById("activator").removeEventListener("click", show);
    //   }
   //}, []);
  


   return (

   <body id = "fullbody">
           <Header />
           <div id = "createoutfitnav">


               <div id = "otherlinks">
                   
               </div>
           </div>
           <hr></hr>
           <div id = "mainbody">
               <div id = "top-page-title-and-info"><div id = "page-title"><Text fontSize='4xl'> Create Outfit</Text></div><button id="info">&#9432;</button></div>
               <hr></hr>
               {showTopModal && <div className = "modal-overlay" ><div className = "modal-background" ><div className = "modal-content"><Text fontSize='3xl'>Your Tops</Text>{displayOptions("Top")}<Button className ='closemodal' colorScheme='blue' mr={3} onClick={toggleTopModal}>Close</Button></div></div></div> }
               {showBottomModal && <div className = "modal-overlay" ><div className = "modal-background" ><div className = "modal-content"><Text fontSize='3xl'>Your Bottoms</Text>{displayOptions("Bottom")}<Button className ='closemodal' colorScheme='blue' mr={3} onClick={toggleBottomModal}>Close</Button></div></div></div> }
               {showAccessoriesModal && <div className = "modal-overlay" ><div className = "modal-background" ><div className = "modal-content"><Text fontSize='3xl'>Your Accessories</Text>{displayOptions("Accessories")}<Button className ='closemodal' colorScheme='blue' mr={3} onClick={toggleAccessoriesModal}>Close</Button></div></div></div> }
               {showShoesModal && <div className = "modal-overlay" ><div className = "modal-background" ><div className = "modal-content"><Text fontSize='3xl'>Your Shoes</Text>{displayOptions("Shoes")}<Button className ='closemodal' colorScheme='blue' mr={3} onClick={toggleShoesModal}>Close</Button></div></div></div> }
               {showDressModal && <div className = "modal-overlay" ><div className = "modal-background" ><div className = "modal-content"><Text fontSize='3xl'>Your Dresses</Text>{displayOptions("Dresses")}<Button className ='closemodal' colorScheme='blue' mr={3} onClick={toggleDressModal}>Close</Button></div></div></div> }
               {showOuterwearModal && <div className = "modal-overlay" ><div className = "modal-background" ><div className = "modal-content"><Text fontSize='3xl'>Your Outerwear</Text>{displayOptions("Outerwear")}<Button className ='closemodal' colorScheme='blue' mr={3} onClick={toggleOuterwearModal}>Close</Button></div></div></div> }
               {showHatModal && <div className = "modal-overlay" ><div className = "modal-background" ><div className = "modal-content"><Text fontSize='3xl'>Your Hats</Text>{displayOptions("Hats")}<Button className ='closemodal' colorScheme='blue' mr={3} onClick={toggleHatModal}>Close</Button></div></div></div> }
               {showBagModal && <div className = "modal-overlay" ><div className = "modal-background" ><div className = "modal-content"><Text fontSize='3xl'>Your Bags</Text>{displayOptions("Bags")}<Button className ='closemodal' colorScheme='blue' mr={3} onClick={toggleBagModal}>Close</Button></div></div></div> }
               <div id = "rest-of-page" >
                   <div id = "left-side">
                       <div id = "tops"><h2>Tops</h2><div id = "url-label-and-box"><p>&nbsp; <button onClick = {toggleTopModal} className="browse-images"><b>+ Browse Closet</b></button></p><button id = 'trash'/></div><p><i>Your tops should appear here</i></p><div id = "displayedtops"></div>{showTopPlaceholder && <p id = "placeholder-tops">&nbsp;&nbsp;&nbsp;&#128084;&nbsp;&nbsp;&#128090;&nbsp;&nbsp;&#129466;</p>}</div>
                      
                       <div id = "bottoms"><h2>Bottoms</h2><p>&nbsp; <button onClick = {toggleBottomModal}className="browse-images"><b>+ Browse Closet</b></button></p><div id = "url-label-and-box"></div><p><i>Your bottoms should appear here</i></p><div id = "displayedbottoms"></div>{showBottomPlaceholder && <p id = "placeholder-bottoms">&nbsp;&nbsp;&nbsp;&#128086;&nbsp;&nbsp;&#128087;</p>}</div>
                       <div id = "dresses"><h2>Dresses</h2><p>&nbsp; <button onClick = {toggleDressModal}className="browse-images"><b>+ Browse Closet</b></button></p><div id = "url-label-and-box"></div><p><i>Your dresses should appear here</i></p><div id = "displayeddresses"></div>{showDressPlaceholder && <p id = "placeholder-dresses">&nbsp;&nbsp;&nbsp;&#128086;&nbsp;&nbsp;&#128087;</p>}</div>
                       <div id = "outerwear"><h2>Outwear</h2><p>&nbsp; <button onClick = {toggleOuterwearModal}className="browse-images"><b>+ Browse Closet</b></button></p><div id = "url-label-and-box"></div><p><i>Your outerwear should appear here</i></p><div id = "displayedhats"></div>{showOuterwearPlaceholder && <p id = "placeholder-outerwear">&nbsp;&nbsp;&nbsp;&#128086;&nbsp;&nbsp;&#128087;</p>}</div>
                   </div>
                  
                   <div id = "right-side">
                       <div id = "accessories"><h2>Accessories</h2><div id = "url-label-and-box"><p>&nbsp; <button onClick = {toggleAccessoriesModal} className="browse-images"><b>+ Browse Closet</b></button></p></div><p><i>Your accessories should appear here</i></p><div id = "displayedaccessories"></div>{showAccessoriesPlaceholder && <p id = "placeholder-accessories">&nbsp;&nbsp;&nbsp;&#128083;&nbsp;&nbsp;&#129506;&nbsp;&nbsp;&#128092;</p>}</div>
                       <div id = "shoes"><h2>Shoes</h2><div id = "url-label-and-box"><p>&nbsp; <button onClick = {toggleShoesModal} className="browse-images"><b>+ Browse Closet</b></button></p></div><p><i>Your shoes should appear here</i></p><div id = "displayedshoes"></div>{showShoesPlaceholder && <p id = "placeholder-shoes">&nbsp;&nbsp;&nbsp;&#128094;&nbsp;&nbsp;&#128096;&nbsp;&nbsp;&#129406;</p>}</div>
                       <div id = "hats"><h2>Hats</h2><p>&nbsp; <button onClick = {toggleHatModal}className="browse-images"><b>+ Browse Closet</b></button></p><div id = "url-label-and-box"></div><p><i>Your hats should appear here</i></p><div id = "displayedhats"></div>{showHatPlaceholder && <p id = "placeholder-hats">&nbsp;&nbsp;&nbsp;&#128086;&nbsp;&nbsp;&#128087;</p>}</div>
                       <div id = "bags"><h2>Bags</h2><p>&nbsp; <button onClick = {toggleBagModal}className="browse-images"><b>+ Browse Closet</b></button></p><div id = "url-label-and-box"></div><p><i>Your bags should appear here</i></p><div id = "displayedbags"></div>{showBagPlaceholder && <p id = "placeholder-bags">&nbsp;&nbsp;&nbsp;&#128086;&nbsp;&nbsp;&#128087;</p>}</div>
                   </div>
               </div>
               <hr></hr>
               <div id = "page-bottom">
                   <button onClick={() => setsaveOutfitClicked(true)}   id = "saveoutfit">Save Outfit</button>
               </div>
              
              
           </div>


       </body>




   )
}


export default CreateOutfit;










