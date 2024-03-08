
import { useEffect } from "react";
import {Link} from 'react-router-dom';
import React from "react";
import './main.css';
import Header from "./Header";


function Main() {
 
    
    return (
        <div className="container">
        <Header />
        <body className="main_page">
            <div className="main_container">
            <section className="intro">
                    <h2>Your Virtual Closet</h2>
                    <p>Effortlessly organize, plan, and create outfits with Dream Closet.</p>
                    <Link to="/Login">Get Started</Link>
                </section>
                <section className="features">
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
                </section>
            </div>
        </body>
        <footer >
                <p>&copy; 2024 Dream Closet. All rights reserved.</p>
        </footer>
         </div>

    )
}

export default Main;