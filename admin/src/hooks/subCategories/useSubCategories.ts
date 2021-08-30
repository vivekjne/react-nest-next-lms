import { useQuery } from "react-query";
import axios from "axios";

const getSubCategories = async () => {
  const { data } = await axios.get("/api/sub-categories");
  return data;
};

export default function useSubCategories() {
  return useQuery("sub-categories", getSubCategories, {
    staleTime: 5000 * 60,
  });
}
