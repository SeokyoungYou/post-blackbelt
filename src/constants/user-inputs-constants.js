import { themeBelt } from "../theme";
import profileImg from "../../assets/images/user.png";
import backgroundImg from "../../assets/images/userBackground.jpg";
import { getFormattedToday } from "../utils/date-fn";

export const defaultUser = {
  NAME: "이름을 입력해주세요",
  TEAM: "소속을 입력해주세요",
  BACKGROUND_IMG: backgroundImg,
  PROFILE_IMG: profileImg,
  START_DATE: getFormattedToday(),
  BELT_COLOR: "WHITE",
  DDay: 0,
  BELT_GRAU: 0,
  PROMOTION_DATE: getFormattedToday(),
  YEARLY_GOAL: "올해의 목표를 입력해주세요",
  MONTHLY_GOAL: "이 달의 목표를 입력해주세요",
};
export const emptyUser = {
  NAME: "",
  TEAM: "",
  BACKGROUND_IMG: backgroundImg,
  PROFILE_IMG: profileImg,
  START_DATE: "",
  BELT_COLOR: "",
  DDay: "",
  BELT_GRAU: "",
  PROMOTION_DATE: "",
  YEARLY_GOAL: "",
  MONTHLY_GOAL: "",
};

export const NAME = "NAME";
export const TEAM = "TEAM";
export const BACKGROUND_IMG = "BACKGROUND_IMG";
export const PROFILE_IMG = "PROFILE_IMG";
export const START_DATE = "START_DATE";
export const BELT_COLOR = "BELT_COLOR";
export const BELT_GRAU = "BELT_GRAU";
export const PROMOTION_DATE = "PROMOTION_DATE";
export const YEARLY_GOAL = "YEARLY_GOAL";
export const MONTHLY_GOAL = "MONTHLY_GOAL";
export const INPUT_TYPE = {
  NAME: "NAME",
  TEAM: "TEAM",
  BACKGROUND_IMG: "BACKGROUND_IMG",
  PROFILE_IMG: "PROFILE_IMG",
  START_DATE: "START_DATE",
  BELT_COLOR: "BELT_COLOR",
  BELT_GRAU: "BELT_GRAU",
  PROMOTION_DATE: "PROMOTION_DATE",
  YEARLY_GOAL: "YEARLY_GOAL",
  MONTHLY_GOAL: "MONTHLY_GOAL",
};
export const INPUT_TITLE = {
  NAME: "이름",
  TEAM: "소속",
  START_DATE: "주짓수 시작일",
  BELT_COLOR: "벨트 색상",
  BELT_GRAU: "그라우",
  PROMOTION_DATE: "최근 승급일",
  YEARLY_GOAL: "올해의 목표",
  MONTHLY_GOAL: "이 달의 목표",
};

export const INPUT_MAX_LEN = {
  SINGLE_LINE: 15,
  MULTI_LINE: 25,
};
export const INPUT_ERROR_MSG = {
  NAME: `공백 포함 ${INPUT_MAX_LEN.SINGLE_LINE} 자`,
  TEAM: `공백 포함 ${INPUT_MAX_LEN.SINGLE_LINE} 자`,
  START_DATE: "날짜를 선택하세요",
  BELT_COLOR: "색상을 선택하세요",
  BELT_GRAU: "숫자를 선택하세요",
  PROMOTION_DATE: "날짜를 선택하세요",
  YEARLY_GOAL: `공백 포함 ${INPUT_MAX_LEN.MULTI_LINE} 자`,
  MONTHLY_GOAL: `공백 포함 ${INPUT_MAX_LEN.MULTI_LINE} 자`,
};

export const BELT_COLOR_KEY = ["WHITE", "BLUE", "PURPLE", "BROWN", "BLACK"];
export const BELT_COLOR_MAP = {
  WHITE: {
    KOR: "화이트",
    BELT_COLOR: themeBelt.white,
    RANKBAR_COLOR: themeBelt.black,
  },
  BLUE: {
    KOR: "블루",
    BELT_COLOR: themeBelt.blue,
    RANKBAR_COLOR: themeBelt.black,
  },
  PURPLE: {
    KOR: "퍼플",
    BELT_COLOR: themeBelt.purple,
    RANKBAR_COLOR: themeBelt.black,
  },
  BROWN: {
    KOR: "브라운",
    BELT_COLOR: themeBelt.brown,
    RANKBAR_COLOR: themeBelt.black,
  },
  BLACK: {
    KOR: "블랙",
    BELT_COLOR: themeBelt.black,
    RANKBAR_COLOR: themeBelt.red,
  },
};

export const BELT_GRAU_KEY = ["0", "1", "2", "3", "4"];
