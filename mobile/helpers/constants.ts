import { Platform } from "react-native";

export const BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:5000/api"
    : "http://localhost:5000/api";

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
};
