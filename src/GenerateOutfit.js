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
    const account = {id: "dominicomendes@gmail.com"};
    
    const loadItems = async () => {
        const res = await fetch(`https://7tiwn5fhpevvw25px476uovooy0nckmy.lambda-url.ca-central-1.on.aws/?account_id=${account.id}`);
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
        "colour9": "Brown",
        "colour10": "Black",
        "colour11": "Grey",
        "colour12": "White",
        "colour13": "Multicolour",
    };
    
    
    const styleOptions = {
        "style1": "Random",
        "style2": "Casual",
        "style3": "Formal",
        "style4": "Sporty",
    };

    const ownershipOptions = {
        "ownership1": "Random",
        "ownership2": "ClosetOnly"
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

    const [showInvalidNotification, setShowInvalidNotification] = useState(false);


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


       


        let randomOutfitValue = 1000000;
        // const randomOutfitValue = 1;
        const topItemsLength = topItems?.length ?? 0;
        const bottomItemsLength = bottomItems?.length ?? 0;
        const dressItemsLength = dressItems?.length ?? 0;
        const outerwearItemsLength = outerwearItems?.length ?? 0;
        const accessoryItemsLength = accessoryItems?.length ?? 0;
        const shoeItemsLength = shoeItems?.length ?? 0;
        const hatItemsLength = hatItems?.length ?? 0;
        const bagItemsLength = bagItems?.length ?? 0;
        // if (dressItemsLength !== 0 && bottomItemsLength !== 0 && topItemsLength !==0) {
        //     randomOutfitValue = Math.floor(Math.random() * 2);
        // }
        // else if (dressItemsLength !== 0 && bottomItemsLength === 0 && topItemsLength ===0) {
        //     randomOutfitValue = 0;
        // }
        // else if (dressItemsLength === 0 && bottomItemsLength !== 0 && topItemsLength !==0) {
        //     randomOutfitValue = 1;
        // }
        // else {
        //     setShowInvalidNotification(true);
        //     setTimeout(() => {
        //         setShowInvalidNotification(false); // Hide notification after 3 seconds
        //     }, 3000); // 3000 milliseconds = 3 seconds
        //     return;
        // }
        if (dressItemsLength > 0 && bottomItemsLength > 0 && topItemsLength > 0) {
            randomOutfitValue = Math.floor(Math.random() * 2);
        } else if (dressItemsLength > 0 && (bottomItemsLength === 0 || topItemsLength === 0)) {
            randomOutfitValue = 0;
        } else if (dressItemsLength === 0 && bottomItemsLength > 0 && topItemsLength > 0) {
            console.log(3);
            randomOutfitValue = 1;
        } else {
            console.log(4);
            setShowInvalidNotification(true);
                setTimeout(() => {
                setShowInvalidNotification(false); // Hide notification after 3 seconds
            }, 3000); // 3000 milliseconds = 3 seconds
            return;
        }
        
        
        
        console.log(randomOutfitValue);
        if (randomOutfitValue === 0) {
            setChosenDress(chooseRandomItem(dressItems));
            chosenItems.dress = chooseRandomItem(dressItems);
            // console.log("fdiosvoildjsovdfjsop", chosenItems.dress)
            if ((Math.floor(Math.random() * 2)) === 1 && topItems !== null) {
                setChosenTop(chooseRandomItem(topItems));
                chosenItems.top = chooseRandomItem(topItems);
            }
            if ((Math.floor(Math.random() * 2)) === 1 && bottomItems !== null) {
                setChosenBottom(chooseRandomItem(bottomItems));
                chosenItems.bottom = chooseRandomItem(bottomItems);
            }
            try {
                setPreviewScreen(true);
            } catch (error) {
                console.error("Error:", error);
            }
        }

        else if (randomOutfitValue === 1) { 
            setChosenTop(chooseRandomItem(topItems));
            setChosenBottom(chooseRandomItem(bottomItems))
            chosenItems.top = chooseRandomItem(topItems);
            chosenItems.bottom = chooseRandomItem(bottomItems);
            if ((Math.floor(Math.random() * 2) && dressItems !== null) === 1) {
                setChosenDress(chooseRandomItem(dressItems));
                chosenItems.dress = chooseRandomItem(dressItems);
            }
            try {
                setPreviewScreen(true);
            } catch (error) {
                console.error("Error:", error);
            }
        }


        if ((Math.floor(Math.random() * 2)) === 1 && outerwearItemsLength !== 0) {
            setChosenOuterwear(chooseRandomItem(outerwearItems));
            chosenItems.outerwear = chooseRandomItem(outerwearItems);
        }

        if ((Math.floor(Math.random() * 1)) === 1 && accessoryItemsLength !== 0) {
            setChosenAccessory(chooseRandomItem(accessoryItems));
            chosenItems.accessory = chooseRandomItem(accessoryItems);
        }

        if ((Math.floor(Math.random() * 1)) === 1 && shoeItemsLength !== 0) {
            setChosenShoe(chooseRandomItem(shoeItems));
            chosenItems.shoe = chooseRandomItem(shoeItems);
        }

        if ((Math.floor(Math.random() * 1)) === 1 && hatItemsLength !== 0) {
            setChosenHat(chooseRandomItem(hatItems));
            chosenItems.hat = chooseRandomItem(hatItems);
        }

        if ((Math.floor(Math.random() * 1)) === 1 && bagItemsLength !== 0) {
            setChosenBag(chooseRandomItem(bagItems));
            chosenItems.bag = chooseRandomItem(bagItems);
        }
        

        console.log("CHOSEN ITEMSSSSS", chosenItems);
        
        
        

        
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
                <Alert status="success" >
                    <AlertIcon />
                    Your outfit has been saved! Go to browse to see your outfits.
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
                            {/* <Text size='sm'>Select ownership</Text>
                            <Select placeholder='Select Ownership' name="ownership" onChange={handleSelectChange}>
                                {Object.keys(ownershipOptions).map((key) => (
                                    <option key={key} value={key}>{ownershipOptions[key]}</option>
                                ))}
                            </Select> */}
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
                        {showInvalidNotification && (
                            <Alert status="warning" mt={4}>
                                <AlertIcon />
                                No items of specified choice. Upload more items or select valid options.
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
                
            <footer style={{ position: "fixed", bottom: "0", width: "100%", padding: "10px 0", textAlign: "center" }}>
                <p>&copy; 2024 Dream Closet. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default GenerateOutfit;



