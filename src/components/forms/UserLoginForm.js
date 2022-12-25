import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import LoginForm from "./LoginForm";
import { theme } from "../../theme";
import { getFirebaseUser } from "../../utils/firebase-fn/firebaseuser-fn";
import {
  BTN_TEXT,
  CHANGE_STATE,
  FORM_STATE,
  FORM_TITLE,
  LOGIN_MSG,
  LOGIN_TYPE,
  RESET_PASSWORD_MSG,
} from "../../constants/login-form-const";
import { SCREEN_NAME } from "../../constants/screen-constants";

// class UserForm {
//   #email;

//   #password;

//   constructor(email, password) {
//     this.#email = email;
//     this.#password = password;
//   }

//   get email() {
//     return this.#email;
//   }

//   get password() {
//     return this.#password;
//   }
// }

const initialInput = { email: "", password: "" };
export default function UserLoginForm({ navigation }) {
  const [formState, setFormState] = useState(FORM_STATE.SIGN_UP);
  const [input, setInput] = useState(initialInput);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setMsg("");
  }, [formState]);

  const setInputByType = (type, payload) => {
    setInput((prev) => {
      return { ...prev, [type]: payload };
    });
  };

  const validateEmail = () => {
    const { email } = input;
    if (!email || !email.includes("@")) {
      setMsg(LOGIN_MSG.EMAIL_ERR);
      return false;
    }
    return true;
  };
  const validatePassword = () => {
    const { password } = input;
    if (!password || password.length < 6) {
      setMsg(LOGIN_MSG.PASSWORD_ERR);
      return false;
    }
    return true;
  };

  const validateSubmit = () => {
    if (!validateEmail() || !validatePassword()) {
      return false;
    }
    return true;
  };

  const handleAuth = async (authMethod) => {
    if (!validateSubmit()) {
      return;
    }

    try {
      const firebaseUser = getFirebaseUser();
      await firebaseUser[authMethod](input);
      setMsg(LOGIN_MSG.SUCCESS);
      navigation.navigate(SCREEN_NAME.SETTING);
    } catch (error) {
      setMsg(`${LOGIN_MSG.FAIL}\n에러 코드:${JSON.stringify(error.code)}`);
    }
  };

  const handleResetPassword = async () => {
    if (!validateEmail()) {
      return;
    }
    try {
      const firebaseUser = getFirebaseUser(input.email);
      await firebaseUser.resetPassword();
      setMsg(RESET_PASSWORD_MSG.SUCCESS);
    } catch (error) {
      setMsg(
        `${RESET_PASSWORD_MSG.FAIL}\n 에러 코드:${JSON.stringify(error.code)}`
      );
    }
  };

  const handleSubmit = {
    SIGN_UP() {
      handleAuth("signUp");
    },
    LOGIN() {
      handleAuth("login");
    },
    REST_PASSWORD() {
      handleResetPassword();
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
      <Text style={styles.msg}>{msg}</Text>

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
