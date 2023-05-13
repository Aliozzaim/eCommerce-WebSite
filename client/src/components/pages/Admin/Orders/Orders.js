import React from "react";
import { adminOrders } from "../../../../api";
import { useQuery } from "react-query";
import { Text, Table, Thead, Tbody, Tr, Td } from "@chakra-ui/react";

function Orders() {
  const { isLoading, data, isError, error } = useQuery(
    "admin:orders",
    adminOrders
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error. {error.message}</div>;
  }
  
  return (
    <div>
      <Text fontSize="24" p={5}>
        Orders
      </Text>

      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Td fontWeight="700">User</Td>
            <Td fontWeight="700">Address</Td>
            <Td fontWeight="700">Items</Td>
            <Td fontWeight="700">Detail</Td>
          </Tr>
        </Thead>
                                                                                                                                                                                                                            
        <Tbody>
          {data.map((item) => (
            <Tr
              key={item._id}
              style={{ display: `${item.items.length > 0 ? "" : "none"}`, textAlign:"center", }}
            >
              <Td textDecoration="underline">{item.user.email}</Td>
              <Td>{item.adress}</Td>
              <Td>{item.items.length}</Td>
              <Td>
                <ul>
                  {item.items.map((item, i) => (
                    <li key={i}>- {item.title}</li>
                  ))}
                </ul>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default Orders;
