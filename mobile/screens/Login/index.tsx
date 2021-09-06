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
  Spinner,
} from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigator";
import useLogin from "../../hooks/auth/useLogin";
import { AuthContextDispatch } from "../../components/contexts/AuthContext";
import { Formik } from "formik";
import { authSchema } from "../../helpers/validationSchemas/authSchema";

type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation }: LoginProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { signIn } = React.useContext(AuthContextDispatch);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { mutate, isLoading, data } = useLogin();

  const handleLogin = (loginData: { email: string; password: string }) => {
    console.log(loginData);
    mutate(loginData, {
      onSuccess: ({ access_token }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        signIn(access_token);
      },
    });
  };

  return (
    <Center safeArea flex={1} bgColor="white">
      <Box flex={1} p={2} w="90%">
        <Heading mt={4} size="lg" color="primary.500">
          Welcome
        </Heading>
        <Heading>Sign in to continue</Heading>

        <VStack space={2} mt={5}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={authSchema.login}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <>
                <FormControl isRequired isInvalid={"email" in errors}>
                  <FormControl.Label
                    _text={{
                      color: "muted.700",
                      fontSize: "sm",
                      fontWeight: 600,
                    }}
                  >
                    Email ID
                  </FormControl.Label>
                  <Input
                    onBlur={handleBlur("email")}
                    placeholder="Enter email address"
                    onChangeText={handleChange("email")}
                    value={values.email}
                  />
                  <FormControl.ErrorMessage>
                    {errors.email}
                  </FormControl.ErrorMessage>
                </FormControl>

                <FormControl mb={5} isRequired isInvalid={"password" in errors}>
                  <FormControl.Label
                    _text={{
                      color: "muted.700",
                      fontSize: "sm",
                      fontWeight: 600,
                    }}
                  >
                    Password
                  </FormControl.Label>
                  <Input
                    type="password"
                    onBlur={handleBlur("password")}
                    placeholder="Enter Password"
                    onChangeText={handleChange("password")}
                    value={values.password}
                  />
                  <FormControl.ErrorMessage>
                    {errors.password}
                  </FormControl.ErrorMessage>
                  <Link
                    _text={{
                      fontSize: "xs",
                      fontWeight: "700",
                      color: "cyan.500",
                    }}
                    alignSelf="flex-end"
                  >
                    Forget Password
                  </Link>
                </FormControl>
                <Button
                  onPress={handleSubmit}
                  colorScheme="cyan"
                  _text={{ color: "white" }}
                >
                  <HStack>
                    <Text color="white">Login </Text>
                    {isLoading && <Spinner color="white" size="sm" />}
                  </HStack>
                </Button>

                <HStack justifyContent="center">
                  <Text fontSize="sm" color="muted.700" fontWeight="400">
                    I&#39;m a new user.{" "}
                  </Text>
                  <Link
                    _text={{ color: "cyan.500", bold: true, fontSize: "sm" }}
                    onPress={() => navigation.navigate("Register")}
                  >
                    Sign Up
                  </Link>
                </HStack>
                {data && <Text>{JSON.stringify(data)}</Text>}
              </>
            )}
          </Formik>
        </VStack>
      </Box>
    </Center>
  );
}
