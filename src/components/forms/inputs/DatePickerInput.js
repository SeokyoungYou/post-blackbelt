import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { theme } from "../../../theme";
import { dateFormatter } from "../../../utils/date-fn";

export default function DatePickerInput({ text, setText, placeholder }) {
  const [backgroundColor, setBackgroundColor] = useState(theme.white);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
    setDate(selectedDate);
    setText(dateFormatter(selectedDate));
  };
  const showDatepicker = () => {
    setBackgroundColor(theme.purpleLight);
    setShow(true);
  };

  return (
    <TouchableOpacity onPress={showDatepicker} style={styles.touchable}>
      <TextInput
        pointerEvents="none"
        value={text}
        editable={false}
        placeholder={`${placeholder}(을/를) 입력하세요`}
        style={{ ...styles.input, backgroundColor }}
      />
      {show && (
        <DateTimePicker
          style={styles.datePicker}
          testID="dateTimePicker"
          value={date}
          mode="date"
          onChange={onChange}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingVertical: 15,
    paddingTop: 15,
    paddingHorizontal: 25,
    width: 230,
    borderRadius: 30,
    fontSize: 14,
    justifyContent: "center",
    color: theme.black,
  },
  touchable: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  datePicker: {
    position: "absolute",
    zIndex: 10,
    width: 100,
    left: 0,
    backgroundColor: theme.white,
    height: 50,
    borderRadius: 50,
  },
});
