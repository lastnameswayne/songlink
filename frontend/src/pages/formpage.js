import React from 'react';
import SongLinkForm from '../models/songLinkForm'
import { Box, Center, ChakraProvider, CSSReset } from "@chakra-ui/react"


const FormPage = () => {
    return (
        <ChakraProvider>
            <CSSReset />
            <Center>
                <Box width = '400px'>
                    <Center><SongLinkForm></SongLinkForm></Center>
                </Box>
            </Center>
        </ChakraProvider>
    )
}

export default FormPage