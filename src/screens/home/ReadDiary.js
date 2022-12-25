import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import Header from "../../components/headers/Header";
import { SCREEN_NAME, TAB_NAME } from "../../constants/screen-constants";
import DiaryFull from "../../components/diary/DiaryFull";
import { theme } from "../../theme";
import { handleAlert } from "../../utils/react-native-utils";
import {
  deleteDiaryById,
  getDiaryById,
} from "../../utils/local-storage-fn/sql-db";
import HalfBtn from "../../components/btns/HalfBtn";

export default function ReadDiary({ route, navigation }) {
  const diaryId = route.params.diary.id;
  const [diary, setDiary] = useState();

  useFocusEffect(
    useCallback(() => {
      loadDiary();
      return () => {};
    }, [])
  );
  const headerInfo = {
    left: {
      icon: "chevron-left",
      iconColor: "black",
      onPress: () => navigation.goBack(),
    },
    title: "Diary",
    right: {
      icon: "more-vert",
      iconColor: "white",
      onPress: () => {},
    },
  };

  const loadDiary = () => {
    getDiaryById(diaryId, handleDiary);
  };

  const handleDiary = (tx, result) => {
    setDiary(result.rows._array[0]);
  };

  const handleUpdate = () => {
    navigation.navigate(SCREEN_NAME.EDIT_DIARY, { date: diary.date });
  };

  const handleDeleteDiary = () => {
    deleteDiaryById(diary.id);
    navigation.goBack();
  };
  const handleDelete = () => {
    handleAlert(
      "일기를 삭제하시겠습니까?",
      "삭제된 데이터는 복구할 수 없습니다",
      [
        { text: "취소", onPress: () => {} },

        {
          text: "삭제",
          onPress: handleDeleteDiary,
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header headerInfo={headerInfo} />
      <View style={styles.diaryContainer}>
        {diary && <DiaryFull diary={diary} />}
      </View>
      <View style={styles.btnContainer}>
        <HalfBtn backgroundColor={theme.skyBlue} onPress={handleUpdate}>
          수정
        </HalfBtn>
        <HalfBtn backgroundColor={theme.pink} onPress={handleDelete}>
          삭제
        </HalfBtn>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  diaryContainer: {
    flex: 5,
    marginTop: 10,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
});
