import { object, string,ref } from 'yup';

const signupSchema = object({
  email: string().email("Email is Invalid!").required("Email is Required"),
  password: string().max(12,"Password must be no more then 12").required("Password is Required").min(8,"Password must be at least8"),
  passwordConfirm: string().required("Password Confirm is Required").oneOf([ref("password")],"Password Must Match")

});

export default signupSchema;