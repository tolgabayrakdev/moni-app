import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import {
    Box,
    Flex,
    Avatar,
    HStack,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    useColorModeValue,
    VStack,
    useColorMode,
    Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

const Links = [
    { name: "Akış", path: "/feed" },
    { name: "Profil", path: "/feed/profile" },
    { name: "Ayarlar", path: "/feed/settings" }
];

const NavLink = ({ children, path }: { children: React.ReactNode, path: string }) => {
    const location = useLocation();
    const isActive = location.pathname === path;

    return (
        <Link to={path} style={{ width: '100%' }}>
            <Button
                w="100%"
                justifyContent="flex-start"
                px={2}
                py={1}
                rounded={"md"}
                variant="link"
                color={isActive ? useColorModeValue("blue.500", "blue.200") : useColorModeValue("gray.600", "gray.200")}
                _hover={{
                    textDecoration: "underline",
                    color: useColorModeValue("blue.600", "blue.300"),
                }}
            >
                {children}
            </Button>
        </Link>
    );
};

export default function FeedLayout() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const location = useLocation();
    const { colorMode, toggleColorMode } = useColorMode();

    // Sayfa değiştiğinde hamburger menüyü kapat
    useEffect(() => {
        onClose();
    }, [location.pathname]);

    // Örnek kullanıcı bilgileri (gerçek uygulamada bu bilgiler bir API'den veya state'ten gelecektir)
    const userEmail = "ornek@email.com";
    const username = "OrnekKullanici";

    const handleLogout = () => {
        // Burada çıkış işlemlerini gerçekleştirin
        // Örneğin: localStorage.removeItem("token");
        navigate("/signin");
    };

    return (
        <Box bg={useColorModeValue("gray.50", "gray.900")} minH="100vh">
            <Box 
                bg={useColorModeValue("white", "gray.800")} 
                px={4} 
                boxShadow="sm"
                position="fixed"
                top={0}
                left={0}
                right={0}
                zIndex={1000}
            >
                <Flex h={14} alignItems={"center"} justifyContent={"space-between"}>
                    <IconButton
                        size={"sm"}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={"Open Menu"}
                        display={{ md: "none" }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={"center"}>
                        <Box fontWeight="bold" mr={2} color={useColorModeValue("gray.800", "white")}>Logo</Box>
                        <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
                            {Links.map((link) => (
                                <NavLink key={link.name} path={link.path}>{link.name}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={"center"}>
                        <HStack spacing={3}>
                            <VStack spacing={0} alignItems="flex-end" display={{ base: "none", md: "flex" }}>
                                <Text fontWeight="medium" fontSize="xs">{username}</Text>
                                <Text color="gray.500" fontSize="xs">{userEmail}</Text>
                            </VStack>
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={"full"}
                                    variant={"link"}
                                    cursor={"pointer"}
                                    minW={0}
                                >
                                    <Avatar
                                        size={"sm"}
                                        src={
                                            "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                                        }
                                    />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={toggleColorMode}>
                                        {colorMode === "light" ? <MoonIcon mr={2} /> : <SunIcon mr={2} />}
                                        {colorMode === "light" ? "Dark Mode" : "Light Mode"}
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
                                </MenuList>
                            </Menu>
                        </HStack>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={2} display={{ md: "none" }}>
                        <VStack as={"nav"} spacing={2} alignItems="stretch">
                            {Links.map((link) => (
                                <NavLink key={link.name} path={link.path}>{link.name}</NavLink>
                            ))}
                        </VStack>
                    </Box>
                ) : null}
            </Box>

            <Box py={20}>
                <Box maxWidth="1200px" margin="auto">
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}
