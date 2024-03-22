import { useEffect } from "react";
import {Link} from 'react-router-dom';
import React from "react";
import './main.css';
import Header from "./Header";
import home_logo from "./images/homepage_logo.webp";

function Main() {
    return (
        <div className="container">
        <body className="main_page">
        <div className = "navbar">
            <a href="/"><img src = {home_logo} alt = "Dream Closet" className = "home_logo"></img></a>
            <ul>
                <li><a href="/Login">Login</a></li>
                <li><a href="/Login">Sign Up</a></li>
            </ul>
            </div>
            <div className="main_content">
                <div className="intro">
                        <h1>Build Your Virtual Closet</h1>
                        <p>Effortlessly organize, plan, and create outfits with Dream Closet.</p>
                        <Link to="/Login">Get Started</Link>
                </div>
                <div className="features">
                    <div className="feature_header">
                        <h2>Features</h2>
                    </div>
                    <div className="feature">
                        <h3>Upload Your Wardrobe</h3>
                        <p>Digitize your clothing items and accessories.</p>
                    </div>
                    <div className="feature">
                        <h3>Create Outfits</h3>
                        <p>Mix and match your items to create stylish outfits.</p>
                    </div>
                    <div className="feature">
                        <h3>Random Outfit Generator</h3>
                        <p>Get inspiration with a single click.</p>
                    </div>
                </div>
            </div>
        </body>
        <footer >
                <p>&copy; 2024 Dream Closet. All rights reserved.</p>
        </footer>
         </div>

    )
}

export default Main;