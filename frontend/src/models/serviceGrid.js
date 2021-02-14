import React from 'react';
import {useState, useEffect} from 'react' 
import {Grid, GridItem, Box, Text, Button, Skeleton} from "@chakra-ui/react"

const ServiceGrid = (props) => {
  const [showGridSkeleton, setShowGridSkeleton] = useState(false)

  const showGridSkeletonOnLoad = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setShowGridSkeleton(true)
        resolve();
      }, 2000);
    });
  }

  useEffect(showGridSkeletonOnLoad, [])
  
  return (
    <Skeleton isLoaded = {showGridSkeleton}>
    <Box w = '100%' mt={5} overflow = "hidden">
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap');
    </style>
      <Grid
        h={[10,12,14,14]}
        templateColumns="repeat(12, 1fr)"
        gap={[2,2,3,3]}
        >
            <GridItem 
                pl = "5px" 
                pt="3px"
                rounded = "10px" 
                colSpan={[ 9, 9, 9, 9]}
                boxShadow = "sm"
                _hover={{ bg: "#ebedf0" }} 
                bg = 'gray.200'>
                    <Text 
                    fontFamily = "Inter" 
                    fontWeight = "extrabold" 
                    bgGradient={props.bgGradient}
                    bgClip = "text" fontSize = {[23, 28, 32, 33]}>
                        {props.name}</Text>
            </GridItem>
            <GridItem rounded = "10px" colSpan={[ 3, 3, 3, 3]}>
                <Button
                  onClick={(e) => {
                  e.preventDefault();
                  window.location.href = props.serviceLink
                  }}
                    _hover={{ bg: "#ebedf0"}}
                    fontSize = {[15,20,21,21]} 
                    bg = "gray.200" h = "100%" w= "100%">Play</Button>
            </GridItem>
      </Grid> 
    </Box>
    </Skeleton>
  );
}

export default ServiceGrid;
