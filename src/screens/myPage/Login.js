import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import GoBackHeader from "../../components/headers/GoBackHeader";
import UserLoginForm from "../../components/forms/UserLoginForm";

export default function Login({ navigation }) {
  const storeUserEmail = useSelector((state) => state.userEmail);
  const dispatch = useDispatch();
  // dispatch(updateUserEmail(""));
  return (
    <View style={styles.container}>
      <GoBackHeader navigation={navigation} title="계정 로그인 정보" />
      <View style={styles.mainContainer}>
        {storeUserEmail ? (
          <View>
            <Text>user: {storeUserEmail}</Text>
            <TouchableOpacity>
              <Text>로그아웃</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <UserLoginForm />
        )}
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
