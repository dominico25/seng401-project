import React from "react";
import { useEffect, useState } from "react";
import logo from "./images/logo.gif";
import Navigation from "./Navigation";


function Header(){

    const [isNavbarActive, setNavbarActive] = useState(false);
    const toggleNavbar = () => {
        setNavbarActive(!isNavbarActive);
    }

    /*useEffect(() => {
        function show() {
            const navbar = document.getElementById("navbar");
            if (navbar){
                navbar.classList.toggle("active");
            }

        }   
        document.getElementById("activator").addEventListener("click", show);

        return () => {
            document.getElementById("activator").removeEventListener("click", show);
        }
    }, []);*/

    return (
        <header>
        <div className = "header_container">
            
            <div className = "title_container">
                <img src = {logo} alt = "DC" className = "logo"></img>
                <h1 className="web_title">Dream Closet</h1>

            </div>
            <div className = "navbar_container">
                <img className ="activator" 
                        id="activator" 
                        src="//s.svgbox.net/hero-outline.svg?fill=fff#menu-alt-1" 
                        alt="" 
                        onClick = {toggleNavbar}
                ></img>
                <div className = {`navbar ${isNavbarActive ? 'active' : ''}`} id="navbar"><Navigation/></div>

            </div>
            
        </div>
    </header>
    )
}

export default Header