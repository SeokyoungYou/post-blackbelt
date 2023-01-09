import { useState } from "react";
import { LOGIN_MSG, RESET_PASSWORD_MSG } from "../constants/login-form-const";
import { SCREEN_NAME } from "../constants/screen-constants";
import { useAuth } from "../context/AuthProvider";

const useAuthForm = (navigation) => {
  const auth = useAuth();
  const [formMsg, setFormMsg] = useState("");

  const validateEmail = (email) => {
    if (!email || !email.includes("@")) {
      setFormMsg(LOGIN_MSG.EMAIL_ERR);
      return false;
    }
    return true;
  };

  const validatePassword = (password) => {
    if (!password || password.length < 6) {
      setFormMsg(LOGIN_MSG.PASSWORD_ERR);
      return false;
    }
    return true;
  };

  const useSignUpForm = async (input) => {
    if (!validateEmail(input.email) || !validatePassword(input.password)) {
      return;
    }

    try {
      await auth.signUp(input);
      setFormMsg(LOGIN_MSG.SUCCESS);
      navigation.navigate(SCREEN_NAME.SETTING);
    } catch (error) {
      setFormMsg(`${LOGIN_MSG.FAIL}\n에러 코드:${JSON.stringify(error.code)}`);
    }
  };

  const useLoginForm = async (input) => {
    if (!validateEmail(input.email) || !validatePassword(input.password)) {
      return;
    }
    try {
      await auth.login(input);
      setFormMsg(LOGIN_MSG.SUCCESS);
      navigation.navigate(SCREEN_NAME.SETTING);
    } catch (error) {
      setFormMsg(`${LOGIN_MSG.FAIL}\n에러 코드:${JSON.stringify(error.code)}`);
    }
  };

  const useResetPassword = async (email) => {
    if (!validateEmail(email)) {
      return;
    }

    try {
      await auth.resetPassword(email);
      setFormMsg(RESET_PASSWORD_MSG.SUCCESS);
    } catch (error) {
      setFormMsg(
        `${RESET_PASSWORD_MSG.FAIL}\n 에러 코드:${JSON.stringify(error.code)}`
      );
    }
  };

  const resetFormMsg = () => {
    setFormMsg("");
  };

  return {
    formMsg,
    resetFormMsg,
    useSignUpForm,
    useLoginForm,
    useResetPassword,
  };
};

export default useAuthForm;
