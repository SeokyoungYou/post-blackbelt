import { SafeAreaView, StyleSheet, View } from "react-native";
import DiaryScrollBox from "../../components/diary/DiaryScrollBox";
import TechHeader from "../../components/headers/TechHeader";
import { theme } from "../../theme";

export default function TechDetail({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TechHeader navigation={navigation} />
      </View>

      <SafeAreaView style={styles.scrollContainer}>
        <DiaryScrollBox navigation={navigation} />
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.black,
  },
  headerContainer: {
    flex: 1,
    marginTop: 50,
    width: "100%",
    justifyContent: "center",
  },

  scrollContainer: { flex: 12, width: "100%" },
});
