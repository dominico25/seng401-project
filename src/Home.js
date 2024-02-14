import { useState } from "react";
import React from "react";
import Navigation from './Navigation';
import logo from './images/logo.gif';



function show() {
    document.getElementById("navbar").classList.toggle("active");
}

function Home() {
    return (
        <header>
            
            <div class = "header_container">
                
                <div class = "title_container">

                    <img src = {logo} alt = "DC" class = "logo"></img>
                    <h1>Dream Closet</h1>

                </div>
                <div class = "navbar_container">
                    <img class="activator" id="activator" src="//s.svgbox.net/hero-outline.svg?fill=fff#menu-alt-1" alt="" onClick="show()"></img>
                    <div class = "navbar"><Navigation/></div>
                    
                </div>
                
            </div>
        
        </header>
    )
}

export default Home;