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
} from "native-base";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigator";

type RegisterProps = NativeStackScreenProps<RootStackParamList, "Register">;

export default function Register({ navigation }: RegisterProps): JSX.Element {
  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "#fff" }}>
      <Box flex={1} p={2} w="90%" mx="auto">
        <Heading size="lg" color="primary.500">
          Welcome
        </Heading>
        <Heading>Sign up to continue!</Heading>

        <VStack space={2} mt={5}>
          <FormControl>
            <FormControl.Label
              _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
            >
              First Name
            </FormControl.Label>
            <Input />
          </FormControl>

          <FormControl>
            <FormControl.Label
              _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
            >
              Second Name
            </FormControl.Label>
            <Input />
          </FormControl>

          <FormControl>
            <FormControl.Label
              _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
            >
              Username
            </FormControl.Label>
            <Input />
          </FormControl>

          <FormControl>
            <FormControl.Label
              _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
            >
              Email ID
            </FormControl.Label>
            <Input type="email" />
          </FormControl>

          <FormControl>
            <FormControl.Label
              _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
            >
              Password
            </FormControl.Label>
            <Input type="password" />
          </FormControl>

          <FormControl mb={5}>
            <FormControl.Label
              _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
            >
              Confirm Password
            </FormControl.Label>
            <Input type="password" />
          </FormControl>
          <Button colorScheme="cyan" _text={{ color: "white" }}>
            Register
          </Button>

          <HStack justifyContent="center">
            <Text fontSize="sm" color="muted.700" fontWeight="400">
              Returning user.{" "}
            </Text>
            <Link
              onPress={() => navigation.goBack()}
              _text={{ color: "cyan.500", bold: true, fontSize: "sm" }}
            >
              Login
            </Link>
          </HStack>
        </VStack>
      </Box>
    </KeyboardAwareScrollView>
  );
}
