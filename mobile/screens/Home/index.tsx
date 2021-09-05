import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Heading } from "native-base";
import React from "react";
import { AuthContextDispatch } from "../../components/contexts/AuthContext";
import { STORAGE_KEYS } from "../../helpers/constants";
import { storage } from "../../helpers/utils";
import { RootStackParamList } from "../../navigator";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: HomeProps) => {
  const { signOut } = React.useContext(AuthContextDispatch);

  const handleLogout = async () => {
    signOut();
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
