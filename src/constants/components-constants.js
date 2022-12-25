import { theme } from "../theme";

export const SYNC_BTN_BG = {
  POST: {
    [true]: theme.GUARD_PASS,
    [false]: theme.lightgrey,
  },
  GET: {
    [true]: theme.skyBlue,
    [false]: theme.lightgrey,
  },
};
export const SNYC_BTN_TITLE = {
  POST: {
    [true]: "데이터 내보내기",
    [false]: "데이터 내보내기가 완료되었습니다.",
  },
  GET: {
    [true]: "데이터 가져오기",
    [false]: "데이터 가져오기가 완료되었습니다.",
  },
};
