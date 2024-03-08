import { useState } from "react";
import React from "react";
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import './create-outfit.css';
import Header from "./Header";
import { useEffect } from "react";




function CreateOutfit() {


   const image1 = {
       itemID: "1",
       imageurl: "https://www.highsnobiety.com/static-assets/thumbor/M29ZnHrOQ8wLvy3nD7HETr6Mc04=/fit-in/1200x1500/aaba6fc7dd05e6321705-d3c8e77fedf34b64ceac1fa28b6c145b.ssl.cf3.rackcdn.com/Carhartt_3380-mBojFUj_.jpg",
       color: "black",
       style: "workwear",
       category: "Top",
       type: "jacket",
       wishlistorcloset: "closet",
       accountid: "1234"
   }
   const image2 = {
       itemID: "2",
       imageurl: "https://www.bootbarn.com/dw/image/v2/BCCF_PRD/on/demandware.static/-/Sites-master-product-catalog-shp/default/dwf6af816d/images/666/2000213666_342_P1.JPG?sw=600&sh=600&sm=fit&q=50",
       color: "black",
       style: "workwear",
       category: "Bottom",
       type: "pants",
       wishlistorcloset: "closet",
       accountid: "1234"
   }
  const image3 = {
       itemID: "3",
       imageurl: "https://i.ebayimg.com/images/g/ko8AAOSwr2FjD8q8/s-l1600.jpg",
       color: "brown",
       style: "everyday",
       category: "Top",
       type: "shirt",
       wishlistorcloset: "closet",
       accountid: "1234"
  }
  const image4 = {
   itemID: "4",
   imageurl: "https://sweetexotics.ca/cdn/shop/files/Untitled-00_9e4d3bb9-40ad-47b4-b082-8de7c8444884.png?v=1701557518&width=2400",
   color: "black",
   style: "everyday",
   category: "Top",
   type: "shirt",
   wishlistorcloset: "closet",
   accountid: "1234"
   }
   const image5 = {
       itemID: "5",
       imageurl: "https://i.ebayimg.com/images/g/V~IAAOSwZRVkjekP/s-l1600.jpg",
       color: "white",
       style: "everyday",
       category: "Top",
       type: "shirt",
       wishlistorcloset: "closet",
       accountid: "1234"
   }
   const image6 = {
       itemID: "6",
       imageurl: "https://i.etsystatic.com/41902614/r/il/bd870b/4735445452/il_fullxfull.4735445452_mgbi.jpg",
       color: "green",
       style: "everyday",
       category: "Top",
       type: "shirt",
       wishlistorcloset: "closet",
       accountid: "1234"
   }
   const image7 = {
       itemID: "7",
       imageurl: "https://cdn-images.farfetch-contents.com/22/03/82/62/22038262_51960100_600.jpg",
       color: "grey",
       style: "everyday",
       category: "Bottom",
       type: "pants",
       wishlistorcloset: "closet",
       accountid: "1234"
   }
   const image8 = {
       itemID: "8",
       imageurl: "https://cdn-images.farfetch-contents.com/20/11/37/19/20113719_50040298_300.jpg",
       color: "brown",
       style: "everyday",
       category: "Bottom",
       type: "pants",
       wishlistorcloset: "closet",
       accountid: "1234"
   }
   const image9 = {
       itemID: "9",
       imageurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSxVwYq0epcI9c3dXEuO96TXvZ_LWnZF6Pyw&usqp=CAU",
       color: "black",
       style: "everyday",
       category: "Bottom",
       type: "pants",
       wishlistorcloset: "closet",
       accountid: "1234"
   }
   const image10 = {
       itemID: "10",
       imageurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQabPSjKl_lOCS24gN7ycl2XTs5W_NTnhQxx8xbmeif1yn9XpISwFcfBZMT4k-Muaja4cY&usqp=CAU",
       color: "black",
       style: "everyday",
       category: "Shoes",
       type: "adidas",
       wishlistorcloset: "closet",
       accountid: "1234"
   }
   const image11 = {
       itemID: "11",
       imageurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGNRo0Use9oLEPCufA4bPGADJZWwj2SaQcePt-banuR8pBcnPXhU6_SXeF_oRbhbV_rWc&usqp=CAU",
       color: "white",
       style: "everyday",
       category: "Shoes",
       type: "adidas",
       wishlistorcloset: "closet",
       accountid: "1234"
   }
   const image12 = {
       itemID: "11",
       imageurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4l1sCR7H3Rw-YSx8yOfoGwFM5f4jExdIuevDiF9KbLYeb_xAiRA0sWhal0Q3TMQW6Nl8&usqp=CAU",
       color: "black",
       style: "everyday",
       category: "Shoes",
       type: "asics",
       wishlistorcloset: "closet",
       accountid: "1234"
   }
   const image13 = {
       itemID: "11",
       imageurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Xg_GK9hYJlAuCdIu5SZ5Z76ACziUJ1Ir9w&usqp=CAU",
       color: "black",
       style: "basketball",
       category: "Shoes",
       type: "jordan",
       wishlistorcloset: "closet",
       accountid: "1234"
   }
   const image14 = {
       itemID: "14",
       imageurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB6IgaRp2ryZ6q0CnlK3FD-SV9dGHveQSjgw&usqp=CAU",
       color: "black",
       style: "everyday",
       category: "Accessories",
       type: "silver",
       wishlistorcloset: "closet",
       accountid: "1234"
   }
   const image15 = {
       itemID: "15",
       imageurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQONjzCNn1caseRf4fBG6P6Sa7wamRIkvkOmA&usqp=CAU",
       color: "black",
       style: "everyday",
       category: "Accessories",
       type: "beanie",
       wishlistorcloset: "closet",
       accountid: "1234"
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
  
   const [showTopPlaceholder, setShowTopPlaceholder] = useState(true);
   const [showBottomPlaceholder, setShowBottomPlaceholder] = useState(true);
   const [showAccessoriesPlaceholder, setShowAccessoriesPlaceholder] = useState(true);
   const [showShoesPlaceholder, setShowShoesPlaceholder] = useState(true);
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
  


   const includeImage = (imageurl, category) => {
      // Create an image element
       const img = document.createElement('img');
       img.src = imageurl; // Set the src attribute to the image URL
      
       if (category == "Top"){
           img.className = "clothing-pics-top"
           // Get the "displayedtops" div
           const displayedTopsDiv = document.getElementById('displayedtops');
           // Append the image to the "displayedtops" div
           displayedTopsDiv.appendChild(img);
       }
       //don't forget to do the same thing for the other categories
       else if (category == "Bottom"){
           img.className = "clothing-pics-bottom"
           const displayedBottomsDiv = document.getElementById('displayedbottoms');
           displayedBottomsDiv.appendChild(img);
       }
       else if (category == "Accessories"){
           img.className = "clothing-pics-accessories"
           const displayedAccessoriesDiv = document.getElementById('displayedaccessories');
           displayedAccessoriesDiv.appendChild(img);
       }
       else if (category == "Shoes"){
           img.className = "clothing-pics-shoes"
           const displayedShoesDiv = document.getElementById('displayedshoes');
           displayedShoesDiv.appendChild(img);
       }
   }


 
  
   const displayOptions = (category) => {
   // Retrieve items from local storage and parse into an array
   //const storedImages = JSON.parse(localStorage.getItem('testimages')) ?? [];
   const storedImages = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15]
   // Create an array to hold the div elements for each image
   const filteredImages = storedImages.filter(image => image.category == category)
   const imageDivs = filteredImages.map((image, index) => (
       <div key={index} className="image-container">
           <img src={image.imageurl} className = "clothing-pics-top" alt={`Item ${index + 1}`} />
           <button onClick={() => [removePlaceholder(category), includeImage(image.imageurl, category)]}>Add Image</button>
       </div>
   ));


   // Return the array of image divs to be rendered in the modal content
   return imageDivs;
   }
  
   const [saveOutfitClicked, setsaveOutfitClicked] = useState(false);
   const saveOutfitClickedResult = () => {
       //add logic to maybe display a message indicating that the outfit has been saved.
       // could add other things as well
       //maybe add logic to display an overlay where the user can enter the category to which each item in the outfit belongs to


       setsaveOutfitClicked(true);
   }








   useEffect(() => {
       function show() {
           document.getElementById("navbar").classList.toggle("active");
       }  
       document.getElementById("activator").addEventListener("click", show);
       return () => {
           document.getElementById("activator").removeEventListener("click", show);
       }
   }, []);
  


   return (


     
      
         
      
       <body id = "fullbody">
           <Header />
           <div id = "createoutfitnav">


               <div id = "otherlinks">
                   <div className="directory">
                       <Link className = "navtext" to="/">Home</Link>
                   </div>
                   <div className="directory">
                       <Link className = "navtext" to="/Login">Login</Link>
                   </div>
                   <div className="directory">
                       <Link className = "navtext" to="/UploadItem">UploadItem</Link>
                   </div>
                   <div className="directory">
                       <Link className = "navtext" to="/CreateOutfit">CreateOutfit</Link>
                   </div>
                   <div className="directory">
                       <Link className = "navtext" to="/BrowseItem">BrowseItem</Link>
                   </div>
                   <div className="directory">
                       <Link className = "navtext" to="/BrowseOutfit">BrowseOutfit</Link>
                   </div>
                   <div className="directory">
                       <Link className = "navtext" to="/GenerateOutfit">GenerateOutfit</Link>
                   </div>
               </div>
           </div>
           <hr></hr>
           <div id = "mainbody">
               <div id = "top-page-title-and-info"><div id = "page-title"><h1>Create Outfit</h1></div><button id="info">&#9432;</button></div>
               <hr></hr>
               {showTopModal && <div className = "modal-overlay" ><div className = "modal-background" ><div className = "modal-content">{displayOptions("Top")}<button onClick={toggleTopModal}>Close</button></div></div></div> }
               {showBottomModal && <div className = "modal-overlay"><div className = "modal-background" ><div className = "modal-content">{displayOptions("Bottom")}<button onClick={toggleBottomModal}>Close</button></div></div></div> }
               {showAccessoriesModal && <div className = "modal-overlay"><div className = "modal-background" ><div className = "modal-content">{displayOptions("Accessories")}<button onClick={toggleAccessoriesModal}>Close</button></div></div></div> }
               {showShoesModal && <div className = "modal-overlay"><div className = "modal-background" ><div className = "modal-content">{displayOptions("Shoes")}<button onClick={toggleShoesModal}>Close</button></div></div></div> }
               <div id = "rest-of-page" >
                   <div id = "left-side">
                       <div id = "tops"><h2>Tops</h2><div id = "url-label-and-box"><p>&nbsp; <button onClick = {toggleTopModal} className="browse-images"><b>+ Browse Closet</b></button></p><button id = 'trash'/></div><p><i>Your tops should appear here</i></p><div id = "displayedtops"></div>{showTopPlaceholder && <p id = "placeholder-tops">&nbsp;&nbsp;&nbsp;&#128084;&nbsp;&nbsp;&#128090;&nbsp;&nbsp;&#129466;</p>}</div>
                      
                       <div id = "bottoms"><h2>Bottoms</h2><p>&nbsp; <button onClick = {toggleBottomModal}className="browse-images"><b>+ Browse Closet</b></button></p><div id = "url-label-and-box"></div><p><i>Your bottoms should appear here</i></p><div id = "displayedbottoms"></div>{showBottomPlaceholder && <p id = "placeholder-bottoms">&nbsp;&nbsp;&nbsp;&#128086;&nbsp;&nbsp;&#128087;</p>}</div>
                   </div>
                   <div id = "vl"></div>
                   <div id = "right-side">
                       <div id = "accessories"><h2>Accessories</h2><div id = "url-label-and-box"><p>&nbsp; <button onClick = {toggleAccessoriesModal} className="browse-images"><b>+ Browse Closet</b></button></p></div><p><i>Your accessories should appear here</i></p><div id = "displayedaccessories"></div>{showAccessoriesPlaceholder && <p id = "placeholder-accessories">&nbsp;&nbsp;&nbsp;&#128083;&nbsp;&nbsp;&#129506;&nbsp;&nbsp;&#128092;</p>}</div>
                       <div id = "shoes"><h2>Shoes</h2><div id = "url-label-and-box"><p>&nbsp; <button onClick = {toggleShoesModal} className="browse-images"><b>+ Browse Closet</b></button></p></div><p><i>Your shoes should appear here</i></p><div id = "displayedshoes"></div>{showShoesPlaceholder && <p id = "placeholder-shoes">&nbsp;&nbsp;&nbsp;&#128094;&nbsp;&nbsp;&#128096;&nbsp;&nbsp;&#129406;</p>}</div>
                   </div>
               </div>
               <hr></hr>
               <div id = "page-bottom">
                   <button onClick={() => setsaveOutfitClicked()} id = "saveoutfit">Save Outfit</button>
               </div>
              
           </div>


       </body>




   )
}


export default CreateOutfit;










