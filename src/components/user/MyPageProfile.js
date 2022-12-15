import { StyleSheet, Text, View } from "react-native";
import { NAME, START_DATE, TEAM } from "../../constants/user-inputs-constants";
import { theme } from "../../theme";

export default function MyPageProfile({ user }) {
  return (
    <>
      <Text style={styles.userName}>{user[NAME]}</Text>
      <View style={styles.userTeam}>
        <Text style={{ marginRight: 8 }}>소속</Text>
        <Text>{user[TEAM]}</Text>
      </View>
      <View style={styles.userInfos}>
        <Text style={styles.userInfo}>
          주짓수를 {user[START_DATE]} 에 시작해서
        </Text>
        <Text style={styles.userInfo}>오늘 {user.DDay} 일이 되었어요.</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  userName: {
    marginTop: 45,
    fontSize: 22,
    fontWeight: "500",
  },
  userTeam: {
    flexDirection: "row",
    marginTop: 8,
    alignItems: "center",
  },
  userInfos: {
    alignItems: "center",
    marginVertical: 10,
  },
  userInfo: {
    color: theme.grey,
    fontSize: 11.5,
  },
});
