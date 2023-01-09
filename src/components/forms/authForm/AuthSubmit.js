import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { BTN_TEXT } from "../../../constants/login-form-const";
import useAuthForm from "../../../hooks/useAuthForm";
import { theme } from "../../../theme";

export default function AuthSubmit({ formState, navigation, input }) {
  const {
    formMsg,
    resetFormMsg,
    useSignUpForm,
    useLoginForm,
    useResetPassword,
  } = useAuthForm(navigation);

  useEffect(() => {
    resetFormMsg();
  }, [formState]);

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
    <>
      <TouchableOpacity
        onPress={handleSubmit[formState]}
        style={styles.submitBtn}
      >
        <Text>{BTN_TEXT[formState]}</Text>
      </TouchableOpacity>
      <Text style={styles.msg}>{formMsg}</Text>
    </>
  );
}

const styles = StyleSheet.create({
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
