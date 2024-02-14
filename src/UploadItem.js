import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from './Navigation';

function UploadItem() {
    const [uploadComplete, setUploadComplete] = useState(false);
    const [fileName, setFileName] = useState("");
    const [formData, setFormData] = useState({
        image: '',
        color: 'Red', // Default value for color
        style: 'Casual', // Default value for style
        type: 'Shirt', // Default value for type
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpload = () => {
        // ADD UPLOAD LOGIC
        // Once the upload is complete, setUploadComplete(true);
        setUploadComplete(true); // For demonstration purposes, setUploadComplete(true) immediately
    };

    const handleBack = () => {
        // Navigate back to the previous page
        navigate(-1);
    };


    return (
        <div>
            {/* <header>
                <Navigation />
            </header> */}
            {uploadComplete ? (
                <div>
                    <h1>Upload Complete</h1>
                    {/* Display any content you want after a successful upload */}
                    <button onClick={handleBack}>Back</button>
                </div>
            ) : (
                <div>
                    <h1>Upload Your Item</h1>
                    {/* Your upload item form or content goes here */}
                    <form onSubmit={handleUpload}>
                    <div className="file-input-box">
                        <label for="file-input" class="custom-file-upload">
                            Select the Item to Upload
                        </label>
                        <input
                            id="file-input"
                            type="file"
                            required
                            accepts="images/*"
                            
                        />
                        {fileName && <p id="file-name">({fileName})</p>}
                        </div>
                        <br />

                        <label>
                            Color:
                            <select name="color" value={formData.color} onChange={handleChange}>
                                <option value="Red">Red</option>
                                <option value="Orange">Orange</option>
                                <option value="Yellow">Yellow</option>
                                <option value="Green">Green</option>
                                <option value="Blue">Blue</option>
                                <option value="Purple">Purple</option>
                                <option value="Black">Black</option>
                                <option value="Pink">Pink</option>
                                <option value="Rainbow">Rainbow</option>
                            
                            </select>
                        </label>
                        <br />

                        <label>
                            Style:
                            <select name="style" value={formData.style} onChange={handleChange}>
                                <option value="Casual">Casual</option>
                                <option value="Formal">Formal</option>
                                <option value="Sporty">Sporty</option>
                                
                            </select>
                        </label>
                        <br />

                        <label>
                            Type:
                            <select name="type" value={formData.type} onChange={handleChange}>
                                <option value="Shirt">Shirt</option>
                                <option value="Pants">Pants</option>
                                <option value="Dress">Dress</option>
                                <option value="Skirt">Skirt</option>
                                <option value="Sweater">Sweater</option>
                                {/* Add more type options as needed */}
                            </select>
                        </label>
                        <br />

                        <button type="submit">Upload Item</button>
                    </form>

                    <button onClick={handleBack}>Back</button>
                </div>
            )}
        </div>
    );
}

export default UploadItem;
