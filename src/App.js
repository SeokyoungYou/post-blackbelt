import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import reduxStore from "./utils/store";
import { theme } from "./theme";
import StackNavigation from "./navigation/StackNavigation";
import { AuthProvider } from "./context/AuthProvider";
import AuthService from "./class/AuthService-firebase";

const authService = new AuthService();

export default function App() {
  return (
    <AuthProvider authService={authService}>
      <Provider store={reduxStore}>
        <NavigationContainer>
          <StatusBar
            StatusBarStyle="light-content"
            backgroundColor={theme.purpleDark}
          />
          <StackNavigation />
        </NavigationContainer>
      </Provider>
    </AuthProvider>
  );
}
