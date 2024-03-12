import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from './Navigation';
import {
  Select,
  Button,
  Container,
  Alert,
  AlertIcon,
  Heading,
  Flex,
  Text,
} from '@chakra-ui/react';

function UploadItem() {
  const [uploadComplete, setUploadComplete] = useState(false);
  const [fileName, setFileName] = useState("");
  const [formData, setFormData] = useState({
    image: '',
    color: '', // Default value for color
    style: '', // Default value for style
    type: '', // Default value for type
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    // Convert the image file to base64
    const fileInput = document.getElementById("file-input");
    const file = fileInput.files[0];

    if (!file) {
      // Handle error when no file is selected
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      // Prepare data to send to the Lambda function
      const imageData = reader.result.split(",")[1];
      const requestData = {
        ...formData,
        image: imageData,
        account_id: "your_account_id", // Replace with the actual account ID
      };

      try {
        // Make an HTTP request to the API Gateway endpoint
        const response = await fetch("your_api_gateway_url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        const responseBody = await response.json();

        if (response.ok) {
          // Handle success
          console.log(responseBody);
          setUploadComplete(true);
        } else {
          // Handle error
          console.error(responseBody);
          // Optionally display an error message to the user
        }
      } catch (error) {
        console.error("Error during API request:", error);
        // Optionally display an error message to the user
      }
    };

    reader.readAsDataURL(file);
  };

  const handleBack = () => {
    // Navigate back to the previous page
    navigate(-1);
  };

  return (
    <Container>
      <Navigation />

      {uploadComplete ? (
        <Flex direction="column" align="center" mt={8}>
          <Heading>Upload Complete</Heading>
          {/* Display any content you want after a successful upload */}
          <Button mt={4} onClick={handleBack}>
            Back
          </Button>
        </Flex>
      ) : (
        <Flex direction="column" align="center" mt={8}>
          <Heading>Upload Your Item</Heading>
          {/* Your upload item form or content goes here */}
          <form onSubmit={handleUpload}>
            <Flex direction="column" align="center" mt={4}>
              <label htmlFor="file-input" className="custom-file-upload">
                Select the Item to Upload
              </label>
              <input
                id="file-input"
                type="file"
                required
                accept="images/*"
                onChange={(e) => setFileName(e.target.files[0].name)}
              />
              {fileName && <Text mt={2}>({fileName})</Text>}
            </Flex>
            <Select
              mt={4}
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Select Color"
            >
              <option value="Red">Red</option>
              <option value="Orange">Orange</option>
              <option value="Yellow">Yellow</option>
              <option value="Green">Green</option>
              <option value="Blue">Blue</option>
              <option value="Purple">Purple</option>
              <option value="Black">Black</option>
              <option value="Pink">Pink</option>
              <option value="Rainbow">Rainbow</option>
            </Select>
            <Select
              mt={4}
              name="style"
              value={formData.style}
              onChange={handleChange}
              placeholder="Select Style"
            >
              <option value="Casual">Casual</option>
              <option value="Formal">Formal</option>
              <option value="Sporty">Sporty</option>
            </Select>
            <Select
              mt={4}
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Select Type"
            >
              <option value="Top">Top</option>
              <option value="Bottom">Bottom</option>
              <option value="Dress">Dress</option>
              <option value="Outerwear">Outerwear</option>
              <option value="Accessory">Accessory</option>
              <option value="Shoes">Shoes</option>
              <option value="Hat">Hat</option>
              <option value="Bag">Bag</option>
            </Select>
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              onClick={handleUpload}
            >
              Upload Item
            </Button>
          </form>

          <Button mt={4} onClick={handleBack}>
            Back
          </Button>
        </Flex>
      )}
    </Container>
  );
}

export default UploadItem;
