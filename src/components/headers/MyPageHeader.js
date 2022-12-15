import { SCREEN_NAME } from "../../constants/screen-constants";
import Header from "./Header";

export default function MyPageHeader({ navigation }) {
  const headerInfo = {
    left: {
      icon: "edit",
      iconColor: "black",
      onPress: () => {
        navigation.navigate(SCREEN_NAME.EDIT_MY_PAGE);
      },
    },
    title: SCREEN_NAME.MY_PAGE,
    right: {
      icon: "settings",
      iconColor: "black",
      onPress: () => {
        navigation.navigate(SCREEN_NAME.SETTING);
      },
    },
  };

  return <Header headerInfo={headerInfo} />;
}
