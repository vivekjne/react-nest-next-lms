import * as Yup from "yup";

export const authSchema = {
  login: Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "must be atleast 8 characters"),
  }),
};
