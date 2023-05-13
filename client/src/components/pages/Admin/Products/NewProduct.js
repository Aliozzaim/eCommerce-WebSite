import React from "react";
import { useQueryClient, useMutation } from "react-query";
import { newProduct } from "../../../../api";
import styles from "../../../Navbar/styles.module.css";
import { FieldArray, Formik } from "formik";
import { message } from "antd";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Textarea,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import validations from "./validation";

function NewProduct() {
  const queryClient = useQueryClient();

  const newProductMutation = useMutation(newProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
  });

  const handleSubmit = async (values, action) => {
    const newValues = {
      ...values,
      photos: JSON.stringify(values.photos),
    };

    message.loading({ content: "Loading...", key: "product_added" });

    newProductMutation.mutate(newValues, {
      onSuccess: () => {
        console.log("success");
      },
    });

    message.success({
      content: "item  has added successfully!",
      key: "product_added",
    });

    try {
    } catch (e) {}
  };
  return (
    <div>
      <Text fontSize="2xl" p={5}>
        New Product
      </Text>
      <Formik
        initialValues={{
          title: "",
          description: "",
          price: "",
          photos: [],
        }}
        validationSchema={validations}
        onSubmit={handleSubmit}
      >
        {({
          handleBlur,
          handleChange,
          errors,
          touched,
          handleSubmit,
          isSubmitting,
          values,
        }) => (
          <>
            <form onSubmit={handleSubmit}>
              <Box p={8}>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    disabled={isSubmitting}
                    isInvalid={errors.title && touched.title}
                  />
                  {errors.title && touched.title ? (
                    <div className={styles.error}>{errors.title}</div>
                  ) : (
                    ""
                  )}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Price</FormLabel>
                  <Input
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    disabled={isSubmitting}
                    isInvalid={errors.price && touched.price}
                  />
                  {errors.price && touched.price ? (
                    <div className={styles.error}>{errors.price}</div>
                  ) : (
                    ""
                  )}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    disabled={isSubmitting}
                    isInvalid={errors.description && touched.description}
                  />
                  {errors.description && touched.description ? (
                    <div className={styles.error}>{errors.description}</div>
                  ) : (
                    ""
                  )}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Photos</FormLabel>
                  <FieldArray
                    name="photos"
                    render={(arrayHelpers) => (
                      <div>
                        {values.photos &&
                          values.photos.map((photo, index) => (
                            <div key={index}>
                              <Input
                                name={`photos.${index}`}
                                value={photo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={isSubmitting}
                                width="80%"
                              />
                              <Button
                                ml={4}
                                colorScheme="red"
                                type="button"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                Delete
                              </Button>
                            </div>
                          ))}
                        <Flex justifyContent="center">
                          <Button
                            mt={8}
                            colorScheme="gray"
                            onClick={() => arrayHelpers.push("")}
                          >
                            Add a Photo
                          </Button>
                        </Flex>
                      </div>
                    )}
                  />
                </FormControl>
              </Box>
              <Flex justifyContent="center">
                <Button
                  mt={4}
                  width="50%"
                  onClick={handleSubmit}
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="green"
                  alignItems="center"
                >
                  Save
                </Button>
              </Flex>
            </form>
          </>
        )}
      </Formik>
    </div>
  );
}

export default NewProduct;
