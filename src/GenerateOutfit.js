import { useState } from "react";
import React from "react";
import Navigation from './Navigation';
import Display from './Display';

function GenerateOutfit() {
    const [displayScreen, setDisplayScreen] = useState(false);
    const [formValues, setFormValues] = useState({}); // State to store form values
    
    function handleForm(event) {
        event.preventDefault(); // Prevent default form submission behavior
        const formData = new FormData(event.target); // Get form data
        const values = Object.fromEntries(formData.entries()); // Convert form data to object
        setFormValues(values); // Set form values in state
        console.log("Form Values:", values); // Log the form values to the console
        setDisplayScreen(true); // Set displayScreen to true to render Display component
    }

    return (
        <div>
            <header>
                <Navigation/>
            </header>
            {!displayScreen &&
                <form onSubmit={handleForm}>
                    <label htmlFor="colour-choice">Colour:</label>
                    <select id="colour-choice" name="colour-choice">
                        <option value="colour1">Red</option>
                        <option value="colour2">Orange</option>
                        <option value="colour3">Yellow</option>
                        <option value="colour4">Green</option>
                        <option value="colour5">Blue</option>
                        <option value="colour6">Purple</option>
                        <option value="colour7">Pink</option>
                        <option value="colour8">Random</option>
                    </select>
                    <br />
                    <label htmlFor="season-choice">Season:</label>
                    <select id="season-choice" name="season-choice">
                        <option value="season1">Fall</option>
                        <option value="season2">Winter</option>
                        <option value="season3">Spring</option>
                        <option value="season4">Summer</option>
                        <option value="season5">Random</option>
                    </select>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            }
            {displayScreen && <Display formValues={formValues} />} {/* Pass formValues to Display component */}
        </div>
    )
}

export default GenerateOutfit;
