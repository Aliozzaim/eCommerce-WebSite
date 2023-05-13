import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { product, updateProduct } from "../../../../api";
import styles from "../../../Navbar/styles.module.css"
import { FieldArray, Formik } from "formik";
import { message } from 'antd';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Textarea,
  Button,
  Text,
} from "@chakra-ui/react";
import validations from "./validation";

function AdminproDetail() {
    


  const { product_id } = useParams();

  const { isError, isLoading, data, error } = useQuery(
    ["admin:productDetail", product_id],
    () => product(product_id)
  );
 

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (isError) {
    return <div>Error. {error.message}</div>;
  }
  console.log(data);
  const handleSubmit = async(values,action) => {
    console.log("submitted");
    message.loading({content: "Loading...", key:"product_update"})
    try{
        await updateProduct(values,product_id);
        message.success({
            content: "Item has been uptated  successfully!",
            key: "product_update",
            duration:  4
        })
    }catch(e) {
        message.error("The item does not updated")
    }
  };
  return (
    <div>
      <Text fontSize="2xl" p={5}>
        Edit
      </Text>
      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          price: data.price,
          photos: data.photos,
        }}
          validationSchema={validations}
        onSubmit={handleSubmit}
      >
        {({ handleBlur, handleChange,errors,touched, handleSubmit, isSubmitting, values }) => (
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
                          <Button mt={8}colorScheme="gray" onClick={() => arrayHelpers.push("")}>Add a Photo</Button>
                      </div>
                    )}
                  />
                </FormControl>
              </Box>
              <Button  mt={4} width="full" onClick={handleSubmit} type="submit" isLoading={isSubmitting }>Update</Button>
            </form>
          </>
        )}
      </Formik>
    </div>
  );
}

export default AdminproDetail;
