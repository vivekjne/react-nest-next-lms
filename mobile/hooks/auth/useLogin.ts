import { useMutation } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../helpers/constants";

const handleLogin = async (loginData: any) => {
  console.log({ loginData });
  const { data } = await axios.post(`${BASE_URL}/auth/login`, loginData);
  return data;
};

export default function useLogin() {
  return useMutation(handleLogin);
}
