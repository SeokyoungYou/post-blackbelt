import { Calendar } from "react-native-calendars";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { DIARY_CAT_IMG_SRC } from "../../constants/diary-category-constants";
import {
  getFormattedToday,
  getYearMonthByDate,
  getYearMonthByString,
} from "../../utils/date-fn";
import { updateSelectedDate } from "../../utils/store";
import { theme } from "../../theme";
import { getMonthlyDiarys } from "../../utils/local-storage-fn/sql-db";

export default function DiaryCalendar(props) {
  const today = getFormattedToday();
  const yearMonth = getYearMonthByDate(today);
  const [selectedDay, setSelectedDay] = useState(today);
  const [selectedYearMonth, setSelectedYearMonth] = useState(yearMonth);
  const [days, setDays] = useState({});
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      loadMonthlyDays();
      setSelectedDay(today);
      return () => {
        setSelectedDay("");
      };
    }, [])
  );

  useEffect(() => {
    if (selectedDay !== "") {
      dispatch(updateSelectedDate(selectedDay));
    }
  }, [selectedDay]);

  useEffect(() => {
    loadMonthlyDays();
    props.setCurrYearMonth(selectedYearMonth);
  }, [selectedYearMonth]);

  const loadMonthlyDays = () => {
    getMonthlyDiarys(selectedYearMonth, handleMonthyDiarys);
  };

  const handleMonthyDiarys = async (tx, result) => {
    const resultArr = result.rows._array;
    const monthlyDays = await resultArr.reduce((accum, v) => {
      return { ...accum, [v.date]: { diaryCategory: v.diaryCategory } };
    }, {});
    props.setCountDiary(resultArr.length);
    setDays(monthlyDays);
    await handleMarkingDays();
  };

  const checkMarkingToday = (compareDay, updateMark) => {
    if (compareDay === today) {
      return { today: true, ...updateMark };
    }
    return updateMark;
  };

  const setMarkingDays = async (day, newMarking) => {
    setDays((prevState) => {
      const prevMarking = prevState[day];
      return {
        ...prevState,
        [day]: { ...prevMarking, ...newMarking },
      };
    });
  };

  const handleMarkingDays = async () => {
    if (today === selectedDay) {
      return setMarkingDays(today, {
        today: true,
        selected: true,
      });
    }
    await setMarkingDays(today, { today: true });
    await setMarkingDays(selectedDay, { selected: true });
  };

  const handleMarkingSelected = (date) => {
    const { dateString: currSelectedDay } = date;

    // delete previous selected mark
    const prevMarking = checkMarkingToday(selectedDay, { selected: false });
    setMarkingDays(selectedDay, prevMarking);

    // create or add selected object to markedDays
    const currMarking = checkMarkingToday(currSelectedDay, { selected: true });
    setMarkingDays(currSelectedDay, currMarking);

    setSelectedDay(currSelectedDay);
  };
  const handleOnMonthChange = ({ year, month }) => {
    const newyearMonth = getYearMonthByString(year, month);
    setSelectedYearMonth(newyearMonth);
  };

  const createCalendar = ({ date, state, marking }) => {
    return (
      <TouchableOpacity
        key={date.dateString}
        // eslint-disable-next-line react/jsx-no-bind
        onPress={handleMarkingSelected.bind(this, date)}
        style={{
          ...styles.calDate,
          backgroundColor: marking?.today && "rgba(168, 216, 235, 0.4)",
        }}
        disabled={state === "disabled"}
      >
        <Text
          style={{
            ...styles.calDateText,
            color: state === "disabled" ? "gray" : theme.black,
          }}
        >
          {date.day}
        </Text>

        {marking?.diaryCategory && (
          <Image
            style={styles.calDateImg}
            source={DIARY_CAT_IMG_SRC[marking?.diaryCategory]}
          />
        )}

        {marking?.selected === true && <View style={styles.calSelected} />}
      </TouchableOpacity>
    );
  };

  return (
    <Calendar
      style={styles.calendar}
      theme={{
        backgroundColor: "#ffffff",
        calendarBackground: "#ffffff",
        monthTextColor: theme.purpleDark,
        arrowColor: theme.purpleDark,
        textMonthFontSize: 20,
        textMonthFontWeight: "400",
      }}
      initialDate={selectedDay}
      enableSwipeMonths
      disableAllTouchEventsForDisabledDays
      markedDates={days}
      dayComponent={createCalendar}
      onMonthChange={handleOnMonthChange}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },

  calenderContainer: {
    flex: 7.5,
    backgroundColor: theme.white,
    marginHorizontal: theme.marginHorizontal,
    borderRadius: 10,
  },
  calendar: {
    borderRadius: 10,
  },
  calDate: {
    height: 50,
    width: 45,
    alignItems: "center",
    borderRadius: 10,
    marginBottom: -5,
  },
  calDateText: {
    fontSize: 9,
    textAlign: "center",
  },
  calDateImg: {
    marginTop: 3,
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  calSelected: {
    width: 30,
    height: 2,
    backgroundColor: theme.purple,
    position: "absolute",
    bottom: 4,
  },
  diaryContainer: {
    flex: 2.5,
  },
});
