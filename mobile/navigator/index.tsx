import * as React from "react";
import { View, Text } from "react-native";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { getTokenValue } from "../helpers/utils";
import { STORAGE_KEYS } from "../helpers/constants";
import Home from "../screens/Home";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigator() {
  const [isAppReady, setAppReady] = React.useState(false);
  const [initialRoute, setInitialRoute] = React.useState<"Home" | "Login">(
    "Login"
  );

  React.useEffect(() => {}, []);

  async function _cacheResourcesAsync() {
    async function getToken() {
      const accessToken = await getTokenValue(STORAGE_KEYS.ACCESS_TOKEN);
      console.log({ accessTokens: accessToken });
      if (accessToken) {
        setInitialRoute("Home");
      } else {
        setInitialRoute("Login");
      }
    }
    return getToken();
  }

  if (!isAppReady) {
    return (
      <AppLoading
        startAsync={_cacheResourcesAsync}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    );
  }
  console.log({ initialRoute });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
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

        <Stack.Screen
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
