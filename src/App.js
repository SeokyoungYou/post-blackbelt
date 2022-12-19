import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import reduxStore from "./utils/store";
import { theme } from "./theme";
import StackNavigation from "./navigation/StackNavigation";

export default function App() {
  return (
    <Provider store={reduxStore}>
      <NavigationContainer>
        <StatusBar
          StatusBarStyle="light-content"
          backgroundColor={theme.purpleDark}
        />
        <StackNavigation />
      </NavigationContainer>
    </Provider>
  );
}
