import { Link } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import React from "react";
import Navigation from './Navigation';
import Display from './Display';
import PreviewScreen from './PreviewScreen';
import Header from "./Header";

import { AccountContext } from "./AccountContext";
import { useAccount} from './AccountContext';
import { Select, Button, AlertDialog, AlertDialogOverlay, AlertDialogBody, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, Container, Alert, AlertIcon, Heading, Flex, Text, Box, Input, Wrap, WrapItem, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'

function convertToOutfitsArray(outputArray) {
    const outfitsArray = outputArray.map(outfit => ({
        name: outfit.name,
        id: outfit.outfit_id,
        items: Object.values(outfit).filter(value => typeof value === 'object').map(item => ({
            id: item.item_id,
            imageUrl: item.imageUrl,
            color: item.colour,
            style: item.style,
            classification: item.class
        }))
    }));

    return outfitsArray;
}



function BrowseOutfit() {
    
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOutfits, setFilteredOutfits] = useState([]);
    const [colorFilter, setColorFilter] = useState('');
    const [styleFilter, setStyleFilter] = useState('');
    const [classFilter, setClassFilter] = useState('');
    const [selectedOutfit, setSelectedOutfit] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [baseOutfits, setBaseOutfits] = useState([]);
    const [outfits, setOutfits] = useState([]);
    let { account } = useAccount();
    const [outfitToDelete, setOutfitToDelete] = useState('');

    // const [outfitsArray, setOutfitsArray] = useState([]);
    const [outfitNames, setOutfitNames] = useState([]);
    const [outfitItemIds, setOutfitItemIds] = useState({});
    const [accountLoaded, setAccountLoaded] = useState(false);
    useEffect(() => {
        // Load account from local storage upon component mount
        const storedAccount = localStorage.getItem('account');
        if (storedAccount) {
            setAccount(storedAccount);
            setAccountLoaded(true);
        }
    }, []); // Empty dependency array ensures it runs only once upon mounting

    useEffect(() => {
        if (accountLoaded) {
            // Functionality to execute upon account load
            loadBaseOutfits();
        }
    }, [accountLoaded]); 
    window.addEventListener('load', async function() {
        console.log("YOOOO", localStorage.getItem('account'))
        setAccount(localStorage.getItem('account'));
        account = localStorage.getItem('account');
        
        // setTimeout(() => {
        loadBaseOutfits();
        // loadOutfits();
        // setFilteredOutfits(outfits);
        // }, 3000);
        // console.log(outfits);
        // console.log(filteredOutfits);
        // console.log(baseOutfits);
        
    });



    const { setAccount } = useContext(AccountContext);
    const loadBaseOutfits = async () => {

        // ADD LOAD OUTFITS URL
        const res = await fetch(`https://ranx44bjnikmnawx5g5xdpzfuq0hzwxu.lambda-url.ca-central-1.on.aws/?account_id=${account}`);
        if (res.status === 200) {
            const data = await res.json();
            setBaseOutfits(data);
            // console.log(baseOutfits)
        }  
    }

    const loadOutfits = async () => {
        // ADD LOAD ITEM INFO URL

        const res = await fetch(`https://2kinw5ju2k7h6znpu27bzoqrcq0ctkwq.lambda-url.ca-central-1.on.aws/?input_array=${encodeURIComponent(JSON.stringify(baseOutfits))}`);
        if (res.status === 200) {
            const data = await res.json();
            
            // console.log(data.output_array)
            const convertedOutfits = convertToOutfitsArray(data.output_array);
            // console.log(convertedOutfits)
            setOutfits(convertedOutfits);
            // console.log(outfits)
        
        }

    }

    const deleteOutfit = async () => {
        try {
            const res = await fetch(`https://qzwwpldz3dggiytylo75a63cqy0ocnpe.lambda-url.ca-central-1.on.aws/?account_id=${account}&outfit_id=${outfitToDelete}`, {
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



    // useEffect(() => {
    //     loadBaseOutfits();
    // }, [account]);

    useEffect(() => {
        loadOutfits();
    }, [baseOutfits]);

    useEffect(() => {
        setFilteredOutfits(outfits);
    }, [outfits]);
    // window.addEventListener('load', async function() {
    //     loadBaseOutfits();
    //     loadOutfits();
    //     console.log(outfits)
    //     setFilteredOutfits(outfits);
    // });


    

    // Filter outfits based on search query, color, and style
const filterOutfits = () => {
    
    let filtered = outfits;

    console.log("Initial filtered:", filtered);

    if (classFilter === 'ClosetOnly') {
        filtered = filtered.filter(outfit =>
            !outfit.items.some(item =>
                item.classification.toLowerCase() === 'wishlist'
            )
        );
    } 
    
    if (classFilter === 'Wishlist') {
        filtered = filtered.filter(outfit =>
            outfit.items.some(item =>
                item.classification.toLowerCase() === 'wishlist'
            )
        );
    }

    if (colorFilter.trim() !== '') {
        filtered = filtered.filter(outfit =>
            outfit.items.some(item => {
                // console.log("Item color:", item.color);
                return item.color.toLowerCase().includes(colorFilter.toLowerCase());
            })
        );
    }

    if (styleFilter.trim() !== '') {
        filtered = filtered.filter(outfit =>
            outfit.items.some(item => {
                // console.log("Item style:", item.style);
                return item.style.toLowerCase().includes(styleFilter.toLowerCase());
            })
        );
    }

    if (searchQuery.trim() !== '') {
        filtered = filtered.filter(outfit =>
            outfit.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }


    console.log("Final filtered:", filtered);

    setFilteredOutfits(filtered);
};

    // // Filter outfits based on search query, color, and style
    // const filterOutfits = () => {
        
    //     let filtered = outfits;

    //     if (classFilter === 'ClosetOnly') {
    //         filtered = filtered.filter(outfit =>
    //             !outfit.items.some(item =>
    //                 item.classification.toLowerCase() === 'wishlist'
    //             )
    //         );
    //     } 
        
    //     if (classFilter === 'Wishlist') {
    //         filtered = filtered.filter(outfit =>
    //             outfit.items.some(item =>
    //                 item.classification.toLowerCase() === 'wishlist'
    //             )
    //         );
    //     }

    //     if (colorFilter.trim() !== '') {
    //         filtered = filtered.filter(outfit =>
    //             outfit.items.some(item =>
    //                 item.color.toLowerCase().includes(colorFilter.toLowerCase())
    //             )
    //         );
    //     }

    //     if (styleFilter.trim() !== '') {
    //         filtered = filtered.filter(outfit =>
    //             outfit.items.some(item =>
    //                 item.style.toLowerCase().includes(styleFilter.toLowerCase())
    //             )
    //         );
    //     }

    //     if (searchQuery.trim() !== '') {
    //         filtered = filtered.filter(outfit =>
    //             outfit.name.toLowerCase().includes(searchQuery.toLowerCase())
    //         );
    //     }

    //     setFilteredOutfits(filtered);
    // };

    // Handle search query change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Handle color filter change
    const handleColorFilterChange = (event) => {
        setColorFilter(event.target.value);
    };

    // Handle style filter change
    const handleStyleFilterChange = (event) => {
        setStyleFilter(event.target.value);
    };

    // Handle class filter change
    const handleClassFilterChange = (event) => {
        setClassFilter(event.target.value);
    };

    // Handle Enter key press in search input
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            filterOutfits();
        }
    };

    const handleOutfitClick = (outfit) => {
        setSelectedOutfit(outfit);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setSelectedOutfit(null);
        setOutfitToDelete('');
    };


    const handleDeleteOutfit = () => {
        // try{
        //     // setOutfitToDelete(selectedOutfit.id);
        //     setTimeout(() => {
        //     }, 1000);
        //     // console.log("IDDDDDDD", selectedOutfit.id)
        //     // console.log(outfitToDelete)
        //     // console.log(selectedOutfit)
        //     // console.log(selectedOutfit.id)
        //     deleteOutfit();
        //     handleCloseModal();
        // } catch (error) {
        //     console.error("Error deleting outfit:", error);
        // }
        deleteOutfit();
        handleCloseModal();
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    const handleDeleteConfirmationOpen = (outfit) => {
        setOutfitToDelete(outfit.id);
        setIsDeleteConfirmationOpen(true);
    };

    const handleDeleteConfirmationClose = () => {
        setOutfitToDelete('');
        setIsDeleteConfirmationOpen(false);
    };

    const renderModalContent = () => {
        if (!selectedOutfit) return null;

        const itemsPerRow = Math.floor((window.innerWidth - 100) / 200); // Adjust according to your needs

        return (
            <>
                <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl" centerContent>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{selectedOutfit.name}</ModalHeader>
                        <ModalCloseButton onClick={handleCloseModal}/>
                        <ModalBody>
                            <Wrap justify="center" spacing={4}>
                                {selectedOutfit.items.map(item => (
                                    <WrapItem key={item.id} width={`${100 / itemsPerRow}%`} display="flex" justifyContent="center" alignItems="center">
                                        
                                        <Image src={item.imageUrl} alt={`Item ${item.id}`} width="auto" height="auto" maxHeight="500px" mb={4} />
                                    </WrapItem>
                                ))}
                            </Wrap>
                        </ModalBody>
                        <ModalFooter>
                            <Flex justify="space-between" width="100%">
                                <Flex justify="space-between" width="45%">
                                    {/* <Button colorScheme="blue" onClick={handleDeleteOutfit}> */}
                                    <Button colorScheme="blue" onClick={() => handleDeleteConfirmationOpen(selectedOutfit)}>
                                        Delete Outfit
                                    </Button>
            
                                </Flex>
                                <Button colorScheme="blue" onClick={handleCloseModal}>
                                    Close
                                </Button>
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
                        <AlertDialogHeader>Delete Outfit</AlertDialogHeader>
                        <AlertDialogBody bg="rgb(40,44,52)" textColor="white">
                            Are you sure you want to delete this outfit?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={handleDeleteConfirmationClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={() => {
                                deleteOutfitNotification();
                                handleDeleteOutfit();
                                setIsDeleteConfirmationOpen(false);
                                setSelectedOutfit(null);
                            }} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </>
        );
    };
    const [outfitDeletedNotification, setOutfitDeletedNotification] = useState(false);
    const deleteOutfitNotification = () => {
        console.log("Your item has been deleted!");
        setOutfitDeletedNotification(true);
        setTimeout(() => {
            setOutfitDeletedNotification(false);
        }, 3000);
    };
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const cancelRef = useRef();
    // async function handleForm(event) {
    //     loadBaseOutfits();
    // };
    

return (
    <>
        <Header />
            {outfitDeletedNotification && (
                <Alert status="success" >
                    <AlertIcon />
                    Your outfit has been deleted successfully !
                </Alert>
            )}
        <Box p={4}>
            <Input
                placeholder="Search by Outfit Name"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyPress} // Add event handler for key press
                mb={2}
            />
            <Flex>
                <Select onChange={handleColorFilterChange} value={colorFilter} mr={2}>
                    <option value="">All Colours</option>
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
                    {/* Add more color options */}
                </Select>
                <Select onChange={handleStyleFilterChange} value={styleFilter} mr={2}>
                    <option value="">All Styles</option>
                    <option value="Casual">Casual</option>
                    <option value="Formal">Formal</option>
                    <option value="Sporty">Sporty</option>
                    {/* Add more style options */}
                </Select>
                <Select onChange={handleClassFilterChange} value={classFilter} mr={2}>
                    <option value="">All Items</option>
                    <option value="Wishlist">Contains Wishlist Items</option>
                    <option value="ClosetOnly">Contains Closet Items</option>
                    {/* Add more style options */}
                </Select>
                <Button onClick={filterOutfits} fontSize="sm" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" width="250px">Apply Filters</Button>
            </Flex>

            <Wrap mt={4} spacing={4}>
                {filteredOutfits.map((outfit, index) => (
                    <WrapItem key={index}>
                        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg="gray.100" mb={4} cursor="pointer"
                            onClick={() => handleOutfitClick(outfit)} _hover={{
                                borderWidth: "2px",
                                borderColor: "gray.500",
                            }}>
                            <Heading as="h3" size="md" mb={2}>{outfit.name}</Heading>
                            <Flex>
                                {outfit.items.map(item => (
                                    <Image key={item.id} src={item.imageUrl} alt={`Item ${item.id}`} width="auto" height="100px" mb={2} mr={2} />
                                ))}
                            </Flex>
                        </Box>
                    </WrapItem>
                ))}
            </Wrap>

            {renderModalContent()}
            </Box>
            <Flex justifyContent="center" alignItems="center" position="fixed" bottom="0" width="100%" bg="gray.200" p={4}>
                <Link to="/GenerateOutfit">
                    <Button fontSize="sm" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" width="250px" mr={4}>Generate an Outfit for Me</Button>
                </Link>
                <Link to="/CreateOutfit">
                    <Button fontSize="sm" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" width="250px">Manually Create an Outfit</Button>
                </Link>
            </Flex>
            
        </>

    );
}


export default BrowseOutfit;
