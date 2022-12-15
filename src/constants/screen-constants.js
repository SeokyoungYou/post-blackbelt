export const TAB_NAME = {
  HOME: "HomeTab",
  TECH_TREE: "TechTreeTab",
  MY_PAGE: "MyPageTab",
};

export const SCREEN_NAME = {
  HOME: "Home",
  TECH_TREE: "Tech Tree",
  MY_PAGE: "My Page",
  TECH_DETAIL: "Tech Detail",
  LOGIN: "Login",
  EDIT_MY_PAGE: "Edit My Page",
  EDIT_DIARY: "Write Diary",
  READ_DIARY: "Read Diary",
  ADMIN: "Admin",
  SETTING: "Setting",
};

export const NAV_ICON_MAP = {
  [SCREEN_NAME.HOME]: {
    [true]: "home",
    [false]: "home-outline",
  },
  [SCREEN_NAME.TECH_TREE]: {
    [true]: "albums",
    [false]: "albums-outline",
  },
  [SCREEN_NAME.MY_PAGE]: {
    [true]: "person",
    [false]: "person-outline",
  },
};
