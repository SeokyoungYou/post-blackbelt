import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function WideBtn({ children, backgroundColor, onPress }) {
  return (
    <TouchableOpacity
      style={{ ...styles.btn, backgroundColor }}
      onPress={onPress}
    >
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 70,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});
