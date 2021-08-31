import { useMutation } from "react-query";
import axios from "axios";

const createSubCategory = async (newSubCategory: any) => {
  console.log({ newSubCategory });
  const { data } = await axios.post("/api/sub-categories", newSubCategory);
  return data;
};

export default function useCreateSubCategory() {
  return useMutation(createSubCategory);
}
