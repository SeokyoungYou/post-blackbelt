import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREEN_NAME } from "../constants/screen-constants";
import EditDiary from "../screens/home/EditDiary";
import ReadDiary from "../screens/home/ReadDiary";
import Admin from "../screens/myPage/Admin";
import EditMyPage from "../screens/myPage/EditMyPage";
import Login from "../screens/myPage/Login";
import Setting from "../screens/myPage/Setting";
import TechDetail from "../screens/techTree/TechDetail";
import TabNavigation from "./TabNavigation";

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="TabNav" component={TabNavigation} />
      {/* Diary */}
      <Stack.Screen name={SCREEN_NAME.READ_DIARY} component={ReadDiary} />
      <Stack.Screen name={SCREEN_NAME.EDIT_DIARY} component={EditDiary} />
      {/* Tech */}
      <Stack.Screen name={SCREEN_NAME.TECH_DETAIL} component={TechDetail} />
      {/* MyPage */}
      <Stack.Screen name={SCREEN_NAME.EDIT_MY_PAGE} component={EditMyPage} />
      <Stack.Screen name={SCREEN_NAME.ADMIN} component={Admin} />
      <Stack.Screen name={SCREEN_NAME.SETTING} component={Setting} />
      <Stack.Screen name={SCREEN_NAME.LOGIN} component={Login} />
    </Stack.Navigator>
  );
}
