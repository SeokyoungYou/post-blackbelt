import { StyleSheet, Text, View } from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import SettingHeader from "../../components/headers/SettingHeader";
import { SCREEN_NAME } from "../../constants/screen-constants";
import WideBtn from "../../components/btns/WideBtn";
import { theme } from "../../theme";
import UserSyncBtns from "../../components/btns/UserSyncBtns";
import { handleAlert } from "../../utils/react-native-utils";
import { SETTING_LOGIN } from "../../constants/components-constants";
import { useAuth } from "../../context/AuthProvider";

const LOGOUT_USER = "로그인한 계정이 없습니다.";

export default function Setting({ navigation }) {
  const auth = useAuth();
  const [email, setEmail] = useState(LOGOUT_USER);

  useFocusEffect(
    useCallback(() => {
      loadUser();
    }, [])
  );

  const loadUser = async () => {
    setEmail(auth.email() || LOGOUT_USER);
  };

  const handleLogout = async () => {
    handleAlert("로그아웃하시겠습니까?", "", [
      { text: "취소", onPress: () => {} },
      {
        text: "로그아웃",
        onPress: async () => {
          await auth.logout();
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
          <Text style={styles.userEmailText}>로그인 정보: {email}</Text>
          <Text style={styles.userEmail} />
          {email !== LOGOUT_USER ? (
            <View>
              <UserSyncBtns userEmail={email} />
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
