import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect } from "react";
import SettingHeader from "../../components/headers/SettingHeader";
import { SCREEN_NAME } from "../../constants/screen-constants";

export default function Setting({ navigation }) {
  useEffect(() => {
    // getAllDiarys(printResult);
    // deleteAllSQLData();
    // loadData();
  }, []);

  // const auth = getAuth();
  // console.log(input);
  // createUserWithEmailAndPassword(auth, input.email, input.password)
  //   .then((userCredential) => {
  //     // Signed in
  //     // const { user } = userCredential;
  //     console.log(userCredential);
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log(error);
  //     // ..
  //   });

  return (
    <View style={styles.container}>
      <SettingHeader navigation={navigation} />
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREEN_NAME.LOGIN)}
        >
          <Text>Login</Text>
        </TouchableOpacity>
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
