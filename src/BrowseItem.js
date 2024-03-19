import { useState, useEffect, useRef } from "react";
import React from "react";
import Display from './Display';
import PreviewScreen from './PreviewScreen';
import Header from "./Header";
import Empty from "./Empty";
import { Link } from 'react-router-dom';
import { Wrap, WrapItem, Box, Image, Select, Button, Container, Alert, AlertIcon, AlertDialog, AlertDialogOverlay, AlertDialogBody, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, Heading, Flex, Text } from '@chakra-ui/react'
import { Input, Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalFooter, ModalCloseButton } from "@chakra-ui/react";

function BrowseItem() {
    const [infoScreen, setInfoScreen] = useState(false);
    const [createScreen, setCreateScreen] = useState(false);
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const account = {id: "dominicomendes@gmail.com"};
    window.addEventListener('load', async function() {
        loadItems();
        console.log("Items", items)
    });

    const deleteItem = async () => {
        try {
            const res = await fetch(`https://2teflbiarsoaanuis6xjnfe5wu0dgidd.lambda-url.ca-central-1.on.aws/?account_id=${account.id}&item_id=${itemToDelete.item_id}`, {
                method: 'DELETE'
            });
            
            if (res.status === 200) {
                console.log("Item deleted successfully");
            } else {
                console.error("Failed to delete item");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    }

    const deleteItemFromOutfits = async () => {
        try {
            const res = await fetch(`https://kvfmhv3dmza23osqcbabj5ot5u0kqpge.lambda-url.ca-central-1.on.aws/?account_id=${account.id}&item_id=${itemToDelete.item_id}&type=${itemToDelete.type}`, {
                method: 'PATCH'
            });
            
            if (res.status === 200) {
                console.log("Item deleted successfully");
            } else {
                console.error("Failed to delete item");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    }

    const deleteOutfit = async () => {
        try {
            const res = await fetch(`https://j2cm3y3o3efo7xntsl3chff2nq0katdt.lambda-url.ca-central-1.on.aws/?account_id=${account.id}&outfit_id=OUTFIT_TO_DELETE`, {
                method: 'DELETE'
            });
            
            if (res.status === 200) {
                console.log("Outfit deleted successfully");
            } else {
                console.error("Failed to delete outfit");
            }
        } catch (error) {
            console.error("Error deleting outfit:", error);
        }
    }
    

    const loadItems = async () => {
        const res = await fetch(`https://7o4pxu4wej3eeeplakb7ywge5y0laqdz.lambda-url.ca-central-1.on.aws/?account_id=${account.id}`);
        if (res.status === 200) {
            const data = await res.json();
            setItems(data);
            setFilteredItems(data);
            // console.log("Items", items)
        }
    }

    // const saveItems = async () => {
    //     const res = await fetch(`https://io3w4px7cobuhvme5oo3ce53ra0tccxl.lambda-url.ca-central-1.on.aws/?);
    //     if (res.status === 200) {
    //         const data = await res.json();
    //         setItems(data);
    //         // console.log("Items", items)
    //     }
    // }
    const saveItems = async () => {
        // const data = JSON.stringify ({
        //     type:
        // })
        const res = await fetch(`https://io3w4px7cobuhvme5oo3ce53ra0tccxl.lambda-url.ca-central-1.on.aws/`,
            {
                method: 'POST',
                body: JSON.stringify(formValues)
            }
        );
    }

    // CHECK WITH ELLA
    // useEffect(() => {
    //     loadItems();
    // }, [account.id, loadItems]);


    const createOn = () => {
        setCreateScreen(true);
    }

    const createOff = () => {
        setCreateScreen(false);
    }

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const openOverlay = () => {
        setIsOverlayOpen(true);
    };

    const closeOverlay = () => {
        setIsOverlayOpen(false);
    };

    const colourOptions = {
        "colour1": "Red",
        "colour2": "Orange",
        "colour3": "Yellow",
        "colour4": "Green",
        "colour5": "Blue",
        "colour6": "Purple",
        "colour7": "Pink",
    };
    
    const styleOptions = {
        "style1": "Casual",
        "style2": "Formal",
        "style3": "Athletic",
    };    

    const typeOptions = {
        "type1": "Top",
        "type2": "Bottom",
        "type3": "Dress",
        "type4": "Outerwear",
        "type5": "Accessory",
        "type6": "Shoe",
        "type7": "Hat",
        "type8": "Bag",
    };

    const [selectedItem, setSelectedItem] = useState(null);


    function handleSelectChange(event) {
        const { name, value } = event.target;
        setFormValues(prevState => ({ ...prevState, [name]: value }));
        if (value !== 'Select') {
            setIsFormValid(prevState => ({ ...prevState, [name]: true }));
        } else {
            setIsFormValid(prevState => ({ ...prevState, [name]: false }));
        }
    }
    const [showNotification, setShowNotification] = useState(false);
    const [formValues, setFormValues] = useState({image_url: "https://res.cloudinary.com/dnowxhqec/image/upload/v1682492349/kk7vsxzvrtwszyjytpml.jpg"});
    const [isFormValid, setIsFormValid] = useState({ image_url: false, type: true, colour: true, style: true });

    async function handleForm(event) {
        event.preventDefault();
        if (!formValues.colour || !formValues.style || !formValues.type || !formValues.image_url) {
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false); // Hide notification after 3 seconds
            }, 3000); // 3000 milliseconds = 3 seconds
            return;
        }
    
        const formData = new FormData(event.target);
        const values = Object.fromEntries(formData.entries());
        setFormValues({
            image_url: "https://res.cloudinary.com/dnowxhqec/image/upload/v1682492349/kk7vsxzvrtwszyjytpml.jpg",
            type: typeOptions[values.type],
            colour: colourOptions[values.colour],
            style: styleOptions[values.style]
        });
        console.log("Form Values:", values);
        saveItems();
        
    }
    const [searchQuery, setSearchQuery] = useState('');
    // const [filteredItems, setFilteredItems] = useState([]);
    const [colorFilter, setColorFilter] = useState('');
    const [styleFilter, setStyleFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [classFilter, setClassFilter] = useState('');

    

    
    const handleColorFilterChange = (event) => {
        setColorFilter(event.target.value);
    };

    const handleStyleFilterChange = (event) => {
        setStyleFilter(event.target.value);
    };
    
    const handleClassFilterChange = (event) => {
        setClassFilter(event.target.value);
    };

    const handleTypeFilterChange = (event) => {
        setTypeFilter(event.target.value);
    };

    

    const filterItems = () => {
        // let filtered = outfits.filter(outfit =>
            // outfit.items.some(item => {
               
            //     // return item.color.toLowerCase().includes(colorFilter.toLowerCase()) &&
            //     // item.style.toLowerCase().includes(styleFilter.toLowerCase()) 
                
            //     // const colorMatch = item.color.toLowerCase().includes(colorFilter.toLowerCase());
            //     // const styleMatch = item.style.toLowerCase().includes(styleFilter.toLowerCase());
            //     // const classMatch = classFilter === '' || (classFilter === 'Wishlist' && item.classification.toLowerCase() === 'wishlist') || (classFilter === 'ClosetOnly' && item.classification.toLowerCase() === 'closet');
            //     // return colorMatch && styleMatch && classMatch;
            // }
            // )

            
        // );


        let filtered = items;

        // if (classFilter === 'ClosetOnly') {
        //     filtered = filtered.filter(outfit =>
        //         !outfit.items.some(item =>
        //             item.classification.toLowerCase() === 'wishlist'
        //         )
        //     );
        // } 
        
        // if (classFilter === 'Wishlist') {
        //     filtered = filtered.filter(outfit =>
        //         outfit.items.some(item =>
        //             item.classification.toLowerCase() === 'wishlist'
        //         )
        //     );
        // }


        

        if (colorFilter.trim() !== '') {
            filtered = filtered.filter(item =>
                item.colour.toLowerCase() === colorFilter.toLowerCase() ||
                (item.colour.toLowerCase() === colorFilter.toLowerCase()) ||
                (item["colour"].toLowerCase() === colorFilter.toLowerCase())
            );
        }

        if (styleFilter.trim() !== '') {
            filtered = filtered.filter(item =>
                item.style.toLowerCase() === styleFilter.toLowerCase() ||
                (item.style.toLowerCase() === styleFilter.toLowerCase()) ||
                (item["style"].toLowerCase() === styleFilter.toLowerCase())
            );
        }

        if (typeFilter.trim() !== '') {
            filtered = filtered.filter(item =>
                item.type.toLowerCase() === typeFilter.toLowerCase() ||
                (item.style.toLowerCase() === typeFilter.toLowerCase()) ||
                (item["type"].toLowerCase() === typeFilter.toLowerCase())
            );
        }

        setFilteredItems(filtered);
    };
    
    useEffect(() => {
        setFilteredItems(items);
    }, []);

    const handleDeleteItem = (event) => {
        // console.log(itemToDelete.item_id);
        deleteItem();
        deleteItemFromOutfits();
        deleteOutfit();
        // window.location.reload();
    }

    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleDeleteConfirmationOpen = (item) => {
        setItemToDelete(item);
        setIsDeleteConfirmationOpen(true);
    };

    const handleDeleteConfirmationClose = () => {
        setItemToDelete(null);
        setIsDeleteConfirmationOpen(false);
    };


    const [itemDeletedNotification, setItemDeletedNotification] = useState(false);

    const cancelRef = useRef();

    const deleteItemNotification = () => {
        console.log("Your item has been deleted!");
        setItemDeletedNotification(true);
        setTimeout(() => {
            setItemDeletedNotification(false);
        }, 3000);
    };

    const renderModalContent = () => {
        if (!selectedItem) return null;
    
        return (
            <>
                <Modal isOpen={selectedItem !== null} onClose={() => setSelectedItem(null)} size="xl" centerContent>
                    <ModalOverlay />
                    <ModalContent>

                        <ModalHeader bg="white"/>
                        <ModalCloseButton />
                        <ModalBody>
                            <Wrap justify="center" spacing={4}>
                            <Flex direction="column" alignItems="center">
                                <WrapItem>
                                    <Image src={selectedItem.image_url} alt={`Item ${selectedItem.item_id}`} width="auto" height="300px" mb={4} />
                                </WrapItem>
                                <WrapItem>
                                    <Text fontSize="xl" fontWeight="bold">Type:</Text>
                                    <Text fontSize="xl" ml={1}>{selectedItem.type}</Text>
                                </WrapItem>
                                <WrapItem>
                                    <Text fontSize="xl" fontWeight="bold">Colour:</Text>
                                    <Text fontSize="xl" ml={1}>{selectedItem.colour}</Text>
                                </WrapItem>
                                <WrapItem>
                                    <Text fontSize="xl" fontWeight="bold">Style:</Text>
                                    <Text fontSize="xl" ml={1}>{selectedItem.style}</Text>
                                </WrapItem>
                            </Flex>


                                
                            </Wrap>
                        </ModalBody>
                        <ModalFooter bg="white">
                            <Flex justify="center" width="100%">
                                <Flex justify="center" width="45%">
                                    {/* Add buttons for actions like edit and delete */}
                                    <Button colorScheme="red" onClick={() => handleDeleteConfirmationOpen(selectedItem)}>
                                        Delete Item
                                    </Button>
                                </Flex>
                                {/* <Button colorScheme="blue" onClick={() => setSelectedItem(null)}>
                                    Close
                                </Button> */}
                            </Flex>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <AlertDialog
                    isOpen={isDeleteConfirmationOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={handleDeleteConfirmationClose}
                >
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                        <AlertDialogHeader>Delete Item</AlertDialogHeader>
                        <AlertDialogBody bg="rgb(40,44,52)" textColor="white">
                            Are you sure you want to delete this item?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={handleDeleteConfirmationClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={() => {
                                deleteItemNotification();
                                handleDeleteItem(itemToDelete);
                                setIsDeleteConfirmationOpen(false);
                                setSelectedItem(null);
                            }} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </>
            
        );
    };
    
    

    return (
        <div>
            <Header />
            {itemDeletedNotification && (
                <Alert status="success" >
                    <AlertIcon />
                    Your item has been deleted successfully !
                </Alert>
            )}
            {/* <Button
                mt={4}
                colorScheme='teal'
                onClick={() => {
                    createOn();
                    openOverlay();
                }}
            >
                Upload Item +
            </Button> */}
            
            {!infoScreen && !createScreen && (
                // <Container mb={4}>
                //     <Flex direction="column" alignItems="center" mt={4}>
                //         <Heading as='h3' size='lg' mb={4}>Browse your items here!</Heading>
                //         {items.map((item, index) => (
                //             <Image key={index} src={item.image_url} alt={`Item ${index}`} />
                //         ))}
                //     </Flex>
                // </Container>
                <Box p={4}>
                    {/* <Heading as='h3' size='lg' mb={4}>Search here!</Heading> */}
                    <Flex>
                        <Select onChange={handleTypeFilterChange} value={typeFilter} mr={2}>
                            <option value="">All Types</option>
                            <option value="Top">Top</option>
                            <option value="Bottom">Bottom</option>
                            <option value="Dress">Dress</option>
                            <option value="Outerwear">Outerwear</option>
                            <option value="Accessory">Accessory</option>
                            <option value="Shoe">Shoe</option>
                            <option value="Hat">Hat</option>
                            <option value="Bag">Bag</option>
                        </Select>
                        <Select onChange={handleColorFilterChange} value={colorFilter} mr={2}>
                            <option value="">All Colors</option>
                            <option value="Red">Red</option>
                            <option value="Orange">Orange</option>
                            <option value="Yellow">Yellow</option>
                            <option value="Green">Green</option>
                            <option value="Blue">Blue</option>
                            <option value="Purple">Purple</option>
                            <option value="Pink">Pink</option>
                            <option value="Brown">Brown</option>
                            <option value="Black">Black</option>
                            <option value="Grey">Grey</option>
                            <option value="White">White</option>
                            <option value="Multicolour">Multicolour</option>
                        </Select>
                        <Select onChange={handleStyleFilterChange} value={styleFilter} mr={2}>
                            <option value="">All Styles</option>
                            <option value="Casual">Casual</option>
                            <option value="Formal">Formal</option>
                            <option value="Sporty">Sporty</option>
                        </Select>
                        {/* <Select onChange={handleClassFilterChange} value={classFilter} mr={2}>
                            <option value="">All Items</option>
                            <option value="Wishlist">Contains Wishlist Items</option>
                            <option value="ClosetOnly">Contains Closet Items</option>
                        </Select> */}
                        <Button onClick={filterItems} fontSize="sm" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" width="400px">Apply Filters</Button>
                    </Flex>

                    {/* <Wrap mt={4} spacing={4}>
                        {filteredItems.map((item, index) => (
                            <WrapItem key={index}>
                                <Flex direction="row">
                                    <Image key={item.item_id} src={item.image_url} alt={`Item ${item.item_id}`} width="100px" height="100px" mb={2} />
                                </Flex>
                            </WrapItem>
                        ))}
                    </Wrap> */}
                    <Wrap mt={4} spacing={4}>
                        {filteredItems.map((item, index) => (
                            <WrapItem key={index}>
                                <Flex direction="row">
                                    <Image
                                        key={item.item_id}
                                        src={item.image_url}
                                        alt={`Item ${item.item_id}`}
                                        width="auto"
                                        height="200px"
                                        mb={2}
                                        onClick={() => setSelectedItem(item)}
                                    />
                                </Flex>
                            </WrapItem>
                        ))}
                    </Wrap>
                    <Flex
                        justifyContent="center"
                        alignItems="center"
                        position="fixed"
                        bottom="0"
                        left="0"
                        // right="8"
                        width="100%"
                        bg="gray.200"
                        px={0}
                        py={2}
                    >
                        <Link to="/UploadItem">
                            <Button fontSize="sm" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" width="100%">Upload an item</Button>
                        </Link>
                    </Flex>

                </Box>
                    
                // <Empty/>
            )}
            {createScreen && (
                <Container mb={4}>
                    <Modal isOpen={isOverlayOpen} onClose={closeOverlay} size="lg" isCentered>
                        <ModalOverlay />
                        {/* <ModalContent bg="rgba(100, 255, 255, 0.5)"> */}
                        <ModalContent bg="white">
                            {/* <ModalBody>
                                <Container mb={4}>
                                    <Flex direction="column" alignItems="center" mt={4}>
                                        <Heading as='h3' size='lg' mb={4} color="white">Upload your clothing here!</Heading>
                                    </Flex>
                                </Container>
                                
                            </ModalBody> */}
                            {/* <ModalHeader bg="rgba(0, 0, 0, 0.5)">Modal Title</ModalHeader> */}
                            <Flex direction="column" alignItems="center" mt={4}>
                                <Heading as='h3' size='lg' mb={4}>Upload your clothing here!</Heading>
                            </Flex>

                            <ModalCloseButton/>
                            <ModalBody>
                                <Flex direction="column" alignItems="center" mt={4}>
                                    {/* <Button mt={4} colorScheme="teal" ></Button> */}
                                    <form onSubmit={handleForm}>
                                    <Text size='sm'>Select a photo</Text>
                                        <Input
                                            placeholder="Select Image"
                                            size="sm"
                                            type="file"
                                            accept="image/*"
                                            width="400px"
                                            style={{ textAlign: "center" }}
                                            mb={2}
                                            onChange={(e) => {
                                                setFormValues(prevState => ({
                                                    ...prevState,
                                                    image_url: e.target.files[0]
                                                }));
                                            }}
                                        />
                                        <Text size='sm'>Select a type</Text>
                                        <Select placeholder='Select Type' name="type" onChange={handleSelectChange} mb={2}>
                                            {Object.keys(typeOptions).map((key) => (
                                                <option key={key} value={key}>{typeOptions[key]}</option>
                                            ))}
                                        </Select>
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
                                            mb={8}
                                            colorScheme='teal'
                                            type='submit'
                                            disabled={!isFormValid.colour || !isFormValid.style || !isFormValid.type || !isFormValid.image_url}
                                        >
                                            Submit
                                        </Button>
                                    </form>
                                    {showNotification && (
                                        <Alert status="warning" mt={4}>
                                            <AlertIcon />
                                            Please make selections for image, type, colour, and style.
                                        </Alert>
                                    )}
                                </Flex>
                                
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </Container>
                
            )}
            {renderModalContent()}
            {/* <Modal isOpen={selectedItem !== null} onClose={() => setSelectedItem(null)} size="lg" isCentered>
                <ModalOverlay />
                <ModalContent bg="white">
                    <ModalCloseButton/>
                    <ModalBody>
                        {selectedItem && (
                            <Flex direction="column" alignItems="center">
                                <Image src={selectedItem.image_url} alt={`Item ${selectedItem.item_id}`} width="300px" height="300px" />
                                
                            </Flex>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal> */}
            {/* <footer style={{ position: "fixed", bottom: "0", width: "100%", padding: "10px 0", textAlign: "center" }}>
                <p>&copy; 2024 Dream Closet. All rights reserved.</p>
            </footer> */}
        </div>
    )
}

export default BrowseItem;
