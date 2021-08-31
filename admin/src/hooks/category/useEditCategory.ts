import { useMutation } from "react-query";
import axios from "axios";

const editCategory = async ({ id, categoryData }: any) => {
  console.log({ id, categoryData });
  const { data } = await axios.patch(`/api/categories/${id}`, categoryData);
  return data;
};

export default function useEditCategory() {
  return useMutation(editCategory);
}
