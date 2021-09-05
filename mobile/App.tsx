import { StatusBar } from "expo-status-bar";
import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { NativeBaseProvider, Box, Heading } from "native-base";
import Navigator from "./navigator";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <Navigator />
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
