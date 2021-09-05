import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Heading } from "native-base";
import React from "react";
import { STORAGE_KEYS } from "../../helpers/constants";
import { deleteToken, saveToken } from "../../helpers/utils";
import { RootStackParamList } from "../../navigator";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: HomeProps) => {
  const handleLogout = async () => {
    await deleteToken(STORAGE_KEYS.ACCESS_TOKEN);
    navigation.replace("Login");
  };
  return (
    <Box flex={1}>
      <Heading>Home</Heading>
      <Button mx={4} onPress={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Home;
