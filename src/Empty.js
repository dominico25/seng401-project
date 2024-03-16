import { Select, Button, Container, Alert, AlertIcon, Heading, Flex, Text } from '@chakra-ui/react'

function Empty() {
    return (
        <Container mb={4}>
            <Heading as='h3' size='md' mb={4}>No Items Yet. Use the upload button in the top right corner.</Heading>
        </Container>
    )
}
  
export default Empty;