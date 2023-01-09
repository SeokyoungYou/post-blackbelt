import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CHANGE_STATE } from "../../../constants/login-form-const";

import { theme } from "../../../theme";

export default function ChangeFormState({ setFormState }) {
  return (
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
  );
}

const styles = StyleSheet.create({
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
