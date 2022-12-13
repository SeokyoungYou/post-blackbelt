import { StyleSheet, Text, View } from "react-native";
import { authService } from "../../../firebaseConfig";
import Header from "../../components/headers/Header";
import { SCREEN_NAME } from "../../constants/screen-constants";
import { handleAlert } from "../../utils/react-native-utils";

export default function Auth({ navigation }) {
  console.log(authService.currentUser);

  const handleNavigateAdmin = () => {
    handleAlert("모든 데이터를 삭제합니다", "개발자 모드", [
      { text: "취소" },
      {
        text: "이동",
        onPress: () => {
          navigation.navigate(SCREEN_NAME.ADMIN);
        },
      },
    ]);
  };

  const headerInfo = {
    left: {
      icon: "chevron-left",
      iconColor: "black",
      onPress: () => {
        navigation.navigate(SCREEN_NAME.MY_PAGE);
      },
    },
    title: `Auth`,
    right: {
      icon: "delete",
      iconColor: "white",
      onPress: handleNavigateAdmin,
    },
  };
  return (
    <View style={styles.container}>
      <Header headerInfo={headerInfo} />
      <Text>Auth</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
