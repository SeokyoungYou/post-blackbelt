import { Image, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../theme";
import {
  DIARY_CAT_IMG_SRC,
  DIARY_CAT_MAP,
} from "../../constants/diary-category-constants";
import { TECH_CAT_MAP } from "../../constants/tech-category-constants";
import { isIncludeKey } from "../../utils/local-storage-fn/diary-async";

export default function DiaryFull({ diary }) {
  return (
    <View style={styles.diaryContainer}>
      <View style={styles.dateRow}>
        <MaterialIcons
          name="calendar-today"
          size={18}
          color={theme.purpleDark}
        />
        <Text style={styles.date}>{diary.date}</Text>
      </View>
      <View style={styles.diaryRow}>
        <Text style={styles.diaryRowTitle}>일기 카테고리</Text>
        <Text style={styles.diaryRowContent}>
          {DIARY_CAT_MAP[diary?.diaryCategory].KOR}
        </Text>
        <Image
          style={styles.diaryCategory}
          source={DIARY_CAT_IMG_SRC[diary?.diaryCategory]}
        />
      </View>
      <View style={styles.diaryRow}>
        <Text style={styles.diaryRowTitle}>기술 카테고리</Text>
        <View
          style={{
            ...styles.techCategory,
            backgroundColor: theme[diary?.techCategory],
          }}
        >
          <Text style={styles.techCategoryTitle}>
            {TECH_CAT_MAP[diary?.techCategory].ENG}
          </Text>
        </View>
      </View>
      <View style={styles.diaryRow}>
        <Text style={styles.diaryRowTitle}>제목</Text>
        <Text style={styles.diaryRowContent}>{diary?.title}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.diaryRowTitle}>일기 내용</Text>
        <Text style={styles.contents}>{diary?.content}</Text>
      </View>
    </View>
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
  dateRow: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  date: {
    color: theme.purpleDark,
    // textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 5,
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
    marginLeft: 3,
  },
  diaryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  content: {
    // flexDirection: "row",
    // alignItems: "center",
    // overflow: "hidden",
    // width: "90%",
    lineHeight: 20,
    gap: 30,
  },
  contents: {
    fontSize: 13,
    lineHeight: 17,
    marginTop: 5,
  },
  diaryRowTitle: {
    color: theme.grey,
    fontSize: 13,
    marginRight: 10,
  },
  diaryRowContent: {
    fontSize: 13,
    lineHeight: 17,
  },
});
