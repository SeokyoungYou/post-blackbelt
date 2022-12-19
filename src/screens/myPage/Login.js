import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import GoBackHeader from "../../components/headers/GoBackHeader";
import UserLoginForm from "../../components/forms/UserLoginForm";
import FirebaseUser, {
  getFirebaseUser,
} from "../../utils/firebase-fn/firebaseuser-firebase-fn";
import {
  getStorageFirebaseUser,
  removeStorageFirebaseUser,
  saveStorageFirebaseUser,
} from "../../utils/async-storage/user-async";

export default function Login({ navigation }) {
  const [asnycEmail, setAsnycEmail] = useState("");
  // const firebaseUser = "";
  // const firebaseUser = new FirebaseUser();
  useEffect(() => {
    // removeStorageFirebaseUser();
    loadUser();
  }, []);

  const loadUser = async () => {
    // await saveStorageFirebaseUser({ hi: "hihi" });
    // setFirebaseUser();

    const asyncUser = await getStorageFirebaseUser();
    console.log(asyncUser);
    if (asyncUser) {
      setAsnycEmail(asyncUser.email);
    } else {
      setAsnycEmail("");
    }
  };
  const handleLogout = async () => {
    const firebaseUser = await getFirebaseUser(asnycEmail);
    await firebaseUser.logout();
    await loadUser();
  };

  // dispatch(updateUserEmail(""));
  return (
    <View style={styles.container}>
      <GoBackHeader navigation={navigation} title="계정 로그인 정보" />
      <View style={styles.mainContainer}>
        {asnycEmail ? (
          <View>
            <Text>user: {asnycEmail}</Text>
            <TouchableOpacity onPress={handleLogout}>
              <Text>로그아웃</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <UserLoginForm loadUser={loadUser} />
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
