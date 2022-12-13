import { StyleSheet, TextInput } from "react-native";
import { theme } from "../../theme";

export default function InputForm() {
  const [text, setText] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(theme.white);

  const onChangeText = (payload) => {
    setBackgroundColor(theme.lightred);
    setText(payload);
  };
  return (
    <TextInput
      onChangeText={onChangeText}
      value={text}
      //   maxLength={lineInputProp.maxLength}
      //   multiline={lineInputProp.multiline}
      placeholder={` 입력하세요`}
      style={{ ...styles.input, backgroundColor }}
    />
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
  },
});
