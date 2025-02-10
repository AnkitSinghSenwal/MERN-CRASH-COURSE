import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();
  const toast = useToast();

  const handleAddProduct = async () => {
    const {success, message} = await createProduct(newProduct);
    // console.log(`Success: ${success}`);
    // console.log(`Message: ${message}`);
    // console.log("Product:", newProduct);
    if(!success){
      toast({
        title:"Error",
        description:message,
        status:"error",
        duration: 5000,
        isClosable:true
      })
    } else{
      toast({
        title:"Successfully",
        description:message,
        status:"success",
        duration: 5000,
        isClosable:true
      })
      setNewProduct({
        name: "",
        price: "",
        image: "",
      })
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} alignItems={"center"} mb={8}>
          Create new product
        </Heading>
        <Box
          w={"full"}
          bd={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="product name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="image url"
              name="link"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Add product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;

// rafce
