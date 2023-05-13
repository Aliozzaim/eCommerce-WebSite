import { Box, Grid, Flex, Button,Text } from "@chakra-ui/react";
import React from "react";
import Card from "../../Card/Card";
import { useInfiniteQuery } from "react-query";
import { productList } from "../../../api";
function Products() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("products", productList, {
      getNextPageParam: (lastGroup, allGroups) => {
      const morePagesExist = lastGroup?.length === 12;

      if (!morePagesExist) {
        return;
      }

      return allGroups.length + 1;
    },
  });

  if (status === "loading") return "Loading...";

  if (status === "error") return "An error has occurred: " + error.message;
  
  return (
    <div>
      <Text fontSize="32" fontStyle="italic" textAlign="center" mt="2" textDecoration="underline" >Products</Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {/* {
          data.map((item,key) => 
            <Card item={item} key={key} />
          )
        } */}

        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((item) => (
              <Box w="100%" key={item._id}>
                <Card item={item} />
              </Box>
            ))}
          </React.Fragment>
        ))}
      </Grid>

      <Flex mt="10" justifyContent="center">
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          isLoading={isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
        <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
      </Flex>
    </div>
  );
}

export default Products;
