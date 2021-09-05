import * as React from "react";
import { STORAGE_KEYS } from "../../helpers/constants";
import { storage } from "../../helpers/utils";

export const AuthContextDispatch = React.createContext<any>(null);
export const AuthContextValue = React.createContext<any>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };

        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      } catch (e) {}

      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (token: string) => {
        await storage.saveItem(STORAGE_KEYS.ACCESS_TOKEN, token);
        dispatch({ type: "SIGN_IN", token });
      },
      signOut: async () => {
        await storage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (token: string) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        await storage.saveItem(STORAGE_KEYS.ACCESS_TOKEN, token);
        dispatch({ type: "SIGN_IN", token });
      },
    }),
    []
  );

  return (
    <AuthContextDispatch.Provider value={authContext}>
      <AuthContextValue.Provider value={state}>
        {children}
      </AuthContextValue.Provider>
    </AuthContextDispatch.Provider>
  );
}
