import React, { useState, useEffect, useRef, useContext } from "react";
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
import Header from "./Header";
import { AccountContext, useAccount } from "./AccountContext";

function UploadItem() {
  const [uploadComplete, setUploadComplete] = useState(false);
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [colour, setColour] = useState(""); // Separate state for color
  const [style, setStyle] = useState(""); // Separate state for style
  const [type, setType] = useState(""); // Separate state for type
  const [classification, setClassification] = useState(""); // Separate state for classification
  const [missingFieldError, setMissingFieldError] = useState(false); // State to track missing field error
  const navigate = useNavigate();
  const { account } = useAccount();
  const { setAccount } = useContext(AccountContext);

  const onFileChange = (e) => {
    console.log(e.target.files);
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch(name) {
      case "colour":
        setColour(value);
        break;
      case "style":
        setStyle(value);
        break;
      case "type":
        setType(value);
        break;
      case "classification":
        setClassification(value);
        break;
      default:
        break;
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    // Check if any required field is empty
    if (!file || !colour || !style || !type || !classification) {
      setMissingFieldError(true);
      return;
    }

    // Reset missing field error state
    setMissingFieldError(false);
  
    // Convert the image file to base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      // Prepare data to send to the Lambda function
      try {
        // Prepare data to send to the Lambda function
        const formData = new FormData();
        formData.append("image", file);
        formData.append("colour", colour);
        formData.append("style", style);
        formData.append("type", type);
        formData.append("classification", classification)
        formData.append("account_id", account);

        // lambda: lambda_save_item_url
        const response = await fetch("https://woz7s32sqfjzgpdgevrni25x540dsfym.lambda-url.ca-central-1.on.aws/", {
            method: "POST",
            body: formData, // Pass FormData directly as the body
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
    navigate(-1);
  };

  return (
    <>
    <Header />
      <Container>
        {uploadComplete ? (
          <Flex direction="column" align="center" mt={8}>
            <Heading>Upload Complete</Heading>
            <Button mt={4} onClick={handleBack}>
              Back
            </Button>
          </Flex>
        ) : (
          <Flex direction="column" align="center" mt={8}>
            <Heading>Upload Your Item</Heading>
            {missingFieldError && (
              <Alert status="error" mt={4}>
                <AlertIcon />
                Please fill in all required fields.
              </Alert>
            )}
            <form onSubmit={handleUpload}>
              <Flex direction="column" align="center" mt={4}>
                <label htmlFor="file-input" className="custom-file-upload">
                  Select the Item to Upload
                </label>
                <input
                  id="file-input"
                  type="file"
                  required
                  accept="image/*"
                  onChange={(e) => onFileChange(e)}
                />
                {fileName && <Text mt={2}>({fileName})</Text>}
              </Flex>
              <Select
                mt={4}
                name="colour"
                value={colour}
                onChange={handleChange}
                placeholder="Select Colour"
              >
                <option value="Red">Red</option>
                <option value="Orange">Orange</option>
                <option value="Yellow">Yellow</option>
                <option value="Green">Green</option>
                <option value="Blue">Blue</option>
                <option value="Purple">Purple</option>
                <option value="Black">Black</option>
                <option value="Pink">Pink</option>
                <option value="Multicolour">Multicolour</option>
                <option value="White">White</option>
                <option value="Brown">Brown</option>
                <option value="Grey">Grey</option>

              </Select>
              <Select
                mt={4}
                name="style"
                value={style}
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
                value={type}
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
              <Select
                mt={4}
                name="classification"
                value={classification}
                onChange={handleChange}
                placeholder="Select Wishlist or Closet"
              >
                <option value="Wishlist">Wishlist</option>
                <option value="Closet">Closet</option>
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
    </>
  );
}

export default UploadItem;
