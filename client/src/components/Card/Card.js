import { Image, Box, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { useBasket } from "../contexts/BasketContext";
function Card({ item }) {
  const { addItemtoBasket, items } = useBasket();
  const findItemBasket = items.find(
    (basket_item) => basket_item._id === item._id
  );

  return (
    <>
    
    <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden" mt="8" >
      <NavLink to={`/product/${item._id}`}>
        <Image src={item.photos[0]} alt="asd" loading="lazy" width="100%"  height="350px" objectFit="cover" borderRadius="16px" />
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            {moment(item.createAt).format("DD/MM/YYYY")}
          </Box>
          <Box marginTop="2" fontWeight="semibold" lineHeight="tight" as="h4">
            {item.title}
          </Box>
          <Box>{item.price} ₺</Box>
        </Box>
      </NavLink>
      <Button
        colorScheme={findItemBasket ? "red" : "green"}
        onClick={() => addItemtoBasket(item, findItemBasket)}
      >
        {findItemBasket ? "Remove from Basket" : "Add to Basket"}
      </Button>
    </Box>
    </>
  );
}

export default Card;
