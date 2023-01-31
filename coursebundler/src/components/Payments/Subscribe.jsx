import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Subscribe = () => {
  const navigate = useNavigate()
  return (
   <>
   <Container h={'100vh'} p="16">
    <Heading my={'8'} children="Welcome" textTransform={'uppercase'} textAlign="center"/>
    <VStack
    boxShadow={'lg'}
    alignItems="stretch"
    borderRadius={'lg'}
    spacing="0"
    >
        <Box bg={"yellow.400"} p="4" css={{borderRadius:"8px 8px 0 0"}}
        >
            <Text color={"black"} children={'Pro Pack - Rs 500'}/>
        </Box>
        <Box p="4">
            <VStack textAlign={"center"} px="8" mt={'4'} spacing="8">
            <Text children={`Join pro pack and get access to all content.`} />
            <Heading size="md" children={'Rs 299 Only'} />
            </VStack>

            <Button 
            my="10"
            w="full"
            colorScheme={'yellow'}
            onClick={()=>navigate("/payment")}
            >
                Buy Now
            </Button>
            </Box>
            <Box bg="blackAlpha.600" p="4" css={{ borderRadius: '0 0 8px 8px' }}>
          <Heading
            color={'white'}
            textTransform="uppercase"
            size="sm"
            children={'100% refund at cancellation'}
          />

          <Text
            fontSize={'xs'}
            color="white"
            children={'*Terms & Conditions Apply'}
          />
        </Box>

    </VStack>

   </Container>
   </>
  )
}

export default Subscribe
