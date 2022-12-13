import { StyleSheet, Text, View } from "react-native";

export default function TitleInputForm({ title, children }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>{title}</Text>
      <View style={styles.inputItemWrapper}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  inputTitle: {
    fontSize: 14,
    width: 88,
    lineHeight: 20,
  },
  inputItemWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
});
