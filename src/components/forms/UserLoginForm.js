import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useAuth } from "../../context/AuthProvider";
import LoginForm from "./LoginForm";
import { theme } from "../../theme";
import {
  BTN_TEXT,
  CHANGE_STATE,
  FORM_STATE,
  FORM_TITLE,
  LOGIN_TYPE,
} from "../../constants/login-form-const";
import useAuthForm from "../../hooks/useAuthForm";

const initialInput = { email: "", password: "" };
export default function UserLoginForm({ navigation }) {
  const {
    formMsg,
    resetFormMsg,
    useSignUpForm,
    useLoginForm,
    useResetPassword,
  } = useAuthForm(navigation);

  const [formState, setFormState] = useState(FORM_STATE.SIGN_UP);
  const [input, setInput] = useState(initialInput);

  useEffect(() => {
    resetFormMsg();
  }, [formState]);

  const setInputByType = (type, payload) => {
    setInput((prev) => {
      return { ...prev, [type]: payload };
    });
  };

  const handleSubmit = {
    SIGN_UP() {
      useSignUpForm(input);
    },
    LOGIN() {
      useLoginForm(input);
    },
    REST_PASSWORD() {
      useResetPassword(input.email);
    },
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

      <TouchableOpacity
        onPress={handleSubmit[formState]}
        style={styles.submitBtn}
      >
        <Text>{BTN_TEXT[formState]}</Text>
      </TouchableOpacity>
      <Text style={styles.msg}>{formMsg}</Text>

      <View style={styles.changeState}>
        {CHANGE_STATE.map((element) => {
          return (
            <TouchableOpacity
              onPress={() => setFormState(element.STATE_NAME)}
              style={styles.changeStateWrapper}
              key={element.STATE_NAME}
            >
              <Text style={styles.changeTitle}>{element.TITLE}</Text>
              <Text style={styles.changeMsg}>{element.CHANGE_MSG}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
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
  changeState: {
    marginTop: 20,
  },
  changeStateWrapper: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  changeTitle: {
    color: "grey",
  },
  changeMsg: {
    color: theme.purpleDark,
    fontSize: 16,
    marginLeft: 10,
  },
  msg: {
    marginTop: 10,
    color: theme.red,
  },
});
