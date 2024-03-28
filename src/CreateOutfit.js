
import { useState, useRef, useContext } from "react";
import React from "react";
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import './create-outfit.css';
import Header from "./Header";
import { useEffect } from 'react';
import { useAccount, AccountContext } from './AccountContext';
import { Text, useDisclosure, Button, Input, Alert, AlertIcon } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';



function CreateOutfit() {
    let { account } = useAccount();
    const { setAccount } = useContext(AccountContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [outfitName, setOutfitName] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [showOutfitSaved, setShowOutfitSaved] = useState(false);
    const [showEmptyNotification, setShowEmptyNotification] = useState(false);

    window.addEventListener('load', async function() {
        console.log("YOOOO", localStorage.getItem('account'))
        // setTimeout(() => {
        // setAccount(localStorage.getItem('account'));
        setAccount(localStorage.getItem('account'));
        account = localStorage.getItem('account');
        console.log("Account", localStorage.getItem('account'));


    });
    
    // Function to get the attribute value or return null if the element is null
    const getAttributeValueOrNull = (element, attribute) => {
        return element ? element.getAttribute(attribute) : null;
    };


    useEffect(() => {loadItemsFromRemote()},[])
    const [saveOutfitClicked, setsaveOutfitClicked] = useState(false);
    //saveoutfit useEffect
    useEffect(() => {
        if (saveOutfitClicked) {
            const topImage = document.getElementById('clothing-pics-top');
            const bottomImage = document.getElementById('clothing-pics-bottom');
            const accessoriesImage = document.getElementById('clothing-pics-accessories');
            const shoesImage = document.getElementById('clothing-pics-shoes');
            const hatsImage = document.getElementById('clothing-pics-hats');
            const outerwearImage = document.getElementById('clothing-pics-outerwear');
            const bagsImage = document.getElementById('clothing-pics-bags');
            const dressesImage = document.getElementById('clothing-pics-dresses');
    
            
            
            const top_id = getAttributeValueOrNull(topImage, 'uniqueid');
            const bottom_id = getAttributeValueOrNull(bottomImage, 'uniqueid')
            const dress_id = getAttributeValueOrNull(dressesImage, 'uniqueid')
            const outerwear_id = getAttributeValueOrNull(outerwearImage, 'uniqueid')
            const accessories_id = getAttributeValueOrNull(accessoriesImage, 'uniqueid')
            const shoes_id = getAttributeValueOrNull(shoesImage, 'uniqueid')
            const hat_id = getAttributeValueOrNull(hatsImage, 'uniqueid')
            const bag_id = getAttributeValueOrNull(bagsImage, 'uniqueid')

            
            
                const res = fetch(
                    `https://exdk4ckwk74mivlphg353dxgyu0uwbdx.lambda-url.ca-central-1.on.aws/`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            top_id: top_id,
                            bottom_id: bottom_id,
                            dress_id: dress_id,
                            outerwear_id: outerwear_id,
                            accessories_id: accessories_id,
                            shoes_id: shoes_id,
                            hat_id: hat_id,
                            bag_id: bag_id,
                            account_id: account,
                            name:outfitName
                        })
                    }
                );
                console.log(res.body);
                console.log('outfits have been saved')
            
            
            
        }
    }, [saveOutfitClicked]);
   

   

   // const testoutfit = {
   //      top_id: "001",
   //      bottom_id: '002',
   //      dress_id: '003',
   //      outerwear_id: '004',
   //      accessories_id : '005',
   //      shoes_id: '006',
   //      hat_id: '007',
   //      bag_id : '008',
   //      account_id: '1234'

   // }

   async function loadItemsFromRemote() {
    try {
        
        const response = await fetch(
            `https://hyrh533txgyf4hwpg2ye43h47i0urrym.lambda-url.ca-central-1.on.aws/?account_id=${account}`,
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

   const [showSaveOutfitModal, setShowSaveOutfitModal] = useState(false);
   const toggleSaveOutfitModal = () => {
       setShowSaveOutfitModal(!showSaveOutfitModal);
   };


  
   const [showTopPlaceholder, setShowTopPlaceholder] = useState(true);
   const [showBottomPlaceholder, setShowBottomPlaceholder] = useState(true);
   const [showAccessoriesPlaceholder, setShowAccessoriesPlaceholder] = useState(true);
   const [showShoesPlaceholder, setShowShoesPlaceholder] = useState(true);
   const [showHatPlaceholder, setShowHatPlaceholder] = useState(true);
   const [showOuterwearPlaceholder, setShowOuterwearPlaceholder] = useState(true);
   const [showBagPlaceholder, setShowBagPlaceholder] = useState(true);
   const [showDressPlaceholder, setShowDressPlaceholder] = useState(true);


   const[topHasOne, setTopHasOne] = useState(false);
   const[bottomHasOne, setBottomHasOne] = useState(false);
   const[accessoriesHasOne, setAccessoriesHasOne] = useState(false);
   const[shoesHasOne, setShoesHasOne] = useState(false);
   const[dressesHasOne, setDressesHasOne] = useState(false);
   const[hatsHasOne, setHatsHasOne] = useState(false);
   const[outerwearHasOne, setOuterwearHasOne] = useState(false);
   const[bagsHasOne, setBagsHasOne] = useState(false);



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
  
    function removePicture (category){
    const elementId = `clothing-pics-${category.toLowerCase()}`;
    const element = document.getElementById(elementId);
    if (element) {
        element.remove();
        setTopHasOne(false);
        console.log('item removed')
    } else {
        console.log(`Element with ID '${elementId}' not found.`);
   }
}


   function includeImage(imageurl, category,image){
      // Create an image element
       const img = document.createElement('img');
       img.src = imageurl; // Set the src attribute to the image URL
       
      
       if (category == "Top" && topHasOne===false){
           img.id = "clothing-pics-top"
           img.setAttribute('uniqueid', image.id)
           // Get the "displayedtops" div
           let displayedTopsDiv = document.getElementById('displayedtops');
           // Append the image to the "displayedtops" div
           displayedTopsDiv.appendChild(img);
           setShowTopPlaceholder(false)
            setTopHasOne(true)
           
       }
       //don't forget to do the same thing for the other categories
       else if (category == "Bottom" && !bottomHasOne){
           img.id = "clothing-pics-bottom"
           img.setAttribute('uniqueid', image.id)
           const displayedBottomsDiv = document.getElementById('displayedbottoms');
           displayedBottomsDiv.appendChild(img);
           setShowBottomPlaceholder(false)
           setBottomHasOne(true)
       }
       else if (category == "Accessory" && !accessoriesHasOne){
           img.id = "clothing-pics-accessories"
           img.setAttribute('uniqueid', image.id)
           const displayedAccessoriesDiv = document.getElementById('displayedaccessories');
           displayedAccessoriesDiv.appendChild(img);
           setShowAccessoriesPlaceholder(false)
           setAccessoriesHasOne(true)
       }
       else if (category == "Shoe" && !shoesHasOne){
           img.id = "clothing-pics-shoes"
           img.setAttribute('uniqueid', image.id)
           const displayedShoesDiv = document.getElementById('displayedshoes');
           displayedShoesDiv.appendChild(img);
           setShowShoesPlaceholder(false)
           setShoesHasOne(true)
       }
       else if (category == "Outerwear" && !outerwearHasOne){
        img.id = "clothing-pics-outerwear"
        img.setAttribute('uniqueid', image.id)
        const displayedOuterwearDiv = document.getElementById('displayedouterwear');
        displayedOuterwearDiv.appendChild(img);
        setShowOuterwearPlaceholder(false)
        setOuterwearHasOne(true)
        }
        else if (category == "Dress" && !dressesHasOne){
            img.id = "clothing-pics-dresses"
            img.setAttribute('uniqueid', image.id)
            const displayedDressesDiv = document.getElementById('displayeddresses');
            displayedDressesDiv.appendChild(img);
            setShowDressPlaceholder(false)
            setDressesHasOne(true)
        }
        else if (category == "Hat" && !hatsHasOne){
            img.id = "clothing-pics-hats"
            img.setAttribute('uniqueid', image.id)
            const displayedHatsDiv = document.getElementById('displayedhats');
            displayedHatsDiv.appendChild(img);
            setShowHatPlaceholder(false)
            setHatsHasOne(true)
        }
        else if (category == "Bag" && !bagsHasOne){
            img.id = "clothing-pics-bags"
            img.setAttribute('uniqueid', image.id)
            const displayedBagsDiv = document.getElementById('displayedbags');
            displayedBagsDiv.appendChild(img);
            setShowBagPlaceholder(false)
           setBagsHasOne(true)
        }
   }



 
  
   function displayOptions (category){
   // Retrieve items from local storage and parse into an array
   const storedImages = JSON.parse(localStorage.getItem('loadeditems')) ?? [];
   //const storedImages = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15]
   // Create an array to hold the div elements for each image
   console.log("checking")
   console.log(storedImages)
   const filteredImages = storedImages.filter(image => image.type == category)
   const imageDivs = filteredImages.map((image, index) => (
       <div key={index} className="image-container">
           <img src={image.image_url} className='displaymode' alt={`Item ${index + 1}`} />
           <button className='add-images' onClick={() => [removePlaceholder(category),includeImage(image.image_url, category, image)]}><h1><b>+</b></h1></button>
       </div>
   ));


   // Return the array of image divs to be rendered in the modal content
   return imageDivs;
   }
  
   
   const handleSaveOutfit = () => {
    if (outfitName.trim() === '') {
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
        return;
    }
    // First, set saveOutfitClicked to true
    setsaveOutfitClicked(true);
    // Then, toggle the save outfit modal
    toggleSaveOutfitModal();
    
        setShowOutfitSaved(true);
        setTimeout(() => {
        setShowOutfitSaved(false);
    }, 3000);
    

};

const handlefirstSaveClick = () => {
            const topImage = document.getElementById('clothing-pics-top');
            const bottomImage = document.getElementById('clothing-pics-bottom');
            const accessoriesImage = document.getElementById('clothing-pics-accessories');
            const shoesImage = document.getElementById('clothing-pics-shoes');
            const hatsImage = document.getElementById('clothing-pics-hats');
            const outerwearImage = document.getElementById('clothing-pics-outerwear');
            const bagsImage = document.getElementById('clothing-pics-bags');
            const dressesImage = document.getElementById('clothing-pics-dresses');
    
            
            
            const top_id = getAttributeValueOrNull(topImage, 'uniqueid');
            const bottom_id = getAttributeValueOrNull(bottomImage, 'uniqueid')
            const dress_id = getAttributeValueOrNull(dressesImage, 'uniqueid')
            const outerwear_id = getAttributeValueOrNull(outerwearImage, 'uniqueid')
            const accessories_id = getAttributeValueOrNull(accessoriesImage, 'uniqueid')
            const shoes_id = getAttributeValueOrNull(shoesImage, 'uniqueid')
            const hat_id = getAttributeValueOrNull(hatsImage, 'uniqueid')
            const bag_id = getAttributeValueOrNull(bagsImage, 'uniqueid')

    if(!top_id && !bottom_id && !dress_id && !outerwear_id && !accessories_id && !shoes_id && !hat_id && !bag_id){
        setShowEmptyNotification(true);
        setTimeout(() => {
            setShowEmptyNotification(false);
        }, 3000);
        // Reset saveOutfitClicked state
        setsaveOutfitClicked(false);
    }
    
    else{
        setShowSaveOutfitModal(true)

    }
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
               {showAccessoriesModal && <div className = "modal-overlay" ><div className = "modal-background" ><div className = "modal-content"><Text fontSize='3xl'>Your Accessories</Text>{displayOptions("Accessory")}<Button className ='closemodal' colorScheme='blue' mr={3} onClick={toggleAccessoriesModal}>Close</Button></div></div></div> }
               {showShoesModal && <div className = "modal-overlay" ><div className = "modal-background" ><div className = "modal-content"><Text fontSize='3xl'>Your Shoes</Text>{displayOptions("Shoe")}<Button className ='closemodal' colorScheme='blue' mr={3} onClick={toggleShoesModal}>Close</Button></div></div></div> }
               {showDressModal && <div className = "modal-overlay" ><div className = "modal-background" ><div className = "modal-content"><Text fontSize='3xl'>Your Dresses</Text>{displayOptions("Dress")}<Button className ='closemodal' colorScheme='blue' mr={3} onClick={toggleDressModal}>Close</Button></div></div></div> }
               {showOuterwearModal && <div className = "modal-overlay" ><div className = "modal-background" ><div className = "modal-content"><Text fontSize='3xl'>Your Outerwear</Text>{displayOptions("Outerwear")}<Button className ='closemodal' colorScheme='blue' mr={3} onClick={toggleOuterwearModal}>Close</Button></div></div></div> }
               {showHatModal && <div className = "modal-overlay" ><div className = "modal-background" ><div className = "modal-content"><Text fontSize='3xl'>Your Hats</Text>{displayOptions("Hat")}<Button className ='closemodal' colorScheme='blue' mr={3} onClick={toggleHatModal}>Close</Button></div></div></div> }
               {showBagModal && <div className = "modal-overlay" ><div className = "modal-background" ><div className = "modal-content"><Text fontSize='3xl'>Your Bags</Text>{displayOptions("Bag")}<Button className ='closemodal' colorScheme='blue' mr={3} onClick={toggleBagModal}>Close</Button></div></div></div> }
               {showSaveOutfitModal && <div className = "modal-overlay" ><div className = "modal-background" ><div className = "modal-content"><Text fontSize='3xl'>Save Your Outfit</Text><Input placeholder="Enter outfit name" value={outfitName} onChange={(e) => setOutfitName(e.target.value)}/><Button className ='closemodal' colorScheme='blue' mr={3} onClick={toggleSaveOutfitModal}>Close</Button><Button className='closemodal' colorScheme='blue' mr={3} onClick={() =>handleSaveOutfit()}>Save</Button></div>{showNotification && (<Alert status="warning" mt={4}><AlertIcon />Please input a name.</Alert>)}</div></div> }
               {showEmptyNotification && (<Alert status="warning" mt={4}><AlertIcon />Your outfit is empty</Alert>)}

               <div id = "rest-of-page" >
                   <div id = "left-side">
                       <div id = "tops"><Text fontSize = '3xl'>Tops</Text><div className = 'arrange'> <button onClick = {toggleTopModal}className="browse-images"><b>+Browse</b></button><button className ='clear' onClick={() => removePicture('top')}><b>Clear</b></button></div><p><i>Your tops should appear here</i></p><div id = "displayedtops"></div>{showTopPlaceholder && <p id = "placeholder-tops"></p>}</div>
                      
                       <div id = "bottoms"><Text fontSize = '3xl'>Bottoms</Text><div className = 'arrange'> <button onClick = {toggleBottomModal}className="browse-images"><b>+Browse</b></button><button className ='clear' onClick={() => removePicture('bottom')}><b>Clear</b></button></div><p><i>Your bottoms should appear here</i></p><div id = "displayedbottoms"></div>{showBottomPlaceholder && <p id = "placeholder-bottoms"></p>}</div>
                       <div id = "dresses"><Text fontSize = '3xl'>Dresses</Text><div className = 'arrange'> <button onClick = {toggleDressModal}className="browse-images"><b>+Browse</b></button><button className ='clear' onClick={() => removePicture('dresses')}><b>Clear</b></button></div><p><i>Your dresses should appear here</i></p><div id = "displayeddresses"></div>{showDressPlaceholder && <p id = "placeholder-dresses"></p>}</div>
                       <div id = "outerwear"><Text fontSize = '3xl'>Outerwear</Text><div className = 'arrange'> <button onClick = {toggleOuterwearModal}className="browse-images"><b>+Browse</b></button><button className ='clear' onClick={() => removePicture('outerwear')}><b>Clear</b></button></div><p><i>Your outerwear should appear here</i></p><div id = "displayedouterwear"></div>{showOuterwearPlaceholder && <p id = "placeholder-outerwear"></p>}</div>
                   </div>
                  
                   <div id = "right-side">
                       <div id = "accessories"><Text fontSize = '3xl'>Accessories</Text><div className = 'arrange'> <button onClick = {toggleAccessoriesModal}className="browse-images"><b>+Browse</b></button><button className ='clear' onClick={() => removePicture('accessories')}><b>Clear</b></button></div><p><i>Your accessories should appear here</i></p><div id = "displayedaccessories"></div>{showAccessoriesPlaceholder && <p id = "placeholder-accessories"></p>}</div>
                       <div id = "shoes"><Text fontSize = '3xl'>Shoes</Text><div className = 'arrange'> <button onClick = {toggleShoesModal}className="browse-images"><b>+Browse</b></button><button className ='clear' onClick={() => removePicture('shoes')}><b>Clear</b></button></div><p><i>Your shoes should appear here</i></p><div id = "displayedshoes"></div>{showShoesPlaceholder && <p id = "placeholder-shoes"></p>}</div>
                       <div id = "hats"><Text fontSize = '3xl'>Hats</Text> <div className = 'arrange'> <button onClick = {toggleHatModal}className="browse-images"><b>+Browse</b></button><button className ='clear' onClick={() => removePicture('hats')}><b>Clear</b></button></div><p><i>Your hats should appear here</i></p><div id = "displayedhats"></div>{showHatPlaceholder && <p id = "placeholder-hats"></p>}</div>
                       <div id = "bags"><Text fontSize = '3xl'>Bags</Text> <div className = 'arrange'> <button onClick = {toggleBagModal}className="browse-images"><b>+Browse</b></button><button className ='clear' onClick={() => removePicture('bags')}><b>Clear</b></button></div><p><i>Your bags should appear here</i></p><div id = "displayedbags"></div>{showBagPlaceholder && <p id = "placeholder-bags"></p>}</div>
                   </div>
               </div>
               <hr></hr>
               <div id = "page-bottom">
                   <button onClick={() => handlefirstSaveClick()}   id = "saveoutfit">Save Outfit</button>
               </div>
              
              
           </div>


       </body>




   )
}


export default CreateOutfit;










