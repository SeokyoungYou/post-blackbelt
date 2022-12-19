import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "../../../firebaseConfig";
import LoginForm from "./LoginForm";
import { updateFirebaseUser, updateUserEmail } from "../../utils/store";
import { theme } from "../../theme";
import FirebaseUser, {
  getFirebaseUser,
} from "../../utils/firebase-fn/firebaseuser-firebase-fn";

const LOGIN_MSG = {
  EMAIL_ERR: "이메일을 입력해주세요",
  PASSWORD_ERR: "비밀번호를 입력해주세요",
  SUCCESS: "회원가입이 완료되었습니다",
  FAIL: "회원가입에 실패하였습니다. \n계정이 있다면 로그인하거나 에러 코드를 개발자에게 문의하세요.",
};

const FORM_STATE = {
  SIGN_UP: "SIGN_UP",
  LOGIN: "LOGIN",
  REST_PASSWORD: "REST_PASSWORD",
};
const FORM_TITLE = {
  SIGN_UP: "회원가입하기",
  LOGIN: "로그인하기",
  REST_PASSWORD: "비밀번호 초기화",
};
const BTN_TEXT = {
  SIGN_UP: "계정 만들기",
  LOGIN: "로그인",
  REST_PASSWORD: "비밀번호 초기화",
};

const CHANGE_STATE = [
  {
    STATE_NAME: FORM_STATE.SIGN_UP,
    TITLE: "회원이 아니신가요?",
    CHANGE_MSG: "회원가입하기",
  },
  {
    STATE_NAME: FORM_STATE.LOGIN,
    TITLE: "이미 계정이 있으신가요?",
    CHANGE_MSG: "로그인하기",
  },
  {
    STATE_NAME: FORM_STATE.REST_PASSWORD,
    TITLE: "비밀번호를 잊어버리셨나요?",
    CHANGE_MSG: "비밀번호 초기화하기",
  },
];
const initialInput = { email: "", password: "" };
export default function UserLoginForm({ loadUser }) {
  const [formState, setFormState] = useState(FORM_STATE.SIGN_UP);
  const [input, setInput] = useState(initialInput);
  const [msg, setMsg] = useState("");
  const setInputByType = (type, payload) => {
    setInput((prev) => {
      return { ...prev, [type]: payload };
    });
  };

  const validateSubmit = () => {
    const { email, password } = input;
    if (!email) {
      setMsg(LOGIN_MSG.EMAIL_ERR);
      return false;
    }
    if (!password) {
      setMsg(LOGIN_MSG.PASSWORD_ERR);
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (validateSubmit()) {
      try {
        const firebaseUser = getFirebaseUser();
        await firebaseUser.signUp(input);
        setMsg(LOGIN_MSG.SUCCESS);
        await loadUser();
      } catch (error) {
        setMsg(`${LOGIN_MSG.FAIL}\n 에러 코드:${JSON.stringify(error.code)}`);
      }
    }
  };

  // TODO:
  const handleLogin = async () => {
    if (validateSubmit()) {
      try {
        const firebaseUser = getFirebaseUser();
        await firebaseUser.login(input);
        setMsg(LOGIN_MSG.SUCCESS);
        await loadUser();
      } catch (error) {
        setMsg(`${LOGIN_MSG.FAIL}\n 에러 코드:${JSON.stringify(error.code)}`);
      }
    }
  };
  const handleResetPassword = () => {
    console.log("restv password");
  };

  const handleSubmit = {
    SIGN_UP() {
      handleSignUp();
    },
    LOGIN() {
      handleLogin();
    },
    REST_PASSWORD() {
      handleResetPassword();
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{FORM_TITLE[formState]}</Text>
      <LoginForm
        type="EMAIL"
        text={input.email}
        setText={setInputByType.bind(this, "email")}
        secure={false}
      />

      {formState !== FORM_STATE.REST_PASSWORD && (
        <LoginForm
          type="PASSWORD"
          text={input.password}
          setText={setInputByType.bind(this, "password")}
          secure
        />
      )}

      <TouchableOpacity
        onPress={handleSubmit[formState]}
        style={styles.submitBtn}
      >
        <Text>{BTN_TEXT[formState]}</Text>
      </TouchableOpacity>
      <Text>{msg}</Text>

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
});
