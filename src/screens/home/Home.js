import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { theme } from "../../theme";
import DiaryBrief from "../../components/diary/DiaryBrief";
import HomeProfile from "../../components/user/HomeProfile";
import DiaryCalendar from "../../components/diary/DiaryCalendar";
import AddDiaryBtn from "../../components/diary/AddDiaryBtn";
import { createTable } from "../../utils/local-storage-fn/sql-db";
import {
  daysInMonth,
  getFormattedToday,
  getYearMonthByDate,
} from "../../utils/date-fn";
import { SCREEN_NAME } from "../../constants/screen-constants";
import { getStorageFirebaseUser } from "../../utils/local-storage-fn/user-async";

export default function Home({ navigation }) {
  const storeDate = useSelector((state) => state.selectedDate);
  const [countDiary, setCountDiary] = useState(0);
  const [currYearMonth, setCurrYearMonth] = useState(
    getYearMonthByDate(getFormattedToday())
  );

  useEffect(
    useCallback(() => {
      createTable();
      loadAsyncFirebaseUser();
    }, [])
  );

  const loadAsyncFirebaseUser = async () => {
    const asyncUser = await getStorageFirebaseUser();
    if (!asyncUser) {
      navigation.navigate(SCREEN_NAME.LOGIN);
    }
  };
  const handleProfilePress = () => {
    navigation.navigate(SCREEN_NAME.MY_PAGE);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        id="profile"
        style={styles.profileContainer}
        onPress={handleProfilePress}
      >
        <HomeProfile
          daysInMonth={daysInMonth(currYearMonth)}
          countDiary={countDiary}
        />
      </TouchableOpacity>
      {/* <View id="categories" style={styles.diaryCategoryContainer}>
        <DiaryCategoryPicker isPicker={false} />
      </View> */}
      <View id="calendar" style={styles.calenderContainer}>
        <DiaryCalendar
          setCountDiary={setCountDiary}
          setCurrYearMonth={setCurrYearMonth}
        />
        <AddDiaryBtn navigation={navigation} />
      </View>
      <View id="selected-diary" style={styles.diaryContainer}>
        <DiaryBrief date={storeDate} navigation={navigation} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  profileContainer: {
    flex: 1.6, // with diaryCategoryContainer: 0.9
    position: "relative",
  },
  diaryCategoryContainer: {
    flex: 0.85,
    backgroundColor: theme.white,
    marginHorizontal: theme.marginHorizontal,
    marginBottom: 10,
    borderRadius: 10,
  },
  calenderContainer: {
    flex: 7.3, // with diaryCategoryContainer: 7.5
    backgroundColor: theme.white,
    marginHorizontal: theme.marginHorizontal,
    borderRadius: 10,
  },
  diaryContainer: {
    flex: 2.8, // with diaryCategoryContainer: 2.5
    marginTop: 10,
  },
});
