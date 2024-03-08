import React from "react";
import logo from "./images/logo.gif";
import Navigation from "./Navigation";


function Header(){

    return (
        <header>
        <div className = "header_container">
            
            <div className = "title_container">

                <img src = {logo} alt = "DC" className = "logo"></img>
                <h1>Dream Closet</h1>

            </div>
            <div className = "navbar_container">
                <img className ="activator" 
                        id="activator" 
                        src="//s.svgbox.net/hero-outline.svg?fill=fff#menu-alt-1" 
                        alt="" 
                ></img>
                <div className = "navbar" id="navbar"><Navigation/></div>
                
            </div>
            
        </div>
    </header>
    )
}

export default Header