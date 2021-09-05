import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  VStack,
  Text,
  Center,
} from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigator";

type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation }: LoginProps) {
  return (
    <Center safeArea flex={1} bgColor="white">
      <Box flex={1} p={2} w="90%">
        <Heading mt={4} size="lg" color="primary.500">
          Welcome
        </Heading>
        <Heading>Sign in to continue</Heading>

        <VStack space={2} mt={5}>
          <FormControl>
            <FormControl.Label
              _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
            >
              Email ID
            </FormControl.Label>
            <Input />
          </FormControl>

          <FormControl mb={5}>
            <FormControl.Label
              _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
            >
              Password
            </FormControl.Label>
            <Input type="password" />
            <Link
              _text={{ fontSize: "xs", fontWeight: "700", color: "cyan.500" }}
              alignSelf="flex-end"
            >
              Forget Password
            </Link>
          </FormControl>
          <Button colorScheme="cyan" _text={{ color: "white" }}>
            Login
          </Button>

          <HStack justifyContent="center">
            <Text fontSize="sm" color="muted.700" fontWeight="400">
              I'm a new user. {` `}
            </Text>
            <Link
              _text={{ color: "cyan.500", bold: true, fontSize: "sm" }}
              onPress={() => navigation.navigate("Register")}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}
