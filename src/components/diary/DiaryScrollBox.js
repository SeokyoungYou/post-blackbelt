import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme";
import { getFormattedToday } from "../../utils/date-fn";
import { getDiaryIdByTechCategory } from "../../utils/local-storage-fn/sql-db";
import DiaryBrief from "./DiaryBrief";

export default function DiaryScrollBox({ navigation }) {
  const { techTitle } = navigation.getState().routes[1].params;
  const [diarys, setDiarys] = useState([]);
  const [loading, setLoading] = useState(false);
  useFocusEffect(
    useCallback(() => {
      loadData();
      return () => {
        // setDataArr([]);
      };
    }, [])
  );

  const handleData = async (tx, result) => {
    setDiarys(result.rows._array);
    setLoading(true);
    // setDataObj((prev) => {
    //   return {
    //     ...prev,
    //     [tech.ID]: techData,
    //   };
    // });
  };

  const loadData = async () => {
    getDiaryIdByTechCategory(techTitle, handleData);
  };

  return (
    <View style={styles.container}>
      {!loading ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView
          vertical
          alwaysBounceVertical
          showsVerticalScrollIndicator
          contentContainerStyle={styles.diarysContainer}
        >
          {diarys?.map((v) => {
            return <DiaryBrief key={v.id} id={v.id} navigation={navigation} />;
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  diarysContainer: {},
});
