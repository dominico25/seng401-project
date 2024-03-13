import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './home.css';
import Header from "./Header";
import { googleLogout } from '@react-oauth/google'; // Import googleLogout

function Home(){
    const navigate = useNavigate(); // Get the navigate function

    // Define a logout function
    const logout = () => {
        googleLogout(); // Logout using googleLogout
        navigate('/'); // Navigate back to the '/Main' page
    };

    return (
        <div>
            <Header />
            <h1>Home</h1>
            <button onClick={logout}>Logout</button> {/* Logout button */}
        </div>
    )
}

export default Home;
