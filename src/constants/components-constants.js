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

export const SNYC_BTNS_TEXT = {
  TITLE:
    "로그인한 디바이스의 데이터를 업로드해야 앱을 삭제해도 일기 데이터를 가져올 수 있습니다. 업로드된 데이터는 저장 용도로만 사용됩니다.",
  POST: {
    TITLE: "로그인한 계정에 현재 디바이스의 데이터를 내보내기할까요?",
    ALERT: "⚠️주의: 현재 디바이스의 일기들이 로그인한 계정에 업로드됩니다.",
  },
  GET: {
    TITLE: "로그인한 계정의 일기 데이터를 가져올까요?",
    ALERT:
      "⚠️주의: 현재 디바이스에 저장된 일기 내용과 교체됩니다. 데이터 내보내기를 먼저 진행해주세요",
  },
};

export const SETTING_LOGIN = {
  TEXT: "데이터 동기화 등 사용자 기능을 사용하려면 로그인해주세요.",
  SUBTEXT:
    "(참고:데이터를 업로드해야 앱을 삭제하여도 일기 데이터를 가져올 수 있습니다)",
};
