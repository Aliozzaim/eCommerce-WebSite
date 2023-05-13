import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { product } from "../../../api";
import { Box, Text, Button } from "@chakra-ui/react";
import ImageGallery from "react-image-gallery";
import moment from "moment";
import styles from "../../Navbar/styles.module.css";
import { useBasket } from "../../contexts/BasketContext";

function ProductDetail() {
  const { addItemtoBasket, items } = useBasket();
  const { product_id } = useParams();

  

  const { isLoading, error, data } = useQuery(["product", product_id], () =>
    product(product_id)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const images = data.photos.map((url) => ({ original: url }));

  const findItemBasket = items.find((item) => item._id === product_id);

  return (
    <div className={styles.proDetail}>
      <div className={styles.proImage}>
        <Box p="10">
          <ImageGallery items={images} />
        </Box>
      </div>
      <div className={styles.proDesc}>
        <Text as="h2" fontSize="2xl">
          {data.title}
        </Text>
        <Text>{moment(data.createAt).format("DD/MM/YYYY")}</Text>
        <p>{data.description}</p>

        <Button
          colorScheme={findItemBasket ? "red" : "green"}
          onClick={() => addItemtoBasket(data,findItemBasket)}
        >
          {findItemBasket ? "Remove from Basket" : "Add to Basket"}
        </Button>
      </div>
    </div>
  );
}

export default ProductDetail;
