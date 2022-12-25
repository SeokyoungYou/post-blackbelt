import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme";
import {
  replaceDirarysFromFirebase,
  uploadDiarysToFirebase,
} from "../../utils/firebase-fn/diary-firebase-fn";
import { getAllDiarys } from "../../utils/local-storage-fn/sql-db";
import HalfBtn from "./HalfBtn";

const BTN_BG = {
  POST: {
    [true]: theme.GUARD_PASS,
    [false]: theme.lightgrey,
  },
  GET: {
    [true]: theme.skyBlue,
    [false]: theme.lightgrey,
  },
};
const BTN_TITLE = {
  POST: {
    [true]: "데이터 내보내기",
    [false]: "데이터 내보내기가 완료되었습니다.",
  },
  GET: {
    [true]: "데이터 가져오기",
    [false]: "데이터 가져오기가 완료되었습니다.",
  },
};

export default function UserSyncBtns() {
  const [postClickable, setPostClickable] = useState(true);
  const [getClickable, setGetClickable] = useState(true);

  const handlePost = async () => {
    await uploadDiarysToFirebase();
    setPostClickable(false);
  };
  const handleGet = async () => {
    await replaceDirarysFromFirebase();
    setGetClickable(false);
  };
  return (
    <View styles={styles.container}>
      <Text style={styles.title}>데이터 동기화</Text>
      <Text style={styles.greyText}>
        로그인한 디바이스의 데이터를 업로드해야 앱을 삭제하여도 일기 데이터를
        가져올 수 있습니다. 업로드된 데이터는 저장 용도로만 사용됩니다.
      </Text>
      <View style={styles.subContainer}>
        <View style={styles.btnContainer}>
          <Text style={styles.title}>일기 데이터 업로드</Text>
          <HalfBtn
            clickable={postClickable}
            onPress={handlePost}
            backgroundColor={BTN_BG.POST[postClickable]}
          >
            {BTN_TITLE.POST[postClickable]}
          </HalfBtn>
        </View>
        <View style={styles.btnContainer}>
          <Text style={styles.title}>일기 데이터 업로드</Text>
          <HalfBtn
            onPress={handleGet}
            backgroundColor={BTN_BG.GET[getClickable]}
          >
            {BTN_TITLE.GET[getClickable]}
          </HalfBtn>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
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
