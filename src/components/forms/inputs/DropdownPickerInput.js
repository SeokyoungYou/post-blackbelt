import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../../theme";
import DropdownPicker from "../../pickers/DropdownPicker";

export default function DropdownPickerInput({ text, setText, pickerItem }) {
  const [backgroundColor, setBackgroundColor] = useState(theme.white);

  const handleOnValueChange = (itemValue) => {
    setBackgroundColor(theme.purpleLight);
    setText(itemValue);
  };

  return (
    <SafeAreaView style={{ ...styles.input, backgroundColor }}>
      <DropdownPicker
        pickerItem={pickerItem}
        selectedData={text}
        onValueChange={handleOnValueChange}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 25,
    width: 230,
    borderRadius: 30,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    // height: 10,
  },
});
