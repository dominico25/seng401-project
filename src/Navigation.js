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
                    <Link to="/CreateOutfit">CreateOutfit</Link>
                </li>
                <li>
                    <Link to="/BrowseItem">BrowseItem</Link>
                </li>
                <li>
                    <Link to="/BrowseOutfit">BrowseOutfit</Link>
                </li>
                <li>
                    <Link to="/GenerateOutfit">GenerateOutfit</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;