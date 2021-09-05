import * as SecureStore from "expo-secure-store";

export async function saveToken(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}
export async function getTokenValue(key: string) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

export async function deleteToken(key: string) {
  return SecureStore.deleteItemAsync(key);
}
