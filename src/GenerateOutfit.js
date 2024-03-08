import { useState } from "react";
import React from "react";
import Display from './Display';
import Header from "./Header";
import { Select, Button, Container, Alert, AlertIcon, Heading, Flex, Text } from '@chakra-ui/react'

const colourOptions = {
    "colour1": "Random",
    "colour2": "Red",
    "colour3": "Orange",
    "colour4": "Yellow",
    "colour5": "Green",
    "colour6": "Blue",
    "colour7": "Purple",
    "colour8": "Pink",
};

const seasonOptions = {
    "season1": "Random",
    "season2": "Fall",
    "season3": "Winter",
    "season4": "Spring",
    "season5": "Summer",
};

function GenerateOutfit() {
    const [displayScreen, setDisplayScreen] = useState(false);
    const [formValues, setFormValues] = useState({});
    const [isFormValid, setIsFormValid] = useState({ color: true, season: true });
    const [showNotification, setShowNotification] = useState(false);

    async function handleForm(event) {
        event.preventDefault();

        if (formValues.color === undefined || formValues.season === undefined) {
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false); // Hide notification after 3 seconds
            }, 3000); // 3000 milliseconds = 3 seconds
            return;
        }
    
        const formData = new FormData(event.target);
        const values = Object.fromEntries(formData.entries());
        setFormValues({
            color: values.color,
            season: values.season
        });
        console.log("Form Values:", values);
    
        try {
            setDisplayScreen(true);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    function handleSelectChange(event) {
        const { name, value } = event.target;
        setFormValues(prevState => ({ ...prevState, [name]: value }));
        if (value !== 'Select') {
            setIsFormValid(prevState => ({ ...prevState, [name]: true }));
        } else {
            setIsFormValid(prevState => ({ ...prevState, [name]: false }));
        }
    }

    return (
        <div>
            <Header />
            {!displayScreen &&
                <Container mb={4}>
                    <Flex direction="column" alignItems="center" mt={4}>
                        <Heading as='h3' size='lg' mb={4}>Generate an Outfit!</Heading>
                        <form onSubmit={handleForm}>
                            <Text size='sm'>Select a colour</Text>
                            <Select placeholder='Select Colour' name="color" onChange={handleSelectChange} mb={2}>
                                {Object.keys(colourOptions).map((key) => (
                                    <option key={key} value={key}>{colourOptions[key]}</option>
                                ))}
                            </Select>
                            <Text size='sm'>Select a season</Text>
                            <Select placeholder='Select Season' name="season" onChange={handleSelectChange}>
                                {Object.keys(seasonOptions).map((key) => (
                                    <option key={key} value={key}>{seasonOptions[key]}</option>
                                ))}
                            </Select>
                            <Button
                                mt={4}
                                colorScheme='teal'
                                type='submit'
                                disabled={!isFormValid.color || !isFormValid.season}
                            >
                                Submit
                            </Button>
                        </form>
                        {showNotification && (
                            <Alert status="warning" mt={4}>
                                <AlertIcon />
                                Please make selections for both color and season.
                            </Alert>
                        )}
                    </Flex>
                </Container >
            }
            {displayScreen && <Display formValues={formValues} setDisplayScreen={setDisplayScreen} />}
            <footer >
                <p>&copy; 2024 Dream Closet. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default GenerateOutfit;





// OLD
// import { useState } from "react";
// import React from "react";
// import Navigation from './Navigation';
// import Display from './Display';
// import Header from './Header';

// function GenerateOutfit() {
//     const [displayScreen, setDisplayScreen] = useState(false);
//     const [formValues, setFormValues] = useState({}); // State to store form values
    
//     function handleForm(event) {
//         event.preventDefault(); // Prevent default form submission behavior
//         const formData = new FormData(event.target); // Get form data
//         const values = Object.fromEntries(formData.entries()); // Convert form data to object
//         setFormValues(values); // Set form values in state
//         console.log("Form Values:", values); // Log the form values to the console
//         setDisplayScreen(true); // Set displayScreen to true to render Display component
//     }

//     return (
//         <div>
//             <Header/>
//             {!displayScreen &&
//                 <form onSubmit={handleForm}>
//                     <label htmlFor="colour-choice">Colour:</label>
//                     <select id="colour-choice" name="colour-choice">
//                         <option value="colour1">Red</option>
//                         <option value="colour2">Orange</option>
//                         <option value="colour3">Yellow</option>
//                         <option value="colour4">Green</option>
//                         <option value="colour5">Blue</option>
//                         <option value="colour6">Purple</option>
//                         <option value="colour7">Pink</option>
//                         <option value="colour8">Random</option>
//                     </select>
//                     <br />
//                     <label htmlFor="season-choice">Season:</label>
//                     <select id="season-choice" name="season-choice">
//                         <option value="season1">Fall</option>
//                         <option value="season2">Winter</option>
//                         <option value="season3">Spring</option>
//                         <option value="season4">Summer</option>
//                         <option value="season5">Random</option>
//                     </select>
//                     <br />
//                     <input type="submit" value="Submit" />
//                 </form>
//             }
//             {displayScreen && <Display formValues={formValues} />} {/* Pass formValues to Display component */}
//         </div>
//     )
// }

// export default GenerateOutfit;