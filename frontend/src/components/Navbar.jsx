import { Button, Container, Flex, Text, HStack, useColorMode } from "@chakra-ui/react";
import { PlusSquareIcon} from "@chakra-ui/icons"
import { IoMoon} from 'react-icons/io5'
import { LuSun } from 'react-icons/lu'
import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4} py={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={"2"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize={{ base: "22px", sm: "28" }}
          fontWeight="extrabold"
        >
          <Link to="/">Product Store 🛒</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          {/* Added spacing between buttons */}
          <Link to="/create">
            <Button> <PlusSquareIcon fontSize={20}/></Button>
          </Link>

            <Button onClick={toggleColorMode}> 
              {colorMode === 'light' ? <IoMoon/>: <LuSun/> }
            </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
