import { SCREEN_NAME } from "../../constants/screen-constants";
import { handleAlert } from "../../utils/react-native-utils";
import Header from "./Header";

export default function HeaderEditMyPage({ navigation, handleSubmit }) {
  const handleNavigateMypage = () => {
    handleAlert("변경사항을 저장할까요?", "", [
      { text: "취소", onPress: () => {} },
      {
        text: "저장 안 함",
        onPress: () => navigation.goBack(),
      },
      {
        text: "저장",
        onPress: handleSubmit,
      },
    ]);
  };

  const handleSave = () => {
    handleSubmit();
    // navigation.goBack();
  };

  const headerInfo = {
    left: {
      icon: "chevron-left",
      iconColor: "black",
      onPress: handleNavigateMypage,
    },
    title: `Edit ${SCREEN_NAME.MY_PAGE}`,
    right: {
      icon: "check",
      iconColor: "black",
      onPress: handleSave,
    },
  };

  return <Header headerInfo={headerInfo} />;
}
