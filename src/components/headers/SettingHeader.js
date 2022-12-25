import { SCREEN_NAME } from "../../constants/screen-constants";
import { handleAlert } from "../../utils/react-native-utils";
import Header from "./Header";

export default function SettingHeader({ navigation }) {
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
      onPress: () => navigation.navigate(SCREEN_NAME.MY_PAGE),
    },
    title: `${SCREEN_NAME.SETTING}`,
    right: {
      icon: "check",
      iconColor: "white",
      onPress: handleNavigateAdmin,
    },
  };

  return <Header headerInfo={headerInfo} />;
}
