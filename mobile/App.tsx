import { StatusBar } from "expo-status-bar";
import React from "react";
import { NativeBaseProvider, Box, Heading } from "native-base";
import Navigator from "./navigator";
export default function App() {
  return (
    <NativeBaseProvider>
      <Navigator />
    </NativeBaseProvider>
  );
}
