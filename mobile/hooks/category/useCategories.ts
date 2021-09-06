import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../helpers/constants";

const getCategories = async () => {
  const { data } = await axios.get(`${BASE_URL}/categories`);
  return data;
};

export default function useCategories() {
  return useQuery("categories", getCategories);
}
