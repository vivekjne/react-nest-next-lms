import * as SecureStore from "expo-secure-store";
import { StorageInterface } from "./type";

export class SecureStorageHelper implements StorageInterface {
  saveItem(key: string, value: string) {
    SecureStore.setItemAsync(key, value);
  }

  async getItem(key: string) {
    const result = await SecureStore.getItemAsync(key);
    return result;
  }

  removeItem(key: string) {
    SecureStore.deleteItemAsync(key);
  }
}
