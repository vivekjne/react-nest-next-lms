import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  ScrollView,
  View,
} from "native-base";
import React from "react";

import { AuthContextDispatch } from "../../components/contexts/AuthContext";
import { RootStackParamList } from "../../navigator";
import CategoryList from "./CategoryList";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: HomeProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { signOut } = React.useContext(AuthContextDispatch);

  const handleLogout = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    signOut();
  };
  return (
    <View flex={1} w={"100%"} px={4}>
      <CategoryList />
    </View>
  );
};

export default Home;
