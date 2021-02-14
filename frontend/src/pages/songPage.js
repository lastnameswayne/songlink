import React from 'react';
import {useState, useEffect} from 'react' 
import axios from 'axios'
import ServiceGrid from '../models/serviceGrid'
import { Box, 
  ChakraProvider, 
  Image, 
  Center,
  Button, 
  Divider, 
  Skeleton, 
  Alert, 
  AlertIcon, 
  useDisclosure, 
  Fade} from "@chakra-ui/react"
import { LinkIcon } from '@chakra-ui/icons'
import { useParams } from 'react-router-dom'
import * as clipboard from "clipboard-polyfill/text";
require('dotenv').config()


const SongPage =(props) => {

  const [imgLink, setImgLink] = useState('')
  const [spotifyLink, setSpotifyLink] = useState('')
  const [soundCloudLink, setSoundCloudLink] = useState('')
  const [youtubeLink, setYoutubeLink] = useState('')
  const [appleMusicLink, setAppleMusicLink] = useState('')
  const [showSkeleton, setShowSkeleton] = useState(false)
  const { id } = useParams();
  const { isOpen, onToggle } = useDisclosure()

  const SPOTIFYGRADIENT = "linear(to-l, #1DB954,#1DB954)"
  const SCGRADIENT = "linear(to-l, #ff9940,#ff7700)"
  const YOUTUBEGRADIENT = "linear(to-l, #cc0000,#ff1a1a)"
  const APPLEMUSICGRADIENT = "linear(to-l, #b166cc,#69a6f9)"

  const currentUrl = process.env.REACT_APP_CURRENT_URL
  const url = process.env.REACT_APP_DB_URL

  console.log(currentUrl);
  console.log(url);

  function handler() {
    clipboard.writeText(currentUrl+'/song/'+id).then(
      () => {
        onToggle()
      },
      () => {
        console.log("error!");
      }
    );
  }

  const getAllSongs = () => {
    axios.get(url+id)
    .then(function (response) {
      console.log("values")
      let values = response.data[0].values[0]
      setImgLink(values.imglink)
      setSpotifyLink(values.spotify)
      setSoundCloudLink(values.soundCloud)
      setYoutubeLink(values.youtube)
      setAppleMusicLink(values.appleMusic)
            // handle success
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
  }

  const showSkeletonOnLoad = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setShowSkeleton(true)
        resolve();
      }, 1500);
    });
  }

  useEffect(() => {
    showSkeletonOnLoad()
    getAllSongs()
   }, [])


  const display = () => {
      return (
        <ChakraProvider>
          <Fade initialScale={0.9} in={isOpen}>
            <Alert status="success">
              <AlertIcon />
              Link copied!
            </Alert>
          </Fade>
          <Image style = {{
              display: "flex",
              position: "absolute", size: "cover",
              filter: "blur(22px)", 
              overflow: "hidden",
              width: '100vw',
              height: '100vh' }}
          src = {imgLink}>
          </Image>
          <Box
            style={{
            position: 'absolute', left: '50%',
            transform: 'translate(-50%)'
            }}
            m = {2} 
            p = "10px"  
            rounded = "20px" 
            boxShadow = 'lg'
            border = "1px" 
            borderColor = "gray.200" 
            w={[250, 300, 350, 380]}
            bg = 'white'
            >
              <Skeleton isLoaded = {showSkeleton} rounded = '10px'>
                <Image rounded = "10px" w = '100%' src = {imgLink}></Image>
              </Skeleton>
              <Divider mt = "20px"/>
              {spotifyLink === undefined ? '' :
                <ServiceGrid 
                name = "Spotify" 
                bgGradient = {SPOTIFYGRADIENT}
                serviceLink = {spotifyLink}>
                </ServiceGrid>
              }
              {soundCloudLink === undefined ? '' : 
                <ServiceGrid 
                name = "SoundCloud" 
                bgGradient = {SCGRADIENT}
                serviceLink = {soundCloudLink}>
                </ServiceGrid>
              }
              {youtubeLink === undefined ? '' : 
                <ServiceGrid 
                name = "Youtube" 
                bgGradient = 
                {YOUTUBEGRADIENT}
                serviceLink = {youtubeLink}>
                </ServiceGrid>
              }
              {appleMusicLink === undefined ? '' :
                <ServiceGrid 
                name = "Apple Music" 
                bgGradient = {APPLEMUSICGRADIENT}
                serviceLink = {appleMusicLink}>
                </ServiceGrid>}
              <Center>
              <Skeleton isLoaded = {showSkeleton} rounded = '10px'>
                <Button onClick = {handler} mt = {8}>Share! &nbsp;
                  <LinkIcon></LinkIcon>
                </Button>
                </Skeleton>
              </Center>
          </Box>
          </ChakraProvider> 
      );
  }

  return(
    <>
    {display(props)}
    </>
  )
}

export default SongPage;