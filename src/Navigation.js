import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/Login">Login</Link>
                </li>
                <li>
                    <Link to="/UploadItem">UploadItem</Link>
                </li>
                <li>
                    <Link to="/CreateOutfit">Create Outfit</Link>
                </li>
                <li>
                    <Link to="/BrowseItem">Browse Item</Link>
                </li>
                <li>
                    <Link to="/BrowseOutfit">Browse Outfit</Link>
                </li>
                <li>
                    <Link to="/GenerateOutfit">Generate Outfit</Link>
                </li>
                <li>
                    <Link to="/AccountInfo">Account Info</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;