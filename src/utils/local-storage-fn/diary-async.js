import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  defaultUser,
  INPUT_TYPE,
  NAME,
  PROFILE_IMG,
} from "../../constants/user-inputs-constants";
import profileImg from "../../../assets/images/user.png";

// utils

export const STORAGE_KEY = {
  USER: "@user",
  FIREBASE_USER: "@firebaseUser",
};

export const isIncludeKey = (userObject, key) => {
  return Object.keys(userObject).includes(key);
};

export const setEmptyUser = async (asyncStorageUser) => {
  for (const type in INPUT_TYPE) {
    asyncStorageUser[type] = isIncludeKey(asyncStorageUser, type)
      ? asyncStorageUser[type]
      : "";
  }
  return asyncStorageUser;
};
export const setDefaultUser = async (asyncStorageUser) => {
  for (const type in INPUT_TYPE) {
    if (
      !isIncludeKey(asyncStorageUser, type) ||
      asyncStorageUser[type] === ""
    ) {
      asyncStorageUser[type] = defaultUser[type];
    }
  }
  return asyncStorageUser;
};

export const USER_NAME_ERROR = "사용자 정보를 입력해주세요";

// Manage object datas
// Async Storage functions
export const saveStorageData = async (key, value) => {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (e) {
    console.error(e.message);
  }
};

export const getStorageData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const data = JSON.parse(value);
      return data;
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const removeStorageData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(e.message);
  }
};

export const containsKey = async (key) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys.includes(key);
  } catch (e) {
    console.error(e.message);
  }
};

// user storage functions
/**
 * user info
 * @typedef {Object} user
 * @property {string} BACKGROUND_IMG - image src
 * @property {string} PROFILE_IMG - image src
 * @property {string} NAME
 * @property {string} TEAM
 * @property {string} START_DATE - YYYY-MM-DD
 * @property {string} BELT_COLOR
 * @property {string} BELT_GRAU - number
 * @property {string} PROMOTION_DATE - YYYY-MM-DD
 * @property {string} YEARLY_GOAL
 * @property {string} MONTHLY_GOAL
 */
export const saveStorageUser = async (data) => {
  // const prevData = await getStorageUser();
  // const newData = prevData === null ? data : { ...prevData, ...data };
  await saveStorageData(STORAGE_KEY.USER, data);
};

export const getStorageUser = async () => {
  const hasUser = await containsKey(STORAGE_KEY.USER);
  if (!hasUser) {
    return null;
  }
  const user = await getStorageData(STORAGE_KEY.USER);
  return user;
};
export const removeStorageUser = async () => {
  await removeStorageData(STORAGE_KEY.USER);
};

export const getUserProfileAndName = async () => {
  const user = await getStorageUser();
  let profile = profileImg;
  let userName = USER_NAME_ERROR;
  if (user) {
    if (isIncludeKey(user, PROFILE_IMG)) {
      profile = user[PROFILE_IMG];
    }
    if (isIncludeKey(user, NAME) && user[NAME] !== "") {
      userName = user[NAME];
    }
  }
  return { profile, userName };
};
