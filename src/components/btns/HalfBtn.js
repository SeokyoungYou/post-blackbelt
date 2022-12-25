import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HalfBtn({
  children,
  backgroundColor,
  onPress,
  clickable = true,
}) {
  return (
    <TouchableOpacity
      style={{ ...styles.btn, backgroundColor }}
      onPress={clickable ? onPress : () => {}}
      activeOpacity={clickable ? 0.5 : 1}
    >
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});
