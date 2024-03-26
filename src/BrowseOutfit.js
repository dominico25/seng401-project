import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import Navigation from './Navigation';
import Display from './Display';
import PreviewScreen from './PreviewScreen';
import Header from "./Header";
import { Select, Button, Container, Alert, AlertIcon, Heading, Flex, Text, Box, Input, Wrap, WrapItem, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'

function convertToOutfitsArray(outputArray) {
    const outfitsArray = outputArray.map(outfit => ({
        name: outfit.name,
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
    // const [outfitsArray, setOutfitsArray] = useState([]);
    const [outfitNames, setOutfitNames] = useState([]);
    const [outfitItemIds, setOutfitItemIds] = useState({});

    // const outfits = [
    //     {
    //         name: 'Beachy Hot Pants',
    //         items: [
    //             { id: 1, imageUrl: 'https://i.pinimg.com/474x/54/0d/b4/540db4337b968800f2abab1897d8618d.jpg', color: 'White', style: 'Formal', classification: 'WishList' },
    //             { id: 2, imageUrl: 'https://i.pinimg.com/474x/a6/02/3c/a6023c90d73a250117efb65de5f435bd.jpg', color: 'Blue', style: 'Casual', classification: 'Closet' },
    //             // Add more items for the first outfit
    //         ]
    //     },
    //     {
    //         name: 'Classy Knitwear',
    //         items: [
    //             { id: 3, imageUrl: 'https://i.pinimg.com/474x/38/4b/a3/384ba3b411f15765936ae65e6ab98c55.jpg', color: 'Multicolour', style: 'Casual', classification: 'Closet' },
    //             { id: 4, imageUrl: 'https://i.pinimg.com/474x/e7/e2/1f/e7e21f5a38a4e7efd4efeaebafa0470e.jpg', color: 'Black', style: 'Formal', classification: 'Closet' },
    //             { id: 5, imageUrl: 'https://i.pinimg.com/474x/47/0b/d2/470bd287288ca28997e298004666d972.jpg', color: 'Pink', style: 'Casual', classification: 'Closet' },
    //             // Add more items for the second outfit
    //         ]
    //     },
    //     {
    //         name: 'Classy Knitwear',
    //         items: [
    //             { id: 3, imageUrl: 'https://i.pinimg.com/474x/38/4b/a3/384ba3b411f15765936ae65e6ab98c55.jpg', color: 'Multicolour', style: 'Casual', classification: 'Closet' },
    //             { id: 4, imageUrl: 'https://i.pinimg.com/474x/e7/e2/1f/e7e21f5a38a4e7efd4efeaebafa0470e.jpg', color: 'Black', style: 'Formal', classification: 'Closet' },
    //             { id: 5, imageUrl: 'https://i.pinimg.com/474x/47/0b/d2/470bd287288ca28997e298004666d972.jpg', color: 'Pink', style: 'Casual', classification: 'Closet' },
    //             // Add more items for the second outfit
    //         ]
    //     },
    //     {
    //         name: 'Classy Knitwear',
    //         items: [
    //             { id: 3, imageUrl: 'https://i.pinimg.com/474x/38/4b/a3/384ba3b411f15765936ae65e6ab98c55.jpg', color: 'Multicolour', style: 'Casual', classification: 'Closet' },
    //             { id: 4, imageUrl: 'https://i.pinimg.com/474x/e7/e2/1f/e7e21f5a38a4e7efd4efeaebafa0470e.jpg', color: 'Black', style: 'Formal', classification: 'Closet' },
    //             { id: 5, imageUrl: 'https://i.pinimg.com/474x/47/0b/d2/470bd287288ca28997e298004666d972.jpg', color: 'Pink', style: 'Casual', classification: 'Closet' },
    //             // Add more items for the second outfit
    //         ]
    //     },
    //     {
    //         name: 'Classy Knitwear',
    //         items: [
    //             { id: 3, imageUrl: 'https://i.pinimg.com/474x/38/4b/a3/384ba3b411f15765936ae65e6ab98c55.jpg', color: 'Multicolour', style: 'Casual', classification: 'Closet' },
    //             { id: 4, imageUrl: 'https://i.pinimg.com/474x/e7/e2/1f/e7e21f5a38a4e7efd4efeaebafa0470e.jpg', color: 'Black', style: 'Formal', classification: 'Closet' },
    //             { id: 5, imageUrl: 'https://i.pinimg.com/474x/47/0b/d2/470bd287288ca28997e298004666d972.jpg', color: 'Pink', style: 'Casual', classification: 'Closet' },
    //             // Add more items for the second outfit
    //         ]
    //     },
    //     {
    //         name: 'White Tank Ties',
    //         items: [
    //             { id: 6, imageUrl: 'https://i.pinimg.com/474x/a7/6c/f2/a76cf27eb4392978c2b4df6922f08743.jpg', color: 'Multicolour', style: 'Casual', classification: 'Closet' },
    //             { id: 7, imageUrl: 'https://i.pinimg.com/474x/7a/a8/44/7aa8446be17039b8cbba7502e81f1bed.jpg', color: 'White', style: 'Casual', classification: 'Closet' },
    //             { id: 8, imageUrl: 'https://i.pinimg.com/474x/67/31/b4/6731b45d7d44539240f3a625b46e1fde.jpg', color: 'White', style: 'Casual', classification: 'WishList' },
    //             { id: 9, imageUrl: 'https://i.pinimg.com/474x/4c/46/a2/4c46a2420c8f800b9c6fc41a79f47f4c.jpg', color: 'Black', style: 'Formal', classification: 'Closet' },
    //             // Add more items for the second outfit
    //         ]
    //     },
    //     {
    //         name: 'Wacko Green',
    //         items: [
    //             { id: 10, imageUrl: 'https://i.pinimg.com/474x/e6/66/6f/e6666f7c7e74ebfd6f4b5267351fb502.jpg', color: 'White', style: 'Casual', classification: 'Closet' },
    //             { id: 11, imageUrl: 'https://i.pinimg.com/474x/5f/ba/75/5fba759791a91338944b8fdf0142730e.jpg', color: 'Multicolour', style: 'Formal', classification: 'Closet' },
    //             { id: 12, imageUrl: 'https://i.pinimg.com/474x/ad/c5/75/adc575e83d72212c2f6f16d9a7762788.jpg', color: 'White', style: 'Casual', classification: 'Closet' },
    //             { id: 13, imageUrl: 'https://i.pinimg.com/474x/3b/28/db/3b28db1b2198fe8db4bc93bd8ee25343.jpg', color: 'Multicolour', style: 'Casual', classification: 'Closet' },
    //             { id: 14, imageUrl: 'https://i.pinimg.com/474x/ac/5c/77/ac5c777b3909a97f73f7d290f7be672d.jpg', color: 'Green', style: 'Casual', classification: 'Closet' },
    //             { id: 15, imageUrl: 'https://i.pinimg.com/474x/3a/80/6c/3a806c2e7fa5f0d3f608cb1d0300d3f2.jpg', color: 'Multicolour', style: 'Sporty', classification: 'Closet' },
    //             // Add more items for the second outfit
    //         ]
    //     },
    //     // Add more outfits as needed
    // ];

    
    
    const account = {id: "1"};

    const loadBaseOutfits = async () => {

        // ADD LOAD OUTFITS URL
        const res = await fetch(`https://2rqyzknhvf7ac75kp3b3gv52su0swfxf.lambda-url.ca-central-1.on.aws/?account_id=${account.id}`);
        if (res.status === 200) {
            const data = await res.json();
            setBaseOutfits(data);
        }
        
    }

    const loadOutfits = async () => {
        // ADD LOAD ITEM INFO URL
        const res = await fetch(`https://otlbpraskqdgdmwcbc6looqx7e0vdqgn.lambda-url.ca-central-1.on.aws/?input_array=${encodeURIComponent(JSON.stringify(baseOutfits))}`);
        if (res.status === 200) {
            const data = await res.json();
            
            console.log(data.output_array)
            const convertedOutfits = convertToOutfitsArray(data.output_array);
            console.log(convertedOutfits)
            setOutfits(convertedOutfits);
            // console.log(outfits)
        
        }

    }

    useEffect(() => {
        loadBaseOutfits();
        loadOutfits();
        console.log(outfits)
        setFilteredOutfits(outfits);
    }, [account.id]);


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
                console.log("Item color:", item.color);
                return item.color.toLowerCase().includes(colorFilter.toLowerCase());
            })
        );
    }

    if (styleFilter.trim() !== '') {
        filtered = filtered.filter(outfit =>
            outfit.items.some(item => {
                console.log("Item style:", item.style);
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
    };

    const renderModalContent = () => {
        if (!selectedOutfit) return null;

        const itemsPerRow = Math.floor((window.innerWidth - 100) / 200); // Adjust according to your needs

        return (
            <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl" centerContent>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selectedOutfit.name}</ModalHeader>
                    <ModalCloseButton />
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
                                <Button colorScheme="blue" onClick={handleCloseModal}>
                                    Delete Outfit
                                </Button>
                                <Button colorScheme="blue" onClick={handleCloseModal}>
                                    Edit Outfit
                                </Button>
                            </Flex>
                            <Button colorScheme="blue" onClick={handleCloseModal}>
                                Close
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        );
    };

    // async function handleForm(event) {
    //     loadBaseOutfits();
    // };
    

return (
    <Box p={4}>
        <Header />
            <h1>Search Page</h1>
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

            <Flex justifyContent="center" alignItems="center" position="fixed" bottom="0" width="100%" bg="gray.200" p={4}>
                <Link to="/GenerateOutfit">
                    <Button fontSize="sm" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" width="250px" mr={4}>Generate an Outfit for Me</Button>
                </Link>
                <Link to="/CreateOutfit">
                    <Button fontSize="sm" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" width="250px">Manually Create an Outfit</Button>
                </Link>
            </Flex>
            
        </Box>

    );
}


export default BrowseOutfit;