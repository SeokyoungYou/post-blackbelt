import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { theme } from "../../theme";
import { DIARY_CAT_IMG_SRC } from "../../constants/diary-category-constants";
import {
  getDiaryByDate,
  getDiaryById,
} from "../../utils/local-storage-fn/sql-db";
import { TECH_CAT_MAP } from "../../constants/tech-category-constants";
import { SCREEN_NAME } from "../../constants/screen-constants";

export default function DiaryBrief({ date, id, navigation }) {
  const [diary, setDiary] = useState({});
  const [techCat, setTechCat] = useState("STANDING");
  useFocusEffect(
    useCallback(() => {
      loadDiary();
    }, [])
  );
  useEffect(() => {
    loadDiary();
  }, [date]);

  const loadDiary = () => {
    if (date) {
      return getDiaryByDate(date, handleDiary);
    }
    if (id) {
      return getDiaryById(id, handleDiary);
    }
  };

  const handleDiary = (tx, result) => {
    setDiary(result.rows._array[0]);
    if (result.rows.length !== 0) {
      return setTechCat(result.rows._array[0].techCategory);
    }
    setTechCat("STANDING");
  };
  const handleOnPress = () => {
    if (diary) {
      navigation.navigate(SCREEN_NAME.READ_DIARY, { diary });
    }
  };

  return (
    <TouchableOpacity style={styles.diaryContainer} onPress={handleOnPress}>
      {!diary ? (
        <Text style={styles.noDiaryText}>
          일기가 없습니다. 운동을 기록해보세요.
        </Text>
      ) : (
        <>
          <Text style={styles.date}>{diary.date}</Text>
          <View style={styles.diaryRow}>
            <Text style={styles.diaryRowTitle}>카테고리</Text>
            {diary?.diaryCategory && (
              <Image
                style={styles.diaryCategory}
                source={DIARY_CAT_IMG_SRC[diary?.diaryCategory]}
              />
            )}
            {techCat && (
              <View
                style={{
                  ...styles.techCategory,
                  backgroundColor: theme[diary?.techCategory],
                }}
              >
                <Text style={styles.techCategoryTitle}>
                  {TECH_CAT_MAP[techCat].ENG}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.diaryRow}>
            <Text style={styles.diaryRowTitle}>제목</Text>
            <Text style={styles.diaryRowContent}>{diary?.title}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.diaryRowTitle}>내용</Text>
            <Text style={styles.diaryRowContent}>{diary?.content}</Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  diaryContainer: {
    backgroundColor: theme.white,
    marginHorizontal: theme.marginHorizontal,
    marginVertical: 5,
    borderRadius: 10,
    padding: 15,
  },
  date: {
    color: theme.purpleDark,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  techCategory: {
    padding: 5,
    alignContent: "center",
    borderRadius: 3,
  },
  techCategoryTitle: {
    fontSize: 12,
  },
  noDiaryText: {
    color: theme.grey,
  },
  diaryCategory: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 15,
  },
  diaryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    // overflow: "hidden",
    width: "90%",
    height: 34,
    lineHeight: 20,
  },
  diaryRowTitle: {
    color: theme.grey,
    fontSize: 13,
    marginRight: 10,
  },
  diaryRowContent: {
    fontSize: 13,
    lineHeight: 17,
    // alignSelf: "stretch",
  },
});
