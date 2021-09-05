export interface StorageInterface {
  saveItem(key: string, value: string): void;
  getItem(
    key: string
  ): Promise<string | null | undefined> | string | undefined | null;
  removeItem(key: string): void;
}
