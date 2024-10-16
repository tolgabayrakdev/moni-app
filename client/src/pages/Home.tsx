import { Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <Center bg="gray.50" minHeight="100vh">
            <Link to="/sign-in">Giriş yap</Link>
        </Center>
    )
}
