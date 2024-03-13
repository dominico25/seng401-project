import { useState } from "react";
import React from "react";
import { Container, Button, Image, Flex } from '@chakra-ui/react';
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
    
    const selectedColour = colourOptions[props.formValues.color];
    const selectedStyle = styleOptions[props.formValues.style];

    const handlePreviewOff = () => {
        props.previewOff();
    };


    const handleSaveOutfit = () => {
        props.saveOutfit();
        
        // const itemTypes = [
        //     { key: "top_id", prop: chosenTop, accessor: props.chosenTop },
        //     { key: "bottom_id", prop: chosenBottom, accessor: props.chosenBottom },
        //     { key: "outerwear_id", prop: chosenOuterwear, accessor: props.chosenOuterwear },
        //     { key: "accessories_id", prop: chosenAccessory, accessor: props.chosenAccessory },
        //     { key: "shoes_id", prop: chosenShoe, accessor: props.chosenShoe },
        //     { key: "hat_id", prop: chosenHat, accessor: props.chosenHat },
        //     { key: "bag_id", prop: chosenBag, accessor: props.chosenBag }
        // ];
        // const data = new FormData();
        // clothingCategories.forEach(category => {
        //     if (category.prop === null) {
        //       data.append(category.key, category.accessor.id);
        //     } else {
        //       data.append(category.key, null);
        //     }
        // });
        // if (props.chosenBottom != null) {
        //     data.append("account_id", props.chosenBottom.account_id);
        // }
        // else if (props.chosenTop != null) {
        //     data.append("account_id", props.chosenTop.account_id);
        // }
        // else if (props.chosenDress != null) {
        //     data.append("account_id", props.chosenDress.account_id);
        // }
        // const res = await fetch(`https://oj6r4a6ld64j7xxhcru3ioarve0xniwl.lambda-url.ca-central-1.on.aws/`,
        //     {
        //         method: 'POST',
        //         body: data
        //     }
        // );
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
                        {/* <Image boxSize='200px' src={props.chosenItems[0].image_url} alt='Top' /> */}
                        <h1>Dress</h1>
                        {/* <Image boxSize='200px' src={props.chosenItems[2].image_url} alt='Dress' /> */}
                        {/* <h1>Hat</h1>
                        <Image boxSize='200px' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlyG6nAdKXe4OsY7Un96eqGuC7XxxSBaUKZQ&usqp=CAU' alt='Hat' /> */}
                    </Flex>
                    <Flex direction="column" alignItems="center">
                        <h1>Bottom</h1>
                        {/* <Image boxSize='200px' src={props.chosenItems[1].image_url} alt='Bottom' /> */}
                        {/* <h1>Outerwear</h1>
                        <Image boxSize='200px' src='https://kawaiialley.ca/cdn/shop/collections/224-2246129_totoro-and-little-totoros.jpg?v=1644298877' alt='Outerwear' />
                        <h1>Bag</h1>
                        <Image boxSize='200px' src='https://kawaiialley.ca/cdn/shop/collections/224-2246129_totoro-and-little-totoros.jpg?v=1644298877' alt='Bag' /> */}
                    </Flex>
                    <Flex direction="column" alignItems="center">
                        {/* <h1>Shoes</h1>
                        <Image boxSize='200px' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlyG6nAdKXe4OsY7Un96eqGuC7XxxSBaUKZQ&usqp=CAU' alt='Shoes' />
                        <h1>Accessory</h1>
                        <Image boxSize='200px' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlyG6nAdKXe4OsY7Un96eqGuC7XxxSBaUKZQ&usqp=CAU' alt='Accessory' /> */}
                    </Flex>
                </Flex>
                <h1>Would you like to save this outfit?</h1>
                <Flex direction = "column">
                    <Button mt={4} colorScheme='teal' type='submit' onClick={handleSaveOutfit} > Yes, save this outfit!</Button>
                    <Button mt={4} colorScheme='teal'  onClick={handlePreviewOff}> No, go back to outfit generator</Button>
                </Flex>
            </Container>
        </div>
    );
}

export default PreviewScreen;