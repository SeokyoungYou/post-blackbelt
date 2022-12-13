import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

import { theme } from "../../theme";
import TechPieChart from "../../components/user/TechPieChart";

import { SCREEN_NAME } from "../../constants/screen-constants";
import profileImg from "../../../assets/images/user.png";
import backgroundImg from "../../../assets/images/userBackground2.jpg";
import { getStorageUser, setDefaultUser } from "../../utils/async-storage-fn";
import {
  defaultUser,
  PROMOTION_DATE,
  START_DATE,
} from "../../constants/user-inputs-constants";
import { dateDiffInDays, dateFormatter } from "../../utils/date-fn";
import Belt from "../../components/user/Belt";
import MyPageProfile from "../../components/user/MyPageProfile";
import MyPageGoals from "../../components/user/MyPageGoals";
import MyPageHeader from "../../components/headers/MyPageHeader";

export default function MyPage({ navigation }) {
  const [user, setUser] = useState(defaultUser);
  useFocusEffect(
    useCallback(() => {
      loadUser();
      return () => {};
    }, [])
  );

  const handleNavigateEditMyPage = () => {
    navigation.navigate(SCREEN_NAME.EDIT_MY_PAGE);
  };

  const setFormattedStartDate = async (startDate) => {
    const today = new Date();
    const DDay = dateDiffInDays(today, startDate);
    const updateUser = {
      [START_DATE]: dateFormatter(startDate),
      DDay,
    };
    await setUpdateUser(updateUser);
  };
  const setFormattedpPromotionDate = async (promotionDate) => {
    const updateUser = {
      [PROMOTION_DATE]: dateFormatter(promotionDate),
    };
    await setUpdateUser(updateUser);
  };

  const setUpdateUser = async (updateUser) => {
    setUser((prevUser) => {
      return { ...prevUser, ...updateUser };
    });
  };
  const loadUser = async () => {
    const asyncStorageUser = await getStorageUser();

    const loadedUser = asyncStorageUser
      ? await setDefaultUser(asyncStorageUser)
      : defaultUser;

    await setUpdateUser(loadedUser);
    await setFormattedStartDate(new Date(loadedUser[START_DATE]));
    await setFormattedpPromotionDate(loadedUser[PROMOTION_DATE]);
  };

  return (
    <View style={styles.container}>
      <MyPageHeader navigation={navigation} />
      <View id="mypage-background" style={styles.backgroundContainer}>
        {/* <Image style={styles.backgroundImg} source={user[BACKGROUND_IMG]} /> */}
      </View>
      <View id="mypage-main" style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={handleNavigateEditMyPage}
        >
          <Text style={styles.editBtnText}>수정하기</Text>
        </TouchableOpacity>
        <Image
          id="mypage-profile-img"
          style={styles.profileImg}
          source={profileImg}
          // source={user[PROFILE_IMG]}
        />
        <View id="mypage-profile-container" style={styles.profileContainer}>
          <MyPageProfile user={user} />
          <View id="mypage-belt-container">
            <Belt user={user} />
          </View>
        </View>
        <View id="mypage-goals" style={inheritStyles.goalsSubContainer}>
          <MyPageGoals user={user} />
        </View>
        <View
          id="mypage-tech-piechart"
          style={inheritStyles.pieChartSubContainer}
        >
          <Text>나의 기술 분포도</Text>
          <TechPieChart />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editBtn: {
    padding: 8,
    backgroundColor: theme.purpleLight,
    position: "absolute",
    right: 20,
    top: -10,
    borderRadius: 10,
  },
  editBtnText: {
    fontSize: 12,
    textAlign: "center",
  },
  backgroundContainer: {
    flex: 0.4,
    // backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  mainContainer: {
    flex: 4,
    alignItems: "center",
    justifyContent: "space-around",
    position: "relative",
  },
  subContainer: {
    backgroundColor: theme.white,
    width: "90%",
    borderRadius: 10,

    alignItems: "center",
  },

  backgroundImg: {
    width: "100%",
    height: "100%",
  },
  profileImg: {
    position: "absolute",
    top: -50,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileContainer: {
    alignItems: "center",
  },
});

const inheritStyles = StyleSheet.create({
  goalsSubContainer: {
    ...styles.subContainer,
    paddingTop: 10,
    justifyContent: "space-around",
  },

  pieChartSubContainer: {
    ...styles.subContainer,
    height: 230,
    paddingTop: 10,
    // justifyContent: "center",
  },
});
