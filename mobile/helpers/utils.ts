import { Platform } from "react-native";
import { LocalStorageHelper } from "./storage/LocalStorageHelper";
import { SecureStorageHelper } from "./storage/SecureStorageHelper";
import { StorageInterface } from "./storage/type";

export const storage: StorageInterface =
  Platform.OS === "web" ? new LocalStorageHelper() : new SecureStorageHelper();
