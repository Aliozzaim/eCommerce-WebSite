import { useRef, useState } from "react";
import { useBasket } from "../../contexts/BasketContext";
import {
  Alert,
  Box,
  Button,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  FormLabel,
  FormControl,
  
} from "@chakra-ui/react";
import styles from "../../Navbar/styles.module.css";
import { NavLink } from "react-router-dom";
import { postOrder } from "../../../api";

function Basket() {
  const [address, setAddress] = useState("");
  const { items, removeFromBasket, setItems } = useBasket();
  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  const handleOrder = async () => {
    const itemIDs = items.map((item) => item._id);

    const input = {
      address,
      items: JSON.stringify(itemIDs),
    };

    const response = await postOrder(input);
    console.log(response);
    setItems([]);
    onClose();
  };

  return (
    <div className={styles.basket}>
      <div className={styles.basketLeft}>
        {items.length < 1 && (
          <Alert status="warning">You have not any items in your basket</Alert>
        )}
        {items.length > 0 && (
          <>
            <ul className={styles.basketList}>
              {items.map((item) => (
                <>
                  <li key={item._id}>
                    <NavLink to={`/product/${item._id}`}>
                      <Box mt="8" mb="2" mr="4" ml="4">
                        <Image htmlWidth="200" src={item.photos[0]} />
                        <Text mt="2">
                          {item.title} - {item.price} TL
                        </Text>
                      </Box>
                    </NavLink>
                    <Button
                      ml="4"
                      size="sm"
                      colorScheme="red"
                      onClick={() => removeFromBasket(item._id)}
                    >
                      Remove from Basket
                    </Button>
                  </li>
                </>
              ))}
            </ul>
          </>
        )}
      </div>
      {items.length > 0 && (
        <>
          <div className={styles.basketRight}>
            <div>Total : {total} TL</div>
            <Button
              colorScheme="green"
              onClick={onOpen}
              mt="2"
              size="sm"
              width="50%"
            >
              Order
            </Button>
            <Modal
              initialFocusRef={initialRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Order</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Textarea
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={handleOrder}>
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </>
      )}
    </div>
  );
}

export default Basket;
