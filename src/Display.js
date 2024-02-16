import React from "react";
import Navigation from './Navigation';

// Mapping object for option values to text values
const colourOptions = {
    "colour1": "Red",
    "colour2": "Orange",
    "colour3": "Yellow",
    "colour4": "Green",
    "colour5": "Blue",
    "colour6": "Purple",
    "colour7": "Pink",
    "colour8": "Random"
};

const seasonOptions = {
    "season1": "Fall",
    "season2": "Winter",
    "season3": "Spring",
    "season4": "Summer",
    "season5": "Random"
};

function Display({ formValues }) {
    // Retrieve text values from mapping objects based on form values
    const selectedColour = colourOptions[formValues['colour-choice']];
    const selectedSeason = seasonOptions[formValues['season-choice']];

    return (
        <div>
            <header>
                <Navigation/>
            </header>
            <body>
                <p>Colour: {selectedColour}</p>
                <p>Season: {selectedSeason}</p>
            </body>
        </div>
    )
}

export default Display;
