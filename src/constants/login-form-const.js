export const FORM_STATE = {
  SIGN_UP: "SIGN_UP",
  LOGIN: "LOGIN",
  REST_PASSWORD: "REST_PASSWORD",
};

export const LOGIN_MSG = {
  EMAIL_ERR: "이메일을 형식에 맞게 입력해주세요",
  PASSWORD_ERR: "비밀번호를 형식에 맞게 입력해주세요",
  SUCCESS: "회원가입/로그인이 완료되었습니다",
  FAIL: "회원가입/로그인에 실패하였습니다. \n계정이 있다면 로그인하거나 정보를 다시 입력해주세요.",
};

export const RESET_PASSWORD_MSG = {
  SUCCESS:
    "입력하신 이메일로 보낸 링크를 클릭하여 비밀번호를 재설정하세요. 수신된 메일이 없다면 스팸함을 확인하거나 초기화 버튼을 다시 눌러주세요.",
  FAIL: "비밀번호 초기화에 실패하였습니다. \n계정을 올바르게 입력해주세요.",
};

export const FORM_TITLE = {
  SIGN_UP: "회원가입하기",
  LOGIN: "로그인하기",
  REST_PASSWORD: "비밀번호 재설정하기",
};
export const BTN_TEXT = {
  SIGN_UP: "계정 만들기",
  LOGIN: "로그인",
  REST_PASSWORD: "비밀번호 재설정",
};

export const CHANGE_STATE = [
  {
    STATE_NAME: FORM_STATE.SIGN_UP,
    TITLE: "회원이 아니신가요?",
    CHANGE_MSG: "회원가입하기",
  },
  {
    STATE_NAME: FORM_STATE.LOGIN,
    TITLE: "이미 계정이 있으신가요?",
    CHANGE_MSG: "로그인하기",
  },
  {
    STATE_NAME: FORM_STATE.REST_PASSWORD,
    TITLE: "비밀번호를 잊어버리셨나요?",
    CHANGE_MSG: "비밀번호 초기화하기",
  },
];

export const LOGIN_TYPE = {
  EMAIL: "email",
  PASSWORD: "password",
};

export const LOGIN_FORM = {
  TITLE: {
    email: "이메일",
    password: "비밀번호",
  },
  SECURE: {
    email: false,
    password: true,
  },
  VAL_MSG: {
    email:
      "이메일 형식을 지켜주세요.(@ 포함)\n존재하지 않은 이메일을 사용하면 비밀번호를 초기화할 수 없습니다.",
    password: "6 자 이상을 입력하세요.",
  },
};
