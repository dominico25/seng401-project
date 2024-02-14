import { useState } from "react";
import React from "react";
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import './create-outfit.css';

function CreateOutfit() {
    return (

        <body id = "fullbody">
            <div id = "createoutfitnav">

                <div id = "otherlinks">
                    <p>
                        <Link to="/">Home</Link>
                    </p>
                    <p>
                        <Link to="/Login">Login</Link>
                    </p>
                    <p>
                        <Link to="/UploadItem">UploadItem</Link>
                    </p>
                    <p>
                        <Link to="/CreateOutfit">CreateOutfit</Link>
                    </p>
                    <p>
                        <Link to="/BrowseItem">BrowseItem</Link>
                    </p>
                   <p>
                        <Link to="/BrowseOutfit">BrowseOutfit</Link>
                    </p>
                    <p>
                        <Link to="/GenerateOutfit">GenerateOutfit</Link>
                    </p>
                </div>
            </div>
            <hr></hr>
            <div id = "mainbody">
                <div id = "top-page-title-and-info"><div id = "page-title"><h1>Create Outfit</h1></div><button id="info">&#9432;</button></div>
                <hr></hr>
                <div id = "rest-of-page">
                    <div id = "left-side">
                        <div id = "tops"><h2>Tops</h2><div id = "url-label-and-box"><label for="image-url">Image-URL:</label><input type="text" id="image-url" name="fname" value="Enter Image URL here..."/><p>&nbsp;or <button id="browse-images"><b>+ Browse Photos</b></button></p></div><p><i>Your tops should appear here</i></p><p id = "placeholder-tops">&nbsp;&nbsp;&nbsp;&#128084;&nbsp;&nbsp;&#128090;&nbsp;&nbsp;&#129466;</p></div>
                        <div id = "bottoms"><h2>Bottoms</h2><div id = "url-label-and-box"><label for="image-url">Image-URL:</label><input type="text" id="image-url" name="fname" value="Enter Image URL here..."/><p>&nbsp;or <button id="browse-images"><b>+ Browse Photos</b></button></p></div><p><i>Your bottoms should appear here</i></p><p id = "placeholder-tops">&nbsp;&nbsp;&nbsp;&#128086;&nbsp;&nbsp;&#128087;&nbsp;&nbsp;&#128089;</p></div>
                    </div>
                    <div id = "vl"></div>
                    <div id = "right-side">
                        <div id = "accessories"><h2>Accessories</h2><div id = "url-label-and-box"><label for="image-url">Image-URL:</label><input type="text" id="image-url" name="fname" value="Enter Image URL here..."/><p>&nbsp;or <button id="browse-images"><b>+ Browse Photos</b></button></p></div><p><i>Your accessories should appear here</i></p><p id = "placeholder-tops">&nbsp;&nbsp;&nbsp;&#128083;&nbsp;&nbsp;&#129506;&nbsp;&nbsp;&#128092;</p></div>
                        <div id = "shoes"><h2>Tops</h2><div id = "url-label-and-box"><label for="image-url">Image-URL:</label><input type="text" id="image-url" name="fname" value="Enter Image URL here..."/><p>&nbsp;or <button id="browse-images"><b>+ Browse Photos</b></button></p></div><p><i>Your shoes should appear here</i></p><p id = "placeholder-tops">&nbsp;&nbsp;&nbsp;&#128094;&nbsp;&nbsp;&#128096;&nbsp;&nbsp;&#129406;</p></div>
                    </div>
                </div>
                <hr></hr>
                <div id = "page-bottom"></div>
                
            </div>

        </body>


    )
}

export default CreateOutfit;
