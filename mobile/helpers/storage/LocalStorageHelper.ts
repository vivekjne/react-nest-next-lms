import { StorageInterface } from "./type";

export class LocalStorageHelper implements StorageInterface {
  saveItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getItem(key: string) {
    const result = localStorage.getItem(key);
    return result;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
