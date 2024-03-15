import { useState } from "react";
import React from "react";
import { Container, Button, Image, Flex } from '@chakra-ui/react';
import { bottom } from "@popperjs/core";
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
function PreviewScreen(props) {
    // console.log(props.chosenItems.dress['image_url']);
    const selectedColour = colourOptions[props.formValues.colour];
    const selectedStyle = styleOptions[props.formValues.style];

    const handlePreviewOff = () => {
        props.previewOff();
    };

    // const [accountID, setAccountID] = useState("");

    const handleSaveOutfit = async () => {
        props.saveOutfit();
        
        
        // const clothingCategories = [
        //     { key: "top_id", prop: props.chosenItems.top, accessor: props.chosenItems.top ? props.chosenItems.top['item_id'] : null },
        //     { key: "bottom_id", prop: props.chosenItems.bottom, accessor: props.chosenItems.bottom ? props.chosenItems.bottom['item_id'] : null },
        //     { key: "outerwear_id", prop: props.chosenItems.outerwear, accessor: props.chosenItems.outerwear ? props.chosenItems.outerwear['item_id'] : null },
        //     { key: "accessories_id", prop: props.chosenItems.accessory, accessor: props.chosenItems.accessory ? props.chosenItems.accessory['item_id'] : null },
        //     { key: "shoes_id", prop: props.chosenItems.shoe, accessor: props.chosenItems.shoe ? props.chosenItems.shoe['item_id'] : null },
        //     { key: "hat_id", prop: props.chosenItems.hat, accessor: props.chosenItems.hat ? props.chosenItems.hat['item_id'] : null },
        //     { key: "bag_id", prop: props.chosenItems.bag, accessor: props.chosenItems.bag ? props.chosenItems.bag['item_id'] : null }
        // ];

        const topID = props.chosenItems.top ? props.chosenItems.top['item_id'] : null;
        const bottomID = props.chosenItems.bottom ? props.chosenItems.bottom['item_id'] : null;
        const dressID = props.chosenItems.dress ? props.chosenItems.dress['item_id'] : null;
        const outerwearID = props.chosenItems.outerwear ? props.chosenItems.outerwear['item_id'] : null;
        const accessoriesID = props.chosenItems.accessories ? props.chosenItems.accessories['item_id'] : null;
        const shoesID = props.chosenItems.shoes ? props.chosenItems.shoes['item_id'] : null;
        const hatID = props.chosenItems.hat ? props.chosenItems.hat['item_id'] : null;
        const bagID = props.chosenItems.bag ? props.chosenItems.bag['item_id'] : null;
        let accountID;
        
        // const data = new FormData();
        // clothingCategories.forEach(category => {
        //     data.append(category.key, category.accessor);
        // });
        // clothingCategories.forEach(category => {
        //     // Append null if accessor is null, otherwise append accessor
        //     data.append(category.key, category.accessor !== null ? category.accessor : null);
        // });
        if (props.chosenItems.bottom !== null && props.chosenItems.bottom !== undefined) {
            // setAccountID(props.chosenItems.bottom['account_id']);
            accountID = props.chosenItems.bottom['account_id']
            // data.append("account_id", props.chosenBottom.account_id);
        }
        else if (props.chosenItems.top !== null && props.chosenItems.top !== undefined) {
            // setAccountID(props.chosenItems.top['account_id']);
            accountID = props.chosenItems.top['account_id']
            // data.append("account_id", props.chosenTop.account_id);
        }
        else if (props.chosenItems.dress !== null && props.chosenItems.dress !== null) {
            console.log("ACCCCCCOUUUUNNTTT", props.chosenItems.dress['account_id']);

            // setAccountID(props.chosenItems.dress['account_id']);
            accountID = props.chosenItems.dress['account_id']
            console.log(accountID);
            // data.append("account_id", props.chosenDress.account_id);
        }
        const data = JSON.stringify ({
            top_id: topID,
            bottom_id: bottomID,
            dress_id: dressID,
            outerwear_id: outerwearID,
            accessories_id: accessoriesID,
            shoes_id: shoesID,
            hat_id: hatID,
            bag_id: bagID,
            account_id: accountID
        });
        console.log("DATAAAAAAAAAAAA", data);
        const res = await fetch(`https://cgmjrmocy3sk4uxcmighoudj7e0sxtsa.lambda-url.ca-central-1.on.aws/`,
            {
                method: 'POST',
                body: data
            }
        );
        
    };

    // async function handleForm(event) {
    //     event.preventDefault();
        // GOOD STUFF
        







        // if (chosenTop == null) {
        //     data.append("top_id", props.chosenTop.id);
        // }
        // else {
        //     data.append("top_id", null);
        // }

        // if (chosenBottom == null) {
        //     data.append("bottom_id", props.chosenBottom.id);
        // }
        // else {
        //     data.append("bottom_id", null);
        // }

        // if (chosenOuterwear == null) {
        //     data.append("outerwear_id", props.chosenOuterwear.id);
        // }
        // else {
        //     data.append("outerwear_id", null);
        // }

        // if (chosenAccessory == null) {
        //     data.append("accessories_id", props.chosenAccessory.id);
        // }
        // else {
        //     data.append("accessories_id", null);
        // }

        // if (chosenShoe == null) {
        //     data.append("shoes_id", props.chosenShoe.id);
        // }
        // else {
        //     data.append("shoes_id", null);
        // }
        
        // if (chosenHat == null) {
        //     data.append("hat_id", props.chosenHat.id);
        // }
        // else {
        //     data.append("hat_id", null);
        // }

        // if (chosenBag == null) {
        //     data.append("bag_id", props.chosenBag.id);
        // }
        // else {
        //     data.append("bag_id", null);
        // }

        // const data = {
        //     top_id: props.chosenTop,
        //     bottom_id: 5,
        //     outerwear_id: 7,
        //     accessories_id: 5,
        //     shoes_id: 3,
        //     hat_id: 2,
        //     bag_id: 1,
        //     account_id: 1
        // };
        // const jsonData = JSON.stringify(data, null, 2);
    // }
    
    return (
        <div>
            <h1>Outfit Preview</h1>
            <Container mb={4}>
                <p>Colour: {selectedColour}</p>
                <p>Style: {selectedStyle}</p>
                <Flex direction="row" alignItems="center" mt={4}>
                <Flex direction="column" alignItems="center">
                    <h1>Top</h1>
                    {props.chosenTop!==null && props.chosenTop!== undefined && (
                        <Image boxSize='200px' src={props.chosenItems.top['image_url']} alt='Top' />
                    )}
                    <h1>Dress</h1>
                    {props.chosenDress!==null && props.chosenDress!== undefined && (
                        <Image boxSize='200px' src={props.chosenItems.dress['image_url']} alt='Dress' />
                    )}
                    <h1>Hat</h1>
                    {props.chosenHat!==null && props.chosenHat!== undefined && (
                        <Image boxSize='200px' src={props.chosenItems.hat['image_url']} alt='Hat' />
                    )}
                </Flex>
                <Flex direction="column" alignItems="center">
                    <h1>Bottom</h1>
                    {props.chosenBottom!==null && props.chosenBottom!== undefined && (
                        <Image boxSize='200px' src={props.chosenItems.bottom['image_url']} alt='Bottom' />
                    )}
                    <h1>Outerwear</h1>
                    {props.chosenOuterwear!==null && props.chosenOuterwear!== undefined && (
                        <Image boxSize='200px' src={props.chosenItems.outerwear['image_url']} alt='Outerwear' />
                    )}
                    <h1>Bag</h1>
                    {props.chosenBag!==null && props.chosenBag!== undefined && (
                        <Image boxSize='200px' src={props.chosenItems.bag['image_url']} alt='Bag' />
                    )}
                </Flex>
                <Flex direction="column" alignItems="center">
                    <h1>Shoes</h1>
                    {props.chosenShoe!==null && props.chosenShoe!== undefined && (
                        <Image boxSize='200px' src={props.chosenItems.shoe['image_url']} alt='Shoes' />
                    )}
                    <h1>Accessory</h1>
                    {props.chosenAccessory!==null && props.chosenAccessory!== undefined && (
                        <Image boxSize='200px' src={props.chosenItems.accessory['image_url']} alt='Accessory' />
                    )}
                </Flex>
                </Flex>
                <h1>Would you like to save this outfit?</h1>
                <Flex direction="column">
                    <Button mt={4} colorScheme='teal' type='submit' onClick={() => {
                        handleSaveOutfit();
                        props.resetChosenItems();
                    }}>Yes, save this outfit!</Button>
                    <Button mt={4} colorScheme='teal' onClick={() => {
                        handlePreviewOff();
                        props.resetChosenItems();
                    }}>No, go back to outfit generator</Button>

                </Flex>
            </Container>
        </div>
      );
      
}

export default PreviewScreen;