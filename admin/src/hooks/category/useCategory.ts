import { useQuery } from "react-query";
import axios from "axios";

const getCategory = async (categoryId: any) => {
  const { data } = await axios.get(`/api/categories/${categoryId}`);
  return data;
};

export default function useCategory(categoryId: any) {
  return useQuery(["categories", categoryId], () => getCategory(categoryId), {
    staleTime: 5000 * 60,
  });
}
