import { StyleSheet, View } from "react-native";
import GoBackHeader from "../../components/headers/GoBackHeader";
import UserLoginForm from "../../components/forms/UserLoginForm";

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <GoBackHeader navigation={navigation} title="계정 로그인 정보" />
      <View style={styles.mainContainer}>
        <UserLoginForm navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 4.4,
    alignItems: "center",
    padding: 25,
  },
});
