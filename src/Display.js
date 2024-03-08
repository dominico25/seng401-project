// NEW
import React from "react";
import { Button, Container, Image, Flex } from '@chakra-ui/react'

// Mapping object for option values to text values
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

function Display({ formValues, setDisplayScreen }) {
    // Retrieve text values from mapping objects based on form values
    const selectedColour = colourOptions[formValues.color];
    const selectedSeason = seasonOptions[formValues.season];

    function handleBackButton() {
        setDisplayScreen(false);
    }

    return (
        <div>
            <Container mb={4}>
                <Flex direction="column" alignItems="center" mt={4}>

                    <p>Colour: {selectedColour}</p>
                    <p>Season: {selectedSeason}</p>
                    <Image boxSize='200px' src='https://bit.ly/dan-abra' alt='Top' />
                    <Image boxSize='200px' src='https://bit.ly/dan-abra' alt='Bottom' />
                    <Image boxSize='200px' src='https://bit.ly/dan-abra' alt='Shoes' />
                </Flex>
            </Container>
            
            {/* <body>
                <p>Colour: {selectedColour}</p>
                <p>Season: {selectedSeason}</p>
                <Button
                    mt={4}
                    colorScheme='teal'
                    // onClick={handleBackButton}
                >
                    Back
                </Button>
            </body> */}
        </div>
    )
}

export default Display;

// OLD
// // export default Display;
// import React from "react";
// import Navigation from './Navigation';

// // Mapping object for option values to text values
// const colourOptions = {
//     "colour1": "Red",
//     "colour2": "Orange",
//     "colour3": "Yellow",
//     "colour4": "Green",
//     "colour5": "Blue",
//     "colour6": "Purple",
//     "colour7": "Pink",
//     "colour8": "Random"
// };

// const seasonOptions = {
//     "season1": "Fall",
//     "season2": "Winter",
//     "season3": "Spring",
//     "season4": "Summer",
//     "season5": "Random"
// };

// function Display({ formValues }) {
//     // Retrieve text values from mapping objects based on form values
//     const selectedColour = colourOptions[formValues['colour-choice']];
//     const selectedSeason = seasonOptions[formValues['season-choice']];

//     return (
//         <div>
//             <body>
//                 <p>Colour: {selectedColour}</p>
//                 <p>Season: {selectedSeason}</p>
//             </body>
//         </div>
//     )
// }

// export default Display;