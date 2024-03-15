import React from "react";
import './home.css';
import Header from "./Header";

function Home(){
    const navigate = useNavigate(); // Get the navigate function

    // Define a logout function
    const logout = () => {
        googleLogout(); // Logout using googleLogout
        console.log("Logged out")
        navigate('/'); // Navigate back to the '/Main' page
    };
    return (
        <div>
            <Header/>
            <h1>Home</h1>
            <button onClick={logout}>Logout</button> {/* Logout button */}
        </div>
    )
}

export default Home;