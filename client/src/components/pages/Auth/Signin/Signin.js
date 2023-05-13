import React, { useState } from "react";
import styles from "../../../Navbar/styles.module.css";
import signupSchema from "./validation";
import { signInDataPost } from "../../../../api";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Alert,
  Spinner,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useAuth } from "../../../contexts/AutContext";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [circle, setCircle] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const { handleBlur, handleChange, values, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        password: "",
        passwordConfirm: "",
        email: "",
      },
      onSubmit: async (values, actions) => {
        try {
          const loginResponse = await signInDataPost({
            email: values.email,
            password: values.password,
          });
          setCircle(true);

          setTimeout(() => {
            navigate("/homepage");
          }, 6000);
          setTimeout(() => {
            actions.resetForm();
            login(loginResponse);
            navigate("/successlogin");

            setCircle(false);
          }, 1500);
        } catch (e) {
          actions.setErrors({ general: e.response.data.message });
        }
      },
      validationSchema: signupSchema,
    });

  return (
    <div>
      <Flex align="center" justifyContent="center" width="full">
        <Box p="10" textAlign="center" mt="10">
          <Heading>Sign In</Heading>
          <Box my="5">
            {errors.general && <Alert status="error">{errors.general}</Alert>}
          </Box>
          <Box mt="10">
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input
                  name="email"
                  type="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  isInvalid={errors.email && touched.email}
                ></Input>
                {errors.email && touched.email ? (
                  <div className={styles.error}>{errors.email}</div>
                ) : (
                  ""
                )}
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  isInvalid={errors.password && touched.password}
                ></Input>
                {errors.password && touched.password ? (
                  <div className={styles.error}>{errors.password}</div>
                ) : (
                  ""
                )}
              </FormControl>
              
              <Button mt="4" width="100%" colorScheme="green" type="submit">
                Sign In
              </Button>{" "}
              <br />
              {circle && (
                <Spinner
                  color="blue.200"
                  emptyColor="gray.500"
                  speed="0.5s"
                  size="xl"
                  thickness="4px"
                />
              )}
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Signin;
