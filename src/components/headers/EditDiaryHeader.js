import { useEffect } from "react";
import { BackHandler, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { SCREEN_NAME } from "../../constants/screen-constants";
import { theme } from "../../theme";
import { handleAlert } from "../../utils/react-native-utils";
import Header from "./Header";

export default function EditDiaryHeader({ date, handleSaveBtn, navigation }) {
  // const storeDate = useSelector((state) => state.selectedDate);
  // const { date } = route?.params;
  useEffect(() => {
    const backAction = () => {
      handleCancelBtn();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const HeaderTitle = (
    <View style={styles.headerTitleContainer}>
      <Text style={styles.headerTitle}>{date}</Text>
      <View style={styles.headerTitleBar} />
    </View>
  );

  const handleCancelBtn = () => {
    handleAlert("변경사항을 저장할까요?", "", [
      { text: "취소", onPress: () => {} },
      {
        text: "저장 안 함",
        onPress: () => navigation.goBack(),
      },
      {
        text: "저장",
        onPress: handleSaveBtn,
      },
    ]);
  };

  const headerInfo = {
    left: {
      icon: "close",
      iconColor: "black",
      onPress: handleCancelBtn,
    },
    title: HeaderTitle,
    right: {
      icon: "check",
      iconColor: "black",
      onPress: handleSaveBtn,
    },
  };

  return <Header headerInfo={headerInfo} />;
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -7,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 2,
  },
  headerTitleBar: {
    width: 120,
    height: 2.5,
    backgroundColor: theme.purple,
  },
});
