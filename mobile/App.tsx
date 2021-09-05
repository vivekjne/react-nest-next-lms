import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { NativeBaseProvider } from "native-base";
import Navigator from "./navigator";
import AuthProvider from "./components/contexts/AuthContext";

const queryClient = new QueryClient();

export default function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NativeBaseProvider>
          <Navigator />
        </NativeBaseProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
