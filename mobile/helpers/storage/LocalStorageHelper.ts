import { StorageInterface } from "./type";

export class LocalStorageHelper implements StorageInterface {
  public saveItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getItem(key: string): string | null {
    const result = localStorage.getItem(key);
    return result;
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
