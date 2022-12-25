import { StyleSheet, Text, View } from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import SettingHeader from "../../components/headers/SettingHeader";
import { SCREEN_NAME } from "../../constants/screen-constants";
import { getStorageFirebaseUser } from "../../utils/local-storage-fn/user-async";
import { getFirebaseUser } from "../../utils/firebase-fn/firebaseuser-fn";
import WideBtn from "../../components/btns/WideBtn";
import { theme } from "../../theme";
import UserSyncBtns from "../../components/btns/UserSyncBtns";
import { handleAlert } from "../../utils/react-native-utils";
import { SETTING_LOGIN } from "../../constants/components-constants";

const LOGOUT_USER = "로그인한 계정이 없습니다.";

export default function Setting({ navigation }) {
  const [asnycEmail, setAsnycEmail] = useState(LOGOUT_USER);

  useFocusEffect(
    useCallback(() => {
      loadUser();
    }, [])
  );

  const loadUser = async () => {
    const asyncUser = await getStorageFirebaseUser();
    if (asyncUser) {
      setAsnycEmail(asyncUser.email);
    } else {
      setAsnycEmail(LOGOUT_USER);
    }
  };

  const handleLogout = async () => {
    handleAlert("로그아웃하시겠습니까?", "", [
      { text: "취소", onPress: () => {} },
      {
        text: "로그아웃",
        onPress: async () => {
          const firebaseUser = getFirebaseUser(asnycEmail);
          await firebaseUser.logout();
          await loadUser();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <SettingHeader navigation={navigation} />
      <View style={styles.mainContainer}>
        <View style={styles.subContainer}>
          <Text style={styles.userEmailText}>로그인 정보: {asnycEmail}</Text>
          <Text style={styles.userEmail} />
          {asnycEmail !== LOGOUT_USER ? (
            <View>
              <UserSyncBtns userEmail={asnycEmail} />
              <WideBtn onPress={handleLogout} backgroundColor={theme.pink}>
                로그아웃
              </WideBtn>
            </View>
          ) : (
            <View>
              <WideBtn
                backgroundColor={theme.purpleLight}
                onPress={() => navigation.navigate(SCREEN_NAME.LOGIN)}
              >
                계정 만들기 / 로그인
              </WideBtn>
              <Text style={styles.btnMsg}>{SETTING_LOGIN.TEXT}</Text>
              <Text style={styles.greyText}>{SETTING_LOGIN.SUBTEXT}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userEmailText: {
    fontSize: 18,
  },
  mainContainer: {
    flex: 4.4,
    padding: 25,
  },
  subContainer: {
    // alignItems: "center",
    width: "100%",
  },
  btnMsg: {
    color: theme.grey,
    marginTop: 5,
  },
  greyText: {
    color: theme.grey,
  },
});
