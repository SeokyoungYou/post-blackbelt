import { View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useEffect, useState } from "react";

import {
  BELT_COLOR_KEY,
  BELT_GRAU_KEY,
  emptyUser,
  INPUT_TITLE,
  INPUT_TYPE,
} from "../../constants/user-inputs-constants";

import HeaderEditMyPage from "../../components/headers/EditMyPageHeader";
import SingleLineForm from "../../components/forms/SingleLineForm";
import MultiLineForm from "../../components/forms/MultiLineForm";
import DatePickerForm from "../../components/forms/DatePickerForm";
import DropdownPickerForm from "../../components/forms/DropdownPickerForm";
import {
  getStorageUser,
  saveStorageUser,
  setEmptyUser,
} from "../../utils/local-storage-fn/diary-async";

export default function EditMyPage({ navigation }) {
  const [user, setUser] = useState(emptyUser);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const asyncStorageUser = await getStorageUser();
    const loadedUser = asyncStorageUser
      ? await setEmptyUser(asyncStorageUser)
      : emptyUser;
    setUser(loadedUser);
  };

  const setUserByType = (type, payload) => {
    setUser((prev) => {
      return { ...prev, [type]: payload };
    });
  };

  const handleSubmit = async () => {
    await saveStorageUser(user);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <HeaderEditMyPage navigation={navigation} handleSubmit={handleSubmit} />
      <View style={styles.inputs}>
        <KeyboardAwareScrollView>
          <SingleLineForm
            title={INPUT_TITLE[INPUT_TYPE.NAME]}
            text={user[INPUT_TYPE.NAME]}
            setText={setUserByType.bind(this, INPUT_TYPE.NAME)}
          />
          <SingleLineForm
            title={INPUT_TITLE[INPUT_TYPE.TEAM]}
            text={user[INPUT_TYPE.TEAM]}
            setText={setUserByType.bind(this, INPUT_TYPE.TEAM)}
          />

          <DatePickerForm
            title={INPUT_TITLE[INPUT_TYPE.START_DATE]}
            text={user[INPUT_TYPE.START_DATE]}
            setText={setUserByType.bind(this, INPUT_TYPE.START_DATE)}
          />

          <DropdownPickerForm
            title={INPUT_TITLE[INPUT_TYPE.BELT_COLOR]}
            text={user[INPUT_TYPE.BELT_COLOR]}
            setText={setUserByType.bind(this, INPUT_TYPE.BELT_COLOR)}
            pickerItem={BELT_COLOR_KEY}
          />
          <DropdownPickerForm
            title={INPUT_TITLE[INPUT_TYPE.BELT_GRAU]}
            text={user[INPUT_TYPE.BELT_GRAU]}
            setText={setUserByType.bind(this, INPUT_TYPE.BELT_GRAU)}
            pickerItem={BELT_GRAU_KEY}
          />

          <DatePickerForm
            title={INPUT_TITLE[INPUT_TYPE.PROMOTION_DATE]}
            text={user[INPUT_TYPE.PROMOTION_DATE]}
            setText={setUserByType.bind(this, INPUT_TYPE.PROMOTION_DATE)}
          />

          <MultiLineForm
            title={INPUT_TITLE[INPUT_TYPE.YEARLY_GOAL]}
            text={user[INPUT_TYPE.YEARLY_GOAL]}
            setText={setUserByType.bind(this, INPUT_TYPE.YEARLY_GOAL)}
          />
          <MultiLineForm
            title={INPUT_TITLE[INPUT_TYPE.MONTHLY_GOAL]}
            text={user[INPUT_TYPE.MONTHLY_GOAL]}
            setText={setUserByType.bind(this, INPUT_TYPE.MONTHLY_GOAL)}
          />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputs: {
    flex: 5,
    alignItems: "center",
    marginTop: 10,
  },
});
