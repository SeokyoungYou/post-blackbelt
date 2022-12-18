import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { theme } from "../../../theme";

export default function LoginInput({ text, setText, title, secure }) {
  const [backgroundColor, setBackgroundColor] = useState(theme.white);

  const onChangeText = (payload) => {
    setBackgroundColor(theme.purpleLight);
    setText(payload);
  };
  return (
    <TextInput
      onChangeText={onChangeText}
      value={text}
      secureTextEntry={secure}
      placeholder={`${title}(을/를) 입력하세요`}
      autoCapitalize="none"
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
