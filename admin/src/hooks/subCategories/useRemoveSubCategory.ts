import { useMutation } from "react-query";
import axios from "axios";

const removeSubCategory = async (id: any) => {
  const { data } = await axios.delete(`/api/sub-categories/${id}`);
  return data;
};

export default function useRemoveSubCategory() {
  return useMutation(removeSubCategory);
}
