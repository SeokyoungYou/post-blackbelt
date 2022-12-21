import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import profileImg from "../../../assets/images/user.png";
import { theme } from "../../theme";
import {
  getUserProfileAndName,
  USER_NAME_ERROR,
} from "../../utils/local-storage-fn/diary-async";

export default function HomeProfile({ daysInMonth, countDiary }) {
  const defaultUser = {
    profile: profileImg,
    userName: USER_NAME_ERROR,
  };
  const [user, setUser] = useState(defaultUser);
  useFocusEffect(
    useCallback(() => {
      checkUser();
      return () => {};
    }, [])
  );
  const checkUser = async () => {
    const asyncStorageUser = await getUserProfileAndName();
    setUser(asyncStorageUser);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.profileImg} source={user.profile} />
      <View style={{ alignContent: "center" }}>
        <Text style={styles.profileUserName}>{user.userName}</Text>
        <Text style={{ color: theme.grey }}>
          이번 달 {daysInMonth} 일 중 {countDiary} 일을 운동하셨습니다
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 15,
    position: "absolute",
    bottom: 10,
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  profileUserName: {
    color: theme.black,
    fontSize: 22,
    fontWeight: "400",
    marginBottom: 5,
  },
});
