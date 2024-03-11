import { useState } from "react";
import React from "react";
import Display from './Display';
import PreviewScreen from './PreviewScreen';
import Header from "./Header";
import { Select, Button, Container, Alert, AlertIcon, Heading, Flex, Text } from '@chakra-ui/react'


function GenerateOutfit() {
    const [previewScreen, setPreviewScreen] = useState(false);
    const [items, setItems] = useState([]);
    const [chosenTop, setChosenTop] = useState(null);
    const [chosenBottom, setChosenBottom] = useState(null);
    const [chosenDress, setChosenDress] = useState(null);
    const [chosenOuterwear, setChosenOuterwear] = useState(null);
    const [chosenAccessory, setChosenAccessory] = useState(null);
    const [chosenShoe, setChosenShoe] = useState(null);
    const [chosenHat, setChosenHat] = useState(null);
    const [chosenBag, setChosenBag] = useState(null);
    const loadItems = async () => {
        const res = await fetch(
            `https://tqeurpmxqzlzvdgtjj42swi57m0rswbr.lambda-url.ca-central-1.on.aws/`,
            {
                method: "GET",
            }
        );
        const data = await res.json();
        setItems(data);
    }
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

    const styleOptions = {
        "style1": "Random",
        "style2": "Casual",
        "style3": "Formal",
        "style4": "Athletic",
    };

    const previewOn = () => {
        setPreviewScreen(true);
      }
    
      const previewOff = () => {
        setPreviewScreen(false);
      }


    const [displayScreen, setDisplayScreen] = useState(false);
    const [formValues, setFormValues] = useState({});
    const [isFormValid, setIsFormValid] = useState({ color: true, style: true });
    const [showNotification, setShowNotification] = useState(false);
    const onSubmitForm = async (e) => {
        e.preventDefault();
        // if (!file) {
        //   alert("Please select an image for the deceased");
        //   return;
        // }
      
        // const obituaryId = uuidv4();
        // console.log(personName, dateOfBirth, dateOfDeath, file);
        // const timestamp = new Date().toISOString();
        // const data = new FormData();
        // data.append("file", file);
        // data.append("personName", personName);
        // data.append("dateOfBirth", dateOfBirth);
        // data.append("dateOfDeath", dateOfDeath || defaultDate);
        // data.append("obituaryId", obituaryId);
        // data.append("timestamp", timestamp);
    
        // const button = document.querySelector('.write-obituary-button');
        // button.disabled = true;
        // button.className = 'write-obituary-button-disabled';
        // button.style.backgroundColor = 'lightgrey';
        // button.textContent = "Please wait. It's not like they're gonna be late for something ..."
        
        // const res = await fetch(`https://u7ml7vw5nogsljabtqyudxvo6u0qsndy.lambda-url.ca-central-1.on.aws/`,
        //   {
        //     method: 'POST',
        //     body: data
        //   }
        // );
    
        
        // getObituary();
        // props.cardsOn();
        // handleObituaryOff();
        // button.disabled = false;
        // button.className = 'write-obituary-button';
    };

    const chooseRandomItem = (array) => {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    };

    const [outfitSavedNotification, setOutfitSavedNotification] = useState(false);

    const saveOutfit = () => {
        console.log("Your outfit has been saved! Go to browse to see your outfits.");
        setOutfitSavedNotification(true);
        setTimeout(() => {
            setOutfitSavedNotification(false);
        }, 3000);
        setFormValues({});
        setPreviewScreen(false);
    };

    async function handleForm(event) {
        event.preventDefault();

        if (!formValues.color || !formValues.style) {
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
            style: values.style
        });
        console.log("Form Values:", values);
        // loadItems();

        // let topItems = [];
        // let bottomItems = [];
        // let dressItems = [];
        // let outerwearItems = [];
        // let accessoryItems = [];
        // let shoeItems = [];
        // let hatItems = [];
        // let bagItems = [];

        // if (formValues.color === colour1 && formValues.style === style1) {
        //     let topItems = items.filter(item => item.type === "top");
        //     let bottomItems = items.filter(item => item.type === "bottom");
        //     let dressItems = items.filter(item => item.type === "dress");
        //     let outerwearItems = items.filter(item => item.type === "outerwear");
        //     let accessoryItems = items.filter(item => item.type === "accessory");
        //     let shoeItems = items.filter(item => item.type === "shoe");
        //     let hatItems = items.filter(item => item.type === "hat");
        //     let bagItems = items.filter(item => item.type === "bag");
        // }
        // else if (formValues.color != colour1 && formValues.style === style1) {
        //     let topItems = items.filter(item => item.type === "top" && item.colour === formValues.color);
        //     let bottomItems = items.filter(item => item.type === "bottom" && item.colour === formValues.color);
        //     let dressItems = items.filter(item => item.type === "dress" && item.colour === formValues.color);
        //     let outerwearItems = items.filter(item => item.type === "outerwear" && item.colour === formValues.color);
        //     let accessoryItems = items.filter(item => item.type === "accessory" && item.colour === formValues.color);
        //     let shoeItems = items.filter(item => item.type === "shoe" && item.colour === formValues.color);
        //     let hatItems = items.filter(item => item.type === "hat" && item.colour === formValues.color);
        //     let bagItems = items.filter(item => item.type === "bag" && item.colour === formValues.color);
        // }
        // else if (formValues.color === colour1 && formValues.style != style1) {
        //     let topItems = items.filter(item => item.type === "top" && item.style === formValues.style);
        //     let bottomItems = items.filter(item => item.type === "bottom" && item.style === formValues.style);
        //     let dressItems = items.filter(item => item.type === "dress" && item.style === formValues.style);
        //     let outerwearItems = items.filter(item => item.type === "outerwear" && item.style === formValues.style);
        //     let accessoryItems = items.filter(item => item.type === "accessory" && item.style === formValues.style);
        //     let shoeItems = items.filter(item => item.type === "shoe" && item.style === formValues.style);
        //     let hatItems = items.filter(item => item.type === "hat" && item.style === formValues.style);
        //     let bagItems = items.filter(item => item.type === "bag" && item.style === formValues.style);
        // }
        



        // const randomOutfitValue = Math.floor(Math.random() * 1);
        // if (randomOutfitValue == 0) {
        //     setChosenDress(chooseRandomItem(dressItems));
        //     if ((Math.floor(Math.random() * 1)) == 1) {
        //         setChosenTop(chooseRandomItem(topItems));
        //     }
        //     if ((Math.floor(Math.random() * 1)) == 1) {
        //         setChosenBottom(chooseRandomItem(bottomItems));
        //     }
        // }

        // else if (randomOutfitValue == 1) { 
        //     setChosenTop(chooseRandomItem(topItems));
        //     setChosenBottom(chooseRandomItem(bottomItems));
        //     if ((Math.floor(Math.random() * 1)) == 1) {
        //         setChosenDress(chooseRandomItem(dressItems));
        //     }
        // }
        // if ((Math.floor(Math.random() * 1)) == 1) {
        //     setChosenOuterwear(chooseRandomItem(outerwearItems));
        // }

        // if ((Math.floor(Math.random() * 1)) == 1) {
        //     setChosenAccessory(chooseRandomItem(accessoryItems));
        // }

        // if ((Math.floor(Math.random() * 1)) == 1) {
        //     setChosenShoe(chooseRandomItem(shoeItems));
        // }

        // if ((Math.floor(Math.random() * 1)) == 1) {
        //     setChosenHat(chooseRandomItem(hatItems));
        // }

        // if ((Math.floor(Math.random() * 1)) == 1) {
        //     setChosenBag(chooseRandomItem(bagItems));
        // }

        
        
        
        

        try {
            setPreviewScreen(true);
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
            {outfitSavedNotification && (
                <Alert status="success" mt={4}>
                    <AlertIcon />
                    Outfit saved
                </Alert>
            )}
            {!previewScreen && (
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
                            <Text size='sm'>Select a style</Text>
                            <Select placeholder='Select Style' name="style" onChange={handleSelectChange}>
                                {Object.keys(styleOptions).map((key) => (
                                    <option key={key} value={key}>{styleOptions[key]}</option>
                                ))}
                            </Select>
                            <Button
                                mt={4}
                                colorScheme='teal'
                                type='submit'
                                disabled={!isFormValid.color || !isFormValid.style}
                            >
                                Submit
                            </Button>
                        </form>
                        {showNotification && (
                            <Alert status="warning" mt={4}>
                                <AlertIcon />
                                Please make selections for both color and style.
                            </Alert>
                        )}
                    </Flex>
                </Container >
            )}
            

            {previewScreen && (
                <PreviewScreen
                    formValues={formValues}
                    previewScreen={previewScreen}
                    previewOff={previewOff}
                    setPreviewScreen={setPreviewScreen}
                    chosenTop={chosenTop}
                    chosenBottom={chosenBottom}
                    chosenDress={chosenDress}
                    chosenOuterwear={chosenOuterwear}
                    chosenAccessory={chosenAccessory}
                    chosenShoe={chosenShoe}
                    chosenHat={chosenHat}
                    chosenBag={chosenBag}
                    saveOutfit={saveOutfit}
                    outfitSavedNotification={outfitSavedNotification}
                />
            )}
            {displayScreen && <Display formValues={formValues} setDisplayScreen={setDisplayScreen} chosenTop={chosenTop} chosenBottom={chosenBottom}
            chosenDress={chosenDress} chosenOuterwear={chosenOuterwear} chosenAccessory={chosenAccessory} chosenShoe={chosenShoe} chosenHat={chosenHat}
            chosenBag={chosenBag} />}
                
            <footer >
                <p>&copy; 2024 Dream Closet. All rights reserved.</p>
            </footer>
        </div>
    )


    // return (
    //     <div>
    //         <Header />
    //         {!displayScreen &&
    //             <Container mb={4}>
    //                 <Flex direction="column" alignItems="center" mt={4}>
    //                     <Heading as='h3' size='lg' mb={4}>Generate an Outfit!</Heading>
    //                     <form onSubmit={handleForm}>
    //                         <Text size='sm'>Select a colour</Text>
    //                         <Select placeholder='Select Colour' name="color" onChange={handleSelectChange} mb={2}>
    //                             {Object.keys(colourOptions).map((key) => (
    //                                 <option key={key} value={key}>{colourOptions[key]}</option>
    //                             ))}
    //                         </Select>
    //                         <Text size='sm'>Select a season</Text>
    //                         <Select placeholder='Select Season' name="season" onChange={handleSelectChange}>
    //                             {Object.keys(seasonOptions).map((key) => (
    //                                 <option key={key} value={key}>{seasonOptions[key]}</option>
    //                             ))}
    //                         </Select>
    //                         <Button
    //                             mt={4}
    //                             colorScheme='teal'
    //                             type='submit'
    //                             disabled={!isFormValid.color || !isFormValid.season}
    //                         >
    //                             Submit
    //                         </Button>
    //                     </form>
    //                     {showNotification && (
    //                         <Alert status="warning" mt={4}>
    //                             <AlertIcon />
    //                             Please make selections for both color and season.
    //                         </Alert>
    //                     )}
    //                 </Flex>
    //             </Container >
    //         }
    //         {displayScreen && <Display formValues={formValues} setDisplayScreen={setDisplayScreen} chosenTop={chosenTop} chosenBottom={chosenBottom}
    //         chosenDress={chosenDress} chosenOuterwear={chosenOuterwear} chosenAccessory={chosenAccessory} chosenShoe={chosenShoe} chosenHat={chosenHat}
    //         chosenBag={chosenBag} />}
    //         <footer >
    //             <p>&copy; 2024 Dream Closet. All rights reserved.</p>
    //         </footer>
    //     </div>
    // )
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