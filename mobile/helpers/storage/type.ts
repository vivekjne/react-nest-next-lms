export interface StorageInterface {
  saveItem(key: string, value: string): Promise<void> | void;
  getItem(
    key: string
  ): Promise<string | null | undefined> | string | undefined | null;
  removeItem(key: string): Promise<void> | void;
}
