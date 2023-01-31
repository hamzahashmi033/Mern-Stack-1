import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import { ColorModeSwitcher } from "../../../ColorModeSwitcher"
import { RiDashboardLine, RiMenu5Fill, RiProfileFill } from "react-icons/ri"
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../../redux/actions/userActions'
const LinkButton = ({ url = "/", title = "home", onClose }) => (
    <Link to={url}>
        <Button onClick={onClose} variant={'ghost'}>{title}</Button>    
    </Link>
)
const Header = ({ isAuthenticated, user }) => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const dispatch = useDispatch()
    const logoutHandler = () => {
        onClose()
        dispatch(logoutUser())
    }
    return (
        <>
            <ColorModeSwitcher />
            <Button
                onClick={onOpen}
                colorScheme={'yellow'}
                width="10"
                height={'10'}
                rounded="full"
                position={'fixed'}
                top="2"
                left={'2'}
                zIndex='10'
            >
                <RiMenu5Fill />
            </Button>
            <Drawer placement='left' isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay backdropFilter={"blur(20px)"} />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth={'1px'}>COURSE BUNDLER</DrawerHeader>
                    <DrawerBody>
                        <VStack spacing={'4'} alignItems={'flex-start'}>
                            <LinkButton url='/' onClose={onClose} title='Home' />
                            <LinkButton url='/courses' onClose={onClose} title='Browse Courses' />
                            <LinkButton url='/request' onClose={onClose} title='Request a Course' />
                            <LinkButton url='/contact' onClose={onClose} title='Contact' />
                            <LinkButton url='/about' onClose={onClose} title='About' />

                            <HStack justifyContent={'space-evenly'} position="absolute" bottom={'2rem'} width="80%">
                                {isAuthenticated ?
                                    (<>
                                        <VStack>
                                            <HStack>
                                                <Link to="/profile">
                                                    <Button onClick={onClose} colorScheme={'yellow'}>
                                                        <RiProfileFill style={{ margin: "5px" }} />
                                                        Profile
                                                    </Button>
                                                </Link>
                                                <Button onClick={logoutHandler} variant='ghost'>LOGOUT</Button>
                                            </HStack>

                                            {
                                                user && user.role === "admin" && (<>
                                                    <Link to="/admin/dashboard">
                                                        <Button onClick={onClose} colorScheme={'purple'} variant="ghost">
                                                            <RiDashboardLine style={{ margin: "5px" }} />  Dashboard</Button>
                                                    </Link>
                                                </>)}

                                        </VStack>

                                    </>) :
                                    (
                                        <>
                                            <Link to="/login">
                                                <Button onClick={onClose} colorScheme={'yellow'}>LOGIN</Button>
                                            </Link>

                                            <p>OR</p>

                                            <Link to="/register">
                                                <Button onClick={onClose} colorScheme={'yellow'}>Register</Button>
                                            </Link>
                                        </>
                                    )}

                            </HStack>
                        </VStack>

                    </DrawerBody>
                </DrawerContent>
            </Drawer>

        </>
    )
}

export default Header
