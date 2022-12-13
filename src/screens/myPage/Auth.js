import { Text, View } from "react-native";
import { authService } from "../../../firebaseConfig";

export default function Auth() {
  console.log(authService.currentUser);
  return (
    <View>
      <Text>Auth</Text>
    </View>
  );
}
