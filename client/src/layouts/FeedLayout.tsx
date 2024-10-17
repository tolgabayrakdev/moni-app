import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
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
    useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import AuthWrapper from "../wrappers/AuthWrapper";
import Loading from "../components/Loading";


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

function FeedLayout() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const location = useLocation();
    const { colorMode, toggleColorMode } = useColorMode();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const toast = useToast();
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        onClose();
    }, [location.pathname]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/auth/verify", {
                    method: "POST",
                    credentials: "include",
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    
                    setUserName(data.user.username);
                    setUserEmail(data.user.email);
                } else {
                    throw new Error("Kullanıcı bilgileri alınamadı");
                }
            } catch (error) {
                console.error("Kullanıcı bilgileri alınırken hata oluştu:", error);
                toast({
                    title: "Hata",
                    description: "Kullanıcı bilgileri alınamadı. Lütfen tekrar giriş yapın.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                navigate("/sign-in");
            }
        };

        fetchUserInfo();
    },[])

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            if (response.status === 200) {
                setTimeout(() => {
                    setIsLoggingOut(false);
                    navigate("/sign-in");
                }, 500);
            }
        } catch (error) {
            setIsLoggingOut(false);
            // Hata yönetimi burada yapılabilir
        }
    };
    if (isLoggingOut) {
        return (
            <Loading />
        );
    }


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
                                <Text fontWeight="medium" fontSize="xs">{userName}</Text>
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
                                    bg="blue.300"
                                    name={userName}
                                        size={"sm"}
                                        src={
                                            "https://bit.ly/broken-link"
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
                <Box maxWidth="1200px" p={3}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}

export default AuthWrapper(FeedLayout);