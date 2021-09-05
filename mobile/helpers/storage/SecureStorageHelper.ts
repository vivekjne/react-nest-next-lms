import * as SecureStore from "expo-secure-store";
import { StorageInterface } from "./type";

export class SecureStorageHelper implements StorageInterface {
  async saveItem(key: string, value: string): Promise<void> {
    return SecureStore.setItemAsync(key, value);
  }

  async getItem(key: string): Promise<string | null> {
    const result = await SecureStore.getItemAsync(key);
    return result;
  }

  async removeItem(key: string): Promise<void> {
    return SecureStore.deleteItemAsync(key);
  }
}
