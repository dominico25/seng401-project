import { useState } from "react";
import React from "react";
import { Heading, Box, Container, Button, Image, Flex, Wrap, WrapItem } from '@chakra-ui/react';
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
        const res = await fetch(`https://ydc3xidlgow5ra2lb3bvekyhhi0rwcec.lambda-url.ca-central-1.on.aws/`,
            {
                method: 'POST',
                body: data
            }
        );
        
    };
    
    return (
        <div>
            <Flex direction="column" alignItems="center" height="100vh" mt="25" >
                <Heading as="h3" mb="7">Outfit Preview</Heading>
                <Wrap justify="center" spacing={4} mb="5">
                    {/* <h1>Top</h1> */}
                    {props.chosenTop!==null && props.chosenTop!== undefined && (
                        <Image boxSize='200px' src={props.chosenItems.top['image_url']} alt='Top' />
                    )}
                    {/* <h1>Dress</h1> */}
                    {props.chosenDress!==null && props.chosenDress!== undefined && (
                        <Image boxSize='200px' src={props.chosenItems.dress['image_url']} alt='Dress' />
                    )}
                    {/* <h1>Hat</h1> */}
                    {props.chosenHat!==null && props.chosenHat!== undefined && (
                        <Image boxSize='200px' src={props.chosenItems.hat['image_url']} alt='Hat' />
                    )}
                    {/* <h1>Bottom</h1> */}
                    {props.chosenBottom!==null && props.chosenBottom!== undefined && (
                        <Image boxSize='200px' src={props.chosenItems.bottom['image_url']} alt='Bottom' />
                    )}
                    {/* <h1>Outerwear</h1> */}
                    {props.chosenOuterwear!==null && props.chosenOuterwear!== undefined && (
                        <Image boxSize='200px' src={props.chosenItems.outerwear['image_url']} alt='Outerwear' />
                    )}
                    {/* <h1>Bag</h1> */}
                    {props.chosenBag!==null && props.chosenBag!== undefined && (
                        <Image boxSize='200px' src={props.chosenItems.bag['image_url']} alt='Bag' />
                    )}
                    {/* <h1>Shoes</h1> */}
                    {props.chosenShoe!==null && props.chosenShoe!== undefined && (
                        <Image boxSize='200px' src={props.chosenItems.shoe['image_url']} alt='Shoes' />
                    )}
                    {/* <h1>Accessory</h1> */}
                    {props.chosenAccessory!==null && props.chosenAccessory!== undefined && (
                        <Image boxSize='200px' src={props.chosenItems.accessory['image_url']} alt='Accessory' />
                    )}
                </Wrap>
                <Box mb={4}>
                    <Heading size="md">Would you like to save this outfit?</Heading>
                    <Flex direction="column">
                        <Button mt={4} colorScheme="teal" type="submit" onClick={handleSaveOutfit}>
                            Yes, save this outfit!
                        </Button>
                        <Button mt={4} colorScheme="gray" onClick={handlePreviewOff}>
                            No, go back to outfit generator
                        </Button>
                    </Flex>
                </Box>
            </Flex>

        </div>
      );
      
}

export default PreviewScreen;