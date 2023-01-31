import React from 'react'
import { Heading, Stack, VStack, Button, Text, Image, Box, HStack } from "@chakra-ui/react"
import { Link } from 'react-router-dom'
import "./home.css"
import vg from "../../assests/images/bg.png"
import { CgGoogle, CgYoutube } from "react-icons/cg"
import { SiCoursera, SiUdemy } from "react-icons/si"
import { DiAws } from "react-icons/di"
import IntroVideo from "../../assests/videos/intro.mp4"
const Home = () => {
    return (
        <>
            <div className='home'>
                <Stack
                    direction={['column', 'row']}
                    height="100%"
                    justifyContent={['center', 'space-between']}
                    alignItems='center'
                    spacing={['16', '46']}
                >
                    <VStack width={'full'} alignItems={['center', 'flex-end']} >
                        <Heading children="LEARN FROM THE EXPERTS" size={'2xl'} textAlign={'center'} />
                        <Text children="Find the valuable Content At Reasonable Price" />
                        <Link to="/courses">
                            <Button size={'lg'} colorScheme="yellow">
                                Explore Now
                            </Button>
                        </Link>
                    </VStack>
                    <VStack width={'full'}>
                        <Image className='vector-graphics' boxSize={'md'} objectFit="contain" src={vg} />
                    </VStack>
                </Stack>
                <Box padding={'8'} bg={"blackAlpha.800"}>
                    <Heading
                        textAlign={'center'}
                        fontFamily="body"
                        color={"yellow.400"}
                        children="OUR BRANDS" />
                    <HStack className='brandsBanneer' justifyContent={'space-evenly'} marginTop={"8"}>
                        <CgGoogle />
                        <CgYoutube />
                        <SiCoursera />
                        <SiUdemy />
                        <DiAws />
                    </HStack>
                </Box>
                <div className='container2'>
                <h1>Introduction Video</h1>
                    <video
                        muted
                        autoPlay
                        controls
                        controlsList="nodownload nofullscreen noremoteplayback"
                        disablePictureInPicture
                        disableRemotePlayback
                        src={IntroVideo}
                    ></video>

                </div>
            </div>

        </>
    )
}

export default Home
