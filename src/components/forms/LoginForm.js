import { StyleSheet, Text, View } from "react-native";
import { LOGIN_FORM } from "../../constants/login-form-const";
import LoginInput from "./inputs/LoginInput";
import TitleInputForm from "./TitleInputForm";

export default function LoginForm({ text, setText, type }) {
  return (
    <View style={styles.container}>
      <TitleInputForm title={LOGIN_FORM.TITLE[type]}>
        <LoginInput
          text={text}
          setText={setText}
          title={LOGIN_FORM.TITLE[type]}
          secure={LOGIN_FORM.SECURE[type]}
        />
      </TitleInputForm>
      <Text style={styles.msg}>{LOGIN_FORM.VAL_MSG[type]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    marginBottom: 30,
    width: "100%",
  },
  msg: {
    marginTop: 1,
    // textAlign: "left",
    marginLeft: 10,
    color: "gray",
    fontSize: 13,
  },
});
