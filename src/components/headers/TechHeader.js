import { MaterialCommunityIcons } from "@expo/vector-icons";

import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "../../theme";
import { SCREEN_NAME } from "../../constants/screen-constants";
import { TECH_CAT_MAP } from "../../constants/tech-category-constants";

export default function TechHeader({ navigation }) {
  const { techTitle } = navigation.getState().routes[1].params;

  return (
    <TouchableOpacity
      style={styles.TitleContainer}
      onPress={() => navigation.navigate(SCREEN_NAME.TECH_TREE)}
    >
      <MaterialCommunityIcons
        name="chevron-left"
        size={50}
        color={theme[techTitle]}
        style={styles.backIcon}
      />
      <Text style={{ ...styles.title, color: theme[techTitle] }}>
        {TECH_CAT_MAP[techTitle].TITLE}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  TitleContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    // textShadowColor: theme.purple,
    // textShadowRadius: 5,
  },
  backIcon: { position: "absolute", left: 10 },
});
