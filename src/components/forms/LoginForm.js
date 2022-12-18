import { StyleSheet, Text, View } from "react-native";
import LoginInput from "./inputs/LoginInput";
import TitleInputForm from "./TitleInputForm";

const TITLE = {
  EMAIL: "이메일",
  PASSWORD: "비밀번호",
};
const SECURE = {
  EMAIL: false,
  PASSWORD: true,
};
const VAL_MSG = {
  EMAIL:
    "이메일 형식을 지켜주세요.(@ 포함)\n존재하지 않은 이메일을 사용하면 비밀번호를 초기화할 수 없습니다.",
  PASSWORD: "6 자 이상을 입력하세요.",
};
export default function LoginForm({ text, setText, type }) {
  return (
    <View style={styles.container}>
      <TitleInputForm title={TITLE[type]}>
        <LoginInput
          text={text}
          setText={setText}
          title={TITLE[type]}
          secure={SECURE[type]}
        />
      </TitleInputForm>
      <Text style={styles.msg}>{VAL_MSG[type]}</Text>
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
