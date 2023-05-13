import React, { useState } from "react";
import styles from "../../../Navbar/styles.module.css";
import signupSchema from "./validation";
import { signupDataPost } from "../../../../api";
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

function Signup() {
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
          const registerResponse = await signupDataPost({
            email: values.email,
            password: values.password,
          });
          setCircle(true);

          setTimeout(() => {
            navigate("/homepage");
          }, 7000);
          setTimeout(() => {
            actions.resetForm();
            login(registerResponse);
            navigate("/successentry");

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
          <Heading>Sign Up</Heading>
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
              <FormControl mt="4">
                <FormLabel>Password Confirm</FormLabel>
                <Input
                  name="passwordConfirm"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.passwordConfirm}
                  isInvalid={errors.passwordConfirm && touched.passwordConfirm}
                ></Input>
                {errors.passwordConfirm && touched.passwordConfirm ? (
                  <div className={styles.error}>{errors.passwordConfirm}</div>
                ) : (
                  ""
                )}
              </FormControl>
              
              <br />
              {circle ?
                <Spinner
                  color="blue.200"
                  emptyColor="gray.500"
                  speed="0.5s"
                  size="lg"
                  thickness="4px"
                /> : <Button mt="4" width="100%" colorScheme="green" type="submit">
                Submit
              </Button> 
              }
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Signup;
