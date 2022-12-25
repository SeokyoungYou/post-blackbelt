import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
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
    handleAlert(
      "로그인한 계정에 현재 디바이스의 데이터를 내보내기할까요?",
      "",
      [
        { text: "취소", onPress: () => {} },
        {
          text: "내보내기",
          onPress: async () => {
            await uploadDiarysToFirebase();
            setPostClickable(false);
          },
        },
      ]
    );
  };
  const handleGet = async () => {
    handleAlert(
      "로그인한 계정의 일기 데이터를 가져올까요?",
      "⚠️주의: 현재 디바이스에 저장된 일기 내용과 교체됩니다. 데이터 내보내기를 먼저 진행해주세요",
      [
        { text: "취소", onPress: () => {} },
        {
          text: "가져오기",
          onPress: async () => {
            await replaceDirarysFromFirebase();
            setGetClickable(false);
          },
        },
      ]
    );
  };
  return (
    <View styles={styles.container}>
      <Text style={styles.title}>데이터 동기화</Text>
      <Text style={styles.greyText}>
        로그인한 디바이스의 데이터를 업로드해야 앱을 삭제해도 일기 데이터를
        가져올 수 있습니다. 업로드된 데이터는 저장 용도로만 사용됩니다.
      </Text>
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
    paddingHorizontal: 15,
    paddingBottom: 20,
    paddingTop: 15,
  },
  btnContainer: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 3,
  },
});
