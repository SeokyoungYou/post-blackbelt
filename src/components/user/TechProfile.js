import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import profileImg from "../../../assets/images/profile.png";
import { theme } from "../../theme";
import {
  getUserProfileAndName,
  USER_NAME_ERROR,
} from "../../utils/local-storage-fn/diary-async";

export default function TechProfile() {
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
    if (!asyncStorageUser) {
      return setUser(defaultUser);
    }
    setUser(asyncStorageUser);
  };
  return (
    <View style={styles.profileContainer}>
      <View style={styles.positioner}>
        <Image style={styles.profileImg} source={user.profile} />
        <Text style={styles.title}>
          {user.userName === USER_NAME_ERROR
            ? user.userName
            : `${user.userName} 's technique tree`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  positioner: {
    position: "absolute",
    alignItems: "center",
    bottom: 0,
  },
  profileImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  title: {
    marginVertical: 13,
    color: theme.white,
    fontSize: 18,
    fontWeight: "500",
  },
});
