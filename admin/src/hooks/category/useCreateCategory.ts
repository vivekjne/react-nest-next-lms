import { useMutation } from "react-query";
import axios from "axios";

const createCategory = async (newCategory: any) => {
  console.log({ newCategory });
  const { data } = await axios.post("/api/categories", newCategory);
  return data;
};

export default function useCreateCategory() {
  return useMutation(createCategory);
}
