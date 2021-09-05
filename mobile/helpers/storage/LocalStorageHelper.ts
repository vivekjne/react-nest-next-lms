import { StorageInterface } from "./type";

export class LocalStorageHelper implements StorageInterface {
  saveItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    const result = localStorage.getItem(key);
    return result;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
