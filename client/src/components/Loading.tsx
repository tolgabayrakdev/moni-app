import { Flex, Spinner, useColorModeValue } from '@chakra-ui/react'

export default function Loading() {
    return (
        <Flex bg={useColorModeValue("gray.50", "gray.900")} justify="center" align="center" height="100vh">
            <Spinner size="lg" />
        </Flex>
    )
}