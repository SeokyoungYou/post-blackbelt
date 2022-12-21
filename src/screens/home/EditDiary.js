import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFocusEffect } from "@react-navigation/native";
import DiaryEditor from "../../components/diary/DiaryEditor";
import EditDiaryHeader from "../../components/headers/EditDiaryHeader";

import { theme } from "../../theme";
import { initializeEditDiray, updateEditDiary } from "../../utils/store";
import {
  getDiaryByDate,
  saveNewDiary,
  updateDiaryById,
} from "../../utils/local-storage-fn/sql-db";
import { DIARY_INPUT, DIARY_KEYS } from "../../constants/edit-diary-constants";
import { handleAlert } from "../../utils/react-native-utils";
import DiaryCatListPicker from "../../components/pickers/DiaryCatListPicker";
import TechCatListPicker from "../../components/pickers/TechCatListPicker";

export default function EditDiary({ route, navigation }) {
  const { date } = route.params;
  const storeDiary = useSelector((state) => state.editDiary);
  const dispatch = useDispatch();
  const [currDiary, setCurrDiary] = useState({ none: true });

  useFocusEffect(
    useCallback(() => {
      getDiaryByDate(date, handleLoading);
      return () => {
        dispatch(initializeEditDiray());
      };
    }, [])
  );

  useEffect(() => {
    dispatch(updateEditDiary(currDiary));
  }, [currDiary]);

  const handleLoading = (tx, result) => {
    const loadedDiary = result.rows._array[0];

    if (loadedDiary) {
      return setCurrDiary(loadedDiary);
    }
    setCurrDiary({ none: true });
  };

  const isDiaryEmpty = async () => {
    const areEmpty = DIARY_KEYS.filter((key) => {
      return !storeDiary[key];
    });
    if (areEmpty.length !== 0) {
      const errorMsg = areEmpty.reduce(
        (acc, currValue) => `${acc}${DIARY_INPUT[currValue]}\n`,
        ""
      );
      handleAlert("다음의 항목을 입력해주세요", errorMsg, [{ text: "확인" }]);
      return true;
    }
    return false;
  };

  const handleSaveDiary = async () => {
    const newDiary = {
      date,
      ...storeDiary,
    };
    if (!currDiary.none) {
      updateDiaryById(currDiary.id, newDiary);
      navigation.goBack();
      return;
    }
    saveNewDiary(newDiary);
    navigation.goBack();
  };

  const handleSaveBtn = async () => {
    const isEmpty = await isDiaryEmpty();
    if (isEmpty) {
      return;
    }

    handleAlert("일기를 저장할까요?", "", [
      { text: "취소" },
      { text: "저장", onPress: handleSaveDiary },
    ]);
  };

  return (
    <View style={styles.container}>
      <EditDiaryHeader
        date={date}
        handleSaveBtn={handleSaveBtn}
        navigation={navigation}
      />
      <View style={{ flex: 4.8 }}>
        <KeyboardAwareScrollView>
          <View id="diary-category" style={styles.diaryCategoryContainer}>
            <Text style={styles.catTitle}>기록할 일정을 선택해주세요.</Text>
            <DiaryCatListPicker />
          </View>
          <View id="tech-category" style={styles.techCategoryContainer}>
            <Text style={styles.catTitle}>
              오늘 배운 내용을 기술 트리에 저장해보세요.
            </Text>
            <TechCatListPicker />
          </View>
          <View id="edit-diary-container" style={styles.editDirayContainer}>
            <DiaryEditor />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  catTitle: {
    fontSize: 12,
  },
  diaryCategoryContainer: {
    height: 90,
    backgroundColor: theme.white,
    margin: 10,
    marginBottom: 0,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  techCategoryContainer: {
    height: 160,
    backgroundColor: theme.white,
    margin: 10,
    marginBottom: 0,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  editDirayContainer: {
    height: 420,
    backgroundColor: theme.white,
    margin: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
