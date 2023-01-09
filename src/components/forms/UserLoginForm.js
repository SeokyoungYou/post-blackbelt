import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginForm from "./authForm/LoginForm";
import { theme } from "../../theme";
import {
  FORM_STATE,
  FORM_TITLE,
  LOGIN_TYPE,
} from "../../constants/login-form-const";
import AuthSubmit from "./authForm/AuthSubmit";
import ChangeFormState from "./authForm/ChangeFormState";

const initialInput = { email: "", password: "" };

export default function UserLoginForm({ navigation }) {
  const [formState, setFormState] = useState(FORM_STATE.SIGN_UP);
  const [input, setInput] = useState(initialInput);

  const setInputByType = (type, payload) => {
    setInput((prev) => {
      return { ...prev, [type]: payload };
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{FORM_TITLE[formState]}</Text>
      <LoginForm
        type={LOGIN_TYPE.EMAIL}
        text={input.email}
        setText={setInputByType.bind(this, LOGIN_TYPE.EMAIL)}
        secure={false}
      />

      {formState !== FORM_STATE.REST_PASSWORD && (
        <LoginForm
          type={LOGIN_TYPE.PASSWORD}
          text={input.password}
          setText={setInputByType.bind(this, LOGIN_TYPE.PASSWORD)}
          secure
        />
      )}

      <AuthSubmit formState={formState} navigation={navigation} input={input} />
      <ChangeFormState setFormState={setFormState} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  submitBtn: {
    backgroundColor: theme.purpleLight,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  msg: {
    marginTop: 10,
    color: theme.red,
  },
});
