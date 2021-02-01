import { React, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormHelperText,
  FormLabel,
  FormControl,
  Input,
  Button,
  Checkbox,
  CheckboxGroup,
  HStack,
  Box,
  Center,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SongLinkForm = () => {
  let history = useHistory();
  let [id, setId] = useState("");
  const { handleSubmit, errors, register, formState } = useForm();

  const [showSpotifyForm, setShowSpotifyForm] = useState(false);
  const [showSoundcloudForm, setShowSoundcloudForm] = useState(false);
  const [showYoutubeForm, setShowYoutubeForm] = useState(false);
  const [showAppleMusicForm, setShowAppleMusicForm] = useState(false);

  function onSubmit(values, actions) {
    axios({
      method: "POST",
      url: "http://localhost:5000/songs/add",
      data: { values },
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
            Insert an album with the link(s) to your song and SongLink will
            create a landing page for your song!
          </FormLabel>
          <FormControl isInvalid={errors.name} isRequired>
            <Box mb="20px"></Box>
            <FormLabel htmlFor="link">Image Link</FormLabel>
            <Input
              name="imglink"
              placeholder="Image Link"
              ref={register({ required: true })}
            />
          </FormControl>
          <FormControl isInvalid={errors.name} isRequired>
            <FormLabel mt={3} htmlFor="link">
              Custom URL
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
              track will be heroku.com/song/123!
            </FormHelperText>
          </FormControl>
        </Box>
        <FormControl as="fieldset">
          <FormLabel as="legend">
            Streaming services your track is available on
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
            _hover={{ bg: "#6ed0ce", boxShadow: "md" }}
            mt={4}
            bg="#3bb5b2"
            color="#ffffff"
            isLoading={formState.isSubmitting}
            type="submit"
          >
            Create
          </Button>
        </Center>
      </form>
    </Box>
  );
};
export default SongLinkForm;
