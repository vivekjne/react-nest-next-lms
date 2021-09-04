import { useQuery } from "react-query";
import axios from "axios";

const getCategories = async () => {
  const { data } = await axios.get("/api/categories");
  return data;
};

export default function useCategories() {
  return useQuery("categories", getCategories);
}
