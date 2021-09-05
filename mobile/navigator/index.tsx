import * as React from "react";
import { View, Text } from "react-native";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import { AuthContextValue } from "../components/contexts/AuthContext";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Splash: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

function Navigator() {
  const state = React.useContext(AuthContextValue);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state.isLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : state.userToken === null ? (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Login"
              component={Login}
            />

            <Stack.Screen
              options={{
                headerTitle: "",
                headerShadowVisible: false,
              }}
              name="Register"
              component={Register}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{
                headerTitle: "",
                headerShadowVisible: false,
              }}
              name="Home"
              component={Home}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
