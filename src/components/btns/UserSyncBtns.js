import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  SNYC_BTNS_TEXT,
  SNYC_BTN_TITLE,
  SYNC_BTN_BG,
} from "../../constants/components-constants";
import { theme } from "../../theme";
import {
  replaceDirarysFromFirebase,
  uploadDiarysToFirebase,
} from "../../utils/firebase-fn/diary-firebase-fn";
import { handleAlert } from "../../utils/react-native-utils";
import HalfBtn from "./HalfBtn";

export default function UserSyncBtns() {
  const [postClickable, setPostClickable] = useState(true);
  const [getClickable, setGetClickable] = useState(true);

  const handlePost = async () => {
    handleAlert(SNYC_BTNS_TEXT.POST.TITLE, SNYC_BTNS_TEXT.POST.ALERT, [
      { text: "취소", onPress: () => {} },
      {
        text: "내보내기",
        onPress: async () => {
          await uploadDiarysToFirebase();
          setPostClickable(false);
        },
      },
    ]);
  };
  const handleGet = async () => {
    handleAlert(SNYC_BTNS_TEXT.GET.TITLE, SNYC_BTNS_TEXT.GET.ALERT, [
      { text: "취소", onPress: () => {} },
      {
        text: "가져오기",
        onPress: async () => {
          await replaceDirarysFromFirebase();
          setGetClickable(false);
        },
      },
    ]);
  };
  return (
    <View>
      <Text style={{ ...styles.title, fontSize: 16 }}>데이터 동기화</Text>
      <Text style={styles.greyText}>{SNYC_BTNS_TEXT.TITLE}</Text>
      <View style={styles.subContainer}>
        <View style={styles.btnContainer}>
          <Text style={styles.title}>일기 데이터 업로드</Text>
          <HalfBtn
            clickable={postClickable}
            onPress={handlePost}
            backgroundColor={SYNC_BTN_BG.POST[postClickable]}
          >
            {SNYC_BTN_TITLE.POST[postClickable]}
          </HalfBtn>
        </View>
        <View style={styles.btnContainer}>
          <Text style={styles.title}>일기 데이터 가져오기</Text>
          <HalfBtn
            onPress={handleGet}
            backgroundColor={SYNC_BTN_BG.GET[getClickable]}
          >
            {SNYC_BTN_TITLE.GET[getClickable]}
          </HalfBtn>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  greyText: {
    color: theme.grey,
  },
  subContainer: {
    paddingBottom: 20,
    paddingTop: 15,
  },
  btnContainer: {
    marginBottom: 10,
  },
  title: {
    marginBottom: 3,
  },
});
