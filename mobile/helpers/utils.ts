import { Platform } from "react-native";
import { BASE_IMAGE_URL } from "./constants";
import { LocalStorageHelper } from "./storage/LocalStorageHelper";
import { SecureStorageHelper } from "./storage/SecureStorageHelper";
import { StorageInterface } from "./storage/type";

export const storage: StorageInterface =
  Platform.OS === "web" ? new LocalStorageHelper() : new SecureStorageHelper();

export const getImageUrl = (imagePath: string) => {
  return imagePath.startsWith("http")
    ? imagePath
    : `${BASE_IMAGE_URL}${imagePath}`;
};
