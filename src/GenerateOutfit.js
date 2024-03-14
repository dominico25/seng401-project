import { useState, useEffect } from "react";
import React from "react";
import Display from './Display';
import PreviewScreen from './PreviewScreen';
import Header from "./Header";
import { Select, Button, Container, Alert, AlertIcon, Heading, Flex, Text } from '@chakra-ui/react'


function GenerateOutfit() {
    const [chosenItems, setChosenItems] = useState({
        top: null,
        bottom: null,
        dress: null,
        outerwear: null,
        accessory: null,
        shoe: null,
        hat: null,
        bag: null
    });
    // const [chosenItems, setChosenItems] = useState({
    //     top: {
    //         account_id: null,
    //         colour: null,
    //         image_url: null,
    //         item_id: null,
    //         style: null,
    //         type: null
    //     },
    //     bottom: {
    //         account_id: null,
    //         colour: null,
    //         image_url: null,
    //         item_id: null,
    //         style: null,
    //         type: null
    //     },
    //     dress: {
    //         account_id: null,
    //         colour: null,
    //         image_url: null,
    //         item_id: null,
    //         style: null,
    //         type: null
    //     },
    //     outerwear: {
    //         account_id: null,
    //         colour: null,
    //         image_url: null,
    //         item_id: null,
    //         style: null,
    //         type: null
    //     },
    //     accessory: {
    //         account_id: null,
    //         colour: null,
    //         image_url: null,
    //         item_id: null,
    //         style: null,
    //         type: null
    //     },
    //     shoe: {
    //         account_id: null,
    //         colour: null,
    //         image_url: null,
    //         item_id: null,
    //         style: null,
    //         type: null
    //     },
    //     hat: {
    //         account_id: null,
    //         colour: null,
    //         image_url: null,
    //         item_id: null,
    //         style: null,
    //         type: null
    //     },
    //     bag: {
    //         account_id: null,
    //         colour: null,
    //         image_url: null,
    //         item_id: null,
    //         style: null,
    //         type: null
    //     }
    // });
    
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
    // const [account, setAccount] = useState(null);
    const account = {id: "1"};
    
    const loadItems = async () => {
        const res = await fetch(`https://wdjm3hpfxabxmhbgyrwmt3cf2y0suqcr.lambda-url.ca-central-1.on.aws/?account_id=${account.id}`);
        if (res.status === 200) {
            const data = await res.json();
            setItems(data);
        }
        
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
    const [isFormValid, setIsFormValid] = useState({ colour: true, style: true });
    const [showNotification, setShowNotification] = useState(false);
    

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

    const resetChosenItems = () => {
        setChosenTop(null);
        setChosenBottom(null);
        setChosenDress(null);
        setChosenOuterwear(null);
        setChosenAccessory(null);
        setChosenShoe(null);
        setChosenHat(null);
        setChosenBag(null);
        setChosenItems({
            top: null,
            bottom: null,
            dress: null,
            outerwear: null,
            accessory: null,
            shoe: null,
            hat: null,
            bag: null
        });
        


    };

    // useEffect(() => {
    //     let topItems = [];
    //     let bottomItems = [];
    //     let dressItems = [];
    //     let outerwearItems = [];
    //     let accessoryItems = [];
    //     let shoeItems = [];
    //     let hatItems = [];
    //     let bagItems = [];

    //     // console.log("Right before ifs:", items);

    //     if (formValues.colour === colourOptions[1] && formValues.style === styleOptions[1]) {
    //         console.log("1111111111111111111111111111111111111111");
    //         topItems = items.filter(item => item.type === "top");
    //         bottomItems = items.filter(item => item.type === "bottom");
    //         dressItems = items.filter(item => item.type === "dress");
    //         outerwearItems = items.filter(item => item.type === "outerwear");
    //         accessoryItems = items.filter(item => item.type === "accessory");
    //         shoeItems = items.filter(item => item.type === "shoe");
    //         hatItems = items.filter(item => item.type === "hat");
    //         bagItems = items.filter(item => item.type === "bag");
    //     }
    //     else if (formValues.colour !== colourOptions[1] && formValues.style === styleOptions[1]) {
    //         console.log("2222222222222222222222222222222222222222");
    //         topItems = items.filter(item => item.type === "top" && item.colour === formValues.colour);
    //         bottomItems = items.filter(item => item.type === "bottom" && item.colour === formValues.colour);
    //         dressItems = items.filter(item => item.type === "dress" && item.colour === formValues.colour);
    //         outerwearItems = items.filter(item => item.type === "outerwear" && item.colour === formValues.colour);
    //         accessoryItems = items.filter(item => item.type === "accessory" && item.colour === formValues.colour);
    //         shoeItems = items.filter(item => item.type === "shoe" && item.colour === formValues.colour);
    //         hatItems = items.filter(item => item.type === "hat" && item.colour === formValues.colour);
    //         bagItems = items.filter(item => item.type === "bag" && item.colour === formValues.colour);
    //     }
    //     else if (formValues.colour === colourOptions[1] && formValues.style !== styleOptions[1]) {
    //         console.log("33333333333333333333333333333333333333333");
    //         topItems = items.filter(item => item.type === "top" && item.style === formValues.style);
    //         bottomItems = items.filter(item => item.type === "bottom" && item.style === formValues.style);
    //         dressItems = items.filter(item => item.type === "dress" && item.style === formValues.style);
    //         outerwearItems = items.filter(item => item.type === "outerwear" && item.style === formValues.style);
    //         accessoryItems = items.filter(item => item.type === "accessory" && item.style === formValues.style);
    //         shoeItems = items.filter(item => item.type === "shoe" && item.style === formValues.style);
    //         hatItems = items.filter(item => item.type === "hat" && item.style === formValues.style);
    //         bagItems = items.filter(item => item.type === "bag" && item.style === formValues.style);
    //     }
        
    //     // topItems = items.filter(item => item.type === "top");
    //     // bottomItems = items.filter(item => item.type === "bottom");
    //     // dressItems = items.filter(item => item.type === "dress");
    //     // outerwearItems = items.filter(item => item.type === "outerwear");
    //     // accessoryItems = items.filter(item => item.type === "accessory");
    //     // shoeItems = items.filter(item => item.type === "shoe");
    //     // hatItems = items.filter(item => item.type === "hat");
    //     // bagItems = items.filter(item => item.type === "bag");
    //     console.log("Top items:", topItems);
    //     console.log("Bottom items:", bottomItems);
    //     console.log("Dress items:", dressItems);
    //     console.log("Outerwear items:", outerwearItems);
    //     console.log("Accessory items:", accessoryItems);
    //     console.log("Shoe items:", shoeItems);
    //     console.log("Hat items:", hatItems);
    //     console.log("Bag items:", bagItems);



    //     const randomOutfitValue = Math.floor(Math.random() * 1);
    //     if (randomOutfitValue === 0) {
    //         // setChosenDress(chooseRandomItem(dressItems));
            
    //         chosenItems.dress = chooseRandomItem(dressItems);
    //         if ((Math.floor(Math.random() * 1)) === 1) {
    //             setChosenTop(chooseRandomItem(topItems));
    //             chosenItems.top = chooseRandomItem(topItems);
    //         }
    //         if ((Math.floor(Math.random() * 1)) === 1) {
    //             setChosenBottom(chooseRandomItem(bottomItems));
    //             chosenItems.bottom = chooseRandomItem(bottomItems);
    //         }
    //     }

    //     else if (randomOutfitValue === 1) { 
    //         setChosenTop(chooseRandomItem(topItems));
    //         setChosenBottom(chooseRandomItem(bottomItems))
    //         chosenItems.top = chooseRandomItem(topItems);
    //         chosenItems.bottom = chooseRandomItem(bottomItems);
    //         if ((Math.floor(Math.random() * 1)) === 1) {
    //             setChosenDress(chooseRandomItem(dressItems));
    //             chosenItems.dress = chooseRandomItem(dressItems);
    //         }
    //     }
    //     if ((Math.floor(Math.random() * 1)) === 1) {
    //         setChosenOuterwear(chooseRandomItem(outerwearItems));
    //         chosenItems.outerwear = chooseRandomItem(outerwearItems);
    //     }

    //     if ((Math.floor(Math.random() * 1)) === 1) {
    //         setChosenAccessory(chooseRandomItem(accessoryItems));
    //         chosenItems.accessory = chooseRandomItem(accessoryItems);
    //     }

    //     if ((Math.floor(Math.random() * 1)) === 1) {
    //         setChosenShoe(chooseRandomItem(shoeItems));
    //         chosenItems.shoe = chooseRandomItem(shoeItems);
    //     }

    //     if ((Math.floor(Math.random() * 1)) === 1) {
    //         setChosenHat(chooseRandomItem(hatItems));
    //         chosenItems.hat = chooseRandomItem(hatItems);
    //     }

    //     if ((Math.floor(Math.random() * 1)) === 1) {
    //         setChosenBag(chooseRandomItem(bagItems));
    //         chosenItems.bag = chooseRandomItem(bagItems);
    //     }

    //     // console.log("Chosen Items:", chosenItems);
    // }, [items, formValues.colour, formValues.style, loadItems, chosenItems, colourOptions, styleOptions])

    useEffect(() => {
        loadItems();
    }, [account.id, loadItems]);

    async function handleForm(event) {
        event.preventDefault();

        if (!formValues.colour || !formValues.style) {
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false); // Hide notification after 3 seconds
            }, 3000); // 3000 milliseconds = 3 seconds
            return;
        }
    
        const formData = new FormData(event.target);
        const values = Object.fromEntries(formData.entries());
        setFormValues({
            colour: colourOptions[values.colour],
            style: styleOptions[values.style]
        });
        console.log("Form Values:", values);
        loadItems();
        let topItems = [];
        let bottomItems = [];
        let dressItems = [];
        let outerwearItems = [];
        let accessoryItems = [];
        let shoeItems = [];
        let hatItems = [];
        let bagItems = [];
        const formColour = colourOptions[values.colour];
        const formStyle = styleOptions[values.style];
        // console.log("Right before ifs:", items);
        // console.log(styleOptions[formValues.style]);
        // console.log(values.colour);
        // console.log(colourOptions["colour1"]);
        if (formColour === colourOptions["colour1"] && formStyle === styleOptions["style1"]) {
            console.log("1111111111111111111111111111111111111111");
            topItems = items.filter(item => item.type === "top");
            bottomItems = items.filter(item => item.type === "bottom");
            dressItems = items.filter(item => item.type === "dress");
            outerwearItems = items.filter(item => item.type === "outerwear");
            accessoryItems = items.filter(item => item.type === "accessory");
            shoeItems = items.filter(item => item.type === "shoe");
            hatItems = items.filter(item => item.type === "hat");
            bagItems = items.filter(item => item.type === "bag");
        }
        else if (formColour !== colourOptions["colour1"] && formStyle === styleOptions["style1"]) {
            console.log("2222222222222222222222222222222222222222");
            console.log(items);
            topItems = items.filter(item => item.type === "top" && item.colour === formColour);
            bottomItems = items.filter(item => item.type === "bottom" && item.colour === formColour);
            dressItems = items.filter(item => item.type === "dress" && item.colour === formColour);
            outerwearItems = items.filter(item => item.type === "outerwear" && item.colour === formColour);
            accessoryItems = items.filter(item => item.type === "accessory" && item.colour === formColour);
            shoeItems = items.filter(item => item.type === "shoe" && item.colour === formColour);
            hatItems = items.filter(item => item.type === "hat" && item.colour === formColour);
            bagItems = items.filter(item => item.type === "bag" && item.colour === formColour);
        }
        else if (formColour === colourOptions["colour1"] && formStyle !== styleOptions["style1"]) {
            console.log("3333333333333333333333333333333333333333");
            topItems = items.filter(item => item.type === "top" && item.style === formStyle);
            bottomItems = items.filter(item => item.type === "bottom" && item.style === formStyle);
            dressItems = items.filter(item => item.type === "dress" && item.style === formStyle);
            outerwearItems = items.filter(item => item.type === "outerwear" && item.style === formStyle);
            accessoryItems = items.filter(item => item.type === "accessory" && item.style === formStyle);
            shoeItems = items.filter(item => item.type === "shoe" && item.style === formStyle);
            hatItems = items.filter(item => item.type === "hat" && item.style === formStyle);
            bagItems = items.filter(item => item.type === "bag" && item.style === formStyle);
        }
        else {
            console.log("4444444444444444444444444444444444444444");
            topItems = items.filter(item => item.type === "top" && item.style === formStyle && item.colour === formColour);
            bottomItems = items.filter(item => item.type === "bottom" && item.style === formStyle && item.colour === formColour);
            dressItems = items.filter(item => item.type === "dress" && item.style === formStyle && item.colour === formColour);
            outerwearItems = items.filter(item => item.type === "outerwear" && item.style === formStyle && item.colour === formColour);
            accessoryItems = items.filter(item => item.type === "accessory" && item.style === formStyle && item.colour === formColour);
            shoeItems = items.filter(item => item.type === "shoe" && item.style === formStyle && item.colour === formColour);
            hatItems = items.filter(item => item.type === "hat" && item.style === formStyle && item.colour === formColour);
            bagItems = items.filter(item => item.type === "bag" && item.style === formStyle && item.colour === formColour);
        }

        // console.log("1111111111111111111111111111111111111111");
        
        console.log("Top items:", topItems);
        console.log("Bottom items:", bottomItems);
        console.log("Dress items:", dressItems);
        console.log("Outerwear items:", outerwearItems);
        console.log("Accessory items:", accessoryItems);
        console.log("Shoe items:", shoeItems);
        console.log("Hat items:", hatItems);
        console.log("Bag items:", bagItems);


        const randomOutfitValue = Math.floor(Math.random() * 2);
        // const randomOutfitValue = 1;
        if (randomOutfitValue === 0) {
            setChosenDress(chooseRandomItem(dressItems));
            chosenItems.dress = chooseRandomItem(dressItems);
            // console.log("fdiosvoildjsovdfjsop", chosenItems.dress)
            if ((Math.floor(Math.random() * 1)) === 1) {
                setChosenTop(chooseRandomItem(topItems));
                chosenItems.top = chooseRandomItem(topItems);
            }
            if ((Math.floor(Math.random() * 1)) === 1) {
                setChosenBottom(chooseRandomItem(bottomItems));
                chosenItems.bottom = chooseRandomItem(bottomItems);
            }
        }

        else if (randomOutfitValue === 1) { 
            setChosenTop(chooseRandomItem(topItems));
            setChosenBottom(chooseRandomItem(bottomItems))
            chosenItems.top = chooseRandomItem(topItems);
            chosenItems.bottom = chooseRandomItem(bottomItems);
            if ((Math.floor(Math.random() * 1)) === 1) {
                setChosenDress(chooseRandomItem(dressItems));
                chosenItems.dress = chooseRandomItem(dressItems);
            }
        }
        if ((Math.floor(Math.random() * 1)) === 1) {
            setChosenOuterwear(chooseRandomItem(outerwearItems));
            chosenItems.outerwear = chooseRandomItem(outerwearItems);
        }

        if ((Math.floor(Math.random() * 1)) === 1) {
            setChosenAccessory(chooseRandomItem(accessoryItems));
            chosenItems.accessory = chooseRandomItem(accessoryItems);
        }

        if ((Math.floor(Math.random() * 1)) === 1) {
            setChosenShoe(chooseRandomItem(shoeItems));
            chosenItems.shoe = chooseRandomItem(shoeItems);
        }

        if ((Math.floor(Math.random() * 1)) === 1) {
            setChosenHat(chooseRandomItem(hatItems));
            chosenItems.hat = chooseRandomItem(hatItems);
        }

        if ((Math.floor(Math.random() * 1)) === 1) {
            setChosenBag(chooseRandomItem(bagItems));
            chosenItems.bag = chooseRandomItem(bagItems);
        }

        console.log(chosenItems);
        
        
        

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
                            <Select placeholder='Select Colour' name="colour" onChange={handleSelectChange} mb={2}>
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
                                disabled={!isFormValid.colour || !isFormValid.style}
                            >
                                Submit
                            </Button>
                        </form>
                        {showNotification && (
                            <Alert status="warning" mt={4}>
                                <AlertIcon />
                                Please make selections for both colour and style.
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
                    chosenItems={chosenItems}
                    resetChosenItems={resetChosenItems}
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
}

export default GenerateOutfit;



