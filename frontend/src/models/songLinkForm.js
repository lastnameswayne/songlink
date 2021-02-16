import "@brainhubeu/react-file-input/dist/react-file-input.css";
import React from 'react';
import {useRef, useState } from "react";
import {
  Box, Button,
  Center, Checkbox,
  CheckboxGroup, FormControl, FormHelperText,
  FormLabel,
  Heading, HStack, Input
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const SongLinkForm = () => {
  let history = useHistory();
  let [id, setId] = useState("");
  let [imageUrl, setImageUrl] = useState("");
  const { handleSubmit, errors, register, formState } = useForm();
  let inputFile = useRef(null);
  let [fileName, setFileName] = useState("");

  const [isUploading, setIsUploading] = useState(false);
  const [showSpotifyForm, setShowSpotifyForm] = useState(false);
  const [showSoundcloudForm, setShowSoundcloudForm] = useState(false);
  const [showYoutubeForm, setShowYoutubeForm] = useState(false);
  const [showAppleMusicForm, setShowAppleMusicForm] = useState(false);

  const handleSubmitFile = (event, files) => {
    setIsUploading(true);
    let selectedFile = files[0];
    if (!selectedFile) return console.log("error");
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("error");
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    //couldn't get axios to work so used fetch
    await fetch("http://localhost:5000/songs/image", {
      method: "POST",
      body: JSON.stringify({ data: base64EncodedImage }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data);
        setIsUploading(false);

        // handle success
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  async function onSubmit(values, actions) {
    axios({
      method: "POST",
      url: "http://localhost:5000/songs/add",
      data: { values: values },
    })
      .then(() => history.push({ pathname: `/song/${id}`, state: { id: id } }))
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <Box
      mt="10px"
      padding="10px"
      borderRadius="10px"
      border="1px"
      borderColor="gray.200"
    >
      <Center>
        <Heading as="u">SongLink</Heading>
      </Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box my="15px">
          <FormLabel>
            ⚡️ Insert a song cover with the link(s) to your track and SongLink
            will create a personal landing page! ⚡
          </FormLabel>
          <FormControl isInvalid={errors.name} isRequired>
            <Box mb="20px"></Box>
            <FormLabel htmlFor="link">Image 📷</FormLabel>
            <Button
              border="2px"
              variant="outline"
              colorScheme="blue"
              isLoading={isUploading}
              onClick={() => inputFile.click()}
            >
              {fileName ? fileName : "Upload Image"}
            </Button>
            <input
              style={{ display: "none" }}
              id="file"
              type="file"
              readOnly={true}
              ref={(el) => (inputFile = el)}
              onChange={(event) => {
                if (event.target.files[0]===undefined) return;
                setFileName(event.target.files[0].name.substring(0, 41));
                handleSubmitFile(event, event.target.files);
              }}
            ></input>
            <Input
              style={{ display: "none" }}
              name="imglink"
              value={imageUrl} //hacky solution
              placeholder="Image Link"
              ref={register({ required: true })}
            />
          </FormControl>
          <FormControl isInvalid={errors.name} isRequired>
            <FormLabel mt={3} htmlFor="link">
              Custom URL 🔗
            </FormLabel>
            <Input
              value={id}
              onInput={(e) => setId(e.target.value)}
              name="id"
              placeholder="Custom URL"
              ref={register({ required: true })}
            />
            <FormHelperText ml={2}>
              Specify a custom unique URL. If you input "123" the link to your
              track will be songlink.netlify.app/song/123!
            </FormHelperText>
          </FormControl>
        </Box>
        <FormControl as="fieldset">
          <FormLabel as="legend">
            Streaming services your track is available on 🎶
          </FormLabel>
          <CheckboxGroup colorScheme="green">
            <HStack>
              <Checkbox
                onChange={() => setShowSpotifyForm(!showSpotifyForm)}
                value="spotify"
              >
                Spotify
              </Checkbox>
              <Checkbox
                onChange={() => setShowSoundcloudForm(!showSoundcloudForm)}
                value="soundcloud"
              >
                Soundcloud
              </Checkbox>
              <Checkbox
                onChange={() => setShowYoutubeForm(!showYoutubeForm)}
                value="youtube"
              >
                Youtube
              </Checkbox>
              <Checkbox
                onChange={() => setShowAppleMusicForm(!showAppleMusicForm)}
                value="applemusic"
              >
                Apple
              </Checkbox>
            </HStack>
          </CheckboxGroup>
        </FormControl>
        {showSpotifyForm ? (
          <FormControl isInvalid={errors.name} isRequired>
            <FormLabel htmlFor="link">Spotify link</FormLabel>
            <Input
              name="spotify"
              placeholder="Spotify Link"
              ref={register({ required: true })}
            />
          </FormControl>
        ) : (
          ""
        )}
        {showSoundcloudForm ? (
          <FormControl isInvalid={errors.link} isRequired>
            <FormLabel htmlFor="link">SoundCloud Link</FormLabel>
            <Input
              name="soundCloud"
              placeholder="SoundCloud Link"
              ref={register({ required: true })}
            />
          </FormControl>
        ) : (
          ""
        )}
        {showYoutubeForm ? (
          <FormControl isInvalid={errors.lnk} isRequired>
            <FormLabel htmlFor="link">Youtube</FormLabel>
            <Input
              name="youtube"
              placeholder="Youtube Link"
              ref={register({ required: true })}
            />
          </FormControl>
        ) : (
          ""
        )}
        {showAppleMusicForm ? (
          <FormControl colorScheme="red" isInvalid={errors.link} isRequired>
            <FormLabel colorScheme="red" htmlFor="name">
              Apple Music
            </FormLabel>
            <Input
              name="appleMusic"
              placeholder="Apple Music Link"
              ref={register({ required: true })}
            />
          </FormControl>
        ) : (
          ""
        )}
        <Center>
          <Button
            onClick={() => {}}
            _hover={{ boxShadow: "md", backgroundColor: "#318fce" }}
            mt={4}
            colorScheme="blue"
            isLoading={formState.isSubmitting}
            type="submit"
          >
            Create!
          </Button>
        </Center>
      </form>
    </Box>
  );
};
export default SongLinkForm;
