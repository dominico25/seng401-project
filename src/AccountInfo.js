import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Button, Heading, Text, Box, Avatar, Container } from "@chakra-ui/react";
import Header from './Header';
import { AccountContext, useAccount } from "./AccountContext";

function AccountInfo() {
  const [accountDetails, setAccountDetails] = useState(null);
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { account } = useAccount();
  const { setAccount } = useContext(AccountContext);

  useEffect(() => {
    // Fetch account details when the component mounts
    fetchAccountDetails();
  }, []);

  window.addEventListener('load', async function() {
    console.log("YOOOO", localStorage.getItem('account'))
    setAccount(localStorage.getItem('account'));
    setTimeout(() => {
      fetchAccountDetails();
    }, 1500);
    
  });

  const fetchAccountDetails = async () => {
    try {
      // const userEmail = "rjugdev@gmail.com"; // Set the email for fetching account details
      // lambda: lambda_load_acc_url
      const response = await fetch(`https://wb46rpkj5jkucexc7uykscr5jy0ltgti.lambda-url.ca-central-1.on.aws/?email=${account}`);
      const data = await response.json();
      if (response.ok) {
        setAccountDetails(data);
      } else {
        console.error("Failed to fetch account details:", data.message);
      }
    } catch (error) {
      console.error("Error fetching account details:", error);
    }
  };

  const handleSave = () => {
    // You can perform actions with the selected file here, like uploading it or saving it.
    // For demonstration, let's just log the file name.
    console.log('Selected File:', selectedFile);
    handleEdit("profile_picture", selectedFile)

    // Close the popup
    setShowPopup(false);
        // Fetch updated account details
    fetchAccountDetails();
  };

  const handleEdit = async (field, newValue) => {
    try {
      const formData = new FormData();
      formData.append("email", account);
      formData.append("edited_field", field);
      formData.append("new_value", newValue);
      // lambda: lambda_edit_account_url
      const response = await fetch('https://qqaqgqh2e3h3ew3hcx4mdw5cgi0ftikf.lambda-url.ca-central-1.on.aws/', {
        method: 'POST',
    
        body: formData, // Pass FormData directly as the body
      });

      if (response.ok) {
        console.log(`Successfully updated ${field}`);
        fetchAccountDetails();
        // Optionally, you can update the state or display a success message
      } else {
        const data = await response.json();
        console.error(`Failed to update ${field}:`, data.message);
        // Optionally, you can display an error message to the user
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      // Optionally, you can handle the error gracefully
    }
  };

  const onFileChange = (e) => {
    console.log(e.target.files);
    setSelectedFile(e.target.files[0])
    setFileName(e.target.files[0].name);
  };

  const handleEditName = () => {
    // Implement edit name functionality
    const newName = prompt("Enter an updated name:");
    if (newName) {
      handleEdit("name", newName);
    }
  };

  const handleEditBio = () => {
    // Implement edit bio functionality
    const newBio = prompt("Enter your new bio:");
    if (newBio) {
      handleEdit("bio", newBio);
    }
  };

  const handleEditPhoto = () => {
    setShowPopup(true);
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <>
      <Header />
      <Flex direction="column" align="center">
        <Heading mt={4}>Account Details</Heading>
        {accountDetails && (
          <Box mt={4} p={4} borderWidth="1px" borderRadius="md">
            <Avatar size="2xl" name={accountDetails.name} src={accountDetails.profile_picture} mb={4} />
            <Text mt={2}>Name: {accountDetails.name}</Text>
            <Text>Email: {accountDetails.email}</Text>
            <Text mt={2}>Bio:</Text>
            <Box p={4} borderWidth="1px" borderRadius="md" mt={2}>
              {accountDetails.bio}
            </Box>
            <Button mt={4} onClick={handleEditName}>Edit Name</Button>
            <Button mt={2} onClick={handleEditBio}>Edit Bio</Button>
            <Flex direction="column" align="center" mt={4}>
              {/* <label htmlFor="file-input"> */}
              <Button as="span" className="custom-file-upload" onClick={handleEditPhoto}>
                Edit Photo
              </Button>
              {/* Popup */}
            </Flex>
          </Box>
        )}
      </Flex>
      <Button mt={4} onClick={handleGoBack}>Back</Button> {/* Add back button */}
      {showPopup && (
        <Container p={4} boxShadow="lg" bg="white" borderRadius="md">
          <input
            id="file-input-popup"
            type="file"
            required
            accept="images/*"
            onChange={onFileChange}
          />
          {selectedFile && <Text mt={2}>({selectedFile.name})</Text>}
          <Button mt={2} onClick={handleSave}>Save</Button>
        </Container>
      )}

    </>
    
  );
}

export default AccountInfo;
