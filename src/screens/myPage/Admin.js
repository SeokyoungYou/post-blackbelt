import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../theme";
import {
  removeStorageData,
  STORAGE_KEY,
} from "../../utils/local-storage-fn/diary-async";
import { deleteAllSQLData } from "../../utils/local-storage-fn/sql-db";

export default function Admin({ navigation }) {
  const handleRemoveUserData = () => {
    removeStorageData(STORAGE_KEY.USER);
  };
  const handleRemoveDiaryData = () => {
    deleteAllSQLData();
  };
  const handleNavigate = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={handleRemoveUserData}>
        <Text>유저 데이터 전체 삭제</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={handleRemoveDiaryData}>
        <Text>일기 데이터 전체 삭제</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.btn, backgroundColor: theme.skyBlue }}
        onPress={handleNavigate}
      >
        <Text>이전 페이지로 이동</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    padding: 20,
    backgroundColor: theme.lightred,
    marginBottom: 30,
  },
});
