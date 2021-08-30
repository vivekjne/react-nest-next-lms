import { useMutation } from "react-query";
import axios from "axios";

const removeCategory = async (id: any) => {
  const { data } = await axios.delete(`/api/categories/${id}`);
  return data;
};

export default function useRemoveCategory() {
  return useMutation(removeCategory);
}
