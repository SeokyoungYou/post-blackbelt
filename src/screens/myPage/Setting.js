import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import SettingHeader from "../../components/headers/SettingHeader";
import { authService } from "../../../firebaseConfig";
import getEnvVars from "../../../environment";

export default function Setting({ navigation }) {
  const [token, setToken] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: getEnvVars().WEB_STANDALONE_APP_CLIENT_ID,
    webClientId: getEnvVars().WEB_STANDALONE_APP_CLIENT_ID,
    androidClientId: getEnvVars().ANDROID_STANDALONE_APP_CLIENT_ID,
    iosClientId: getEnvVars().IOS_STANDALONE_APP_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { idToken, accessToken } = response.authentication;
      setToken(response.authentication.accessToken);
      const credential = GoogleAuthProvider.credential(idToken, accessToken);
      signInWithCredential(authService, credential);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <SettingHeader navigation={navigation} />
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.googleBtn}
          onPress={async () => {
            await promptAsync();
          }}
        >
          <AntDesign name="google" size={24} color="black" />
          <Text style={styles.googleText}>구글 계정으로 로그인하기</Text>
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
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
  },
  googleText: {
    marginLeft: 5,
  },
});
