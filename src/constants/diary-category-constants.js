import lessonDayImg from "../../assets/icons/lessonDay.png";
import sparringDayImg from "../../assets/icons/sparringDay.png";
import competitionImg from "../../assets/icons/competition.png";
import promotionImg from "../../assets/icons/promotion.png";
import openMatImg from "../../assets/icons/openMat.png";

export const DIARY_CAT_KEY = "diaryCategory";
const LESSON_DAY = "LESSON_DAY";
const SPARRING_DAY = "SPARRING_DAY";
const COMPETITON = "COMPETITON";
const PROMOTION = "PROMOTION";
const OPEN_MAT = "OPEN_MAT";
const DIARY_CAT_NAME = {
  ENG: {
    LESSON_DAY: "Lesson day",
    SPARRING_DAY: "Sparring day",
    COMPETITON: "Competition",
    PROMOTION: "Promotion",
    OPEN_MAT: "Open Mat",
  },
  KOR: {
    LESSON_DAY: "기술 연습",
    SPARRING_DAY: "스파링 데이",
    COMPETITON: "대회",
    PROMOTION: "승급",
    OPEN_MAT: "오픈 매트",
  },
};
export const DIARY_CAT_IMG_SRC = {
  LESSON_DAY: lessonDayImg,
  SPARRING_DAY: sparringDayImg,
  COMPETITON: competitionImg,
  PROMOTION: promotionImg,
  OPEN_MAT: openMatImg,
};

export const DIARY_CAT_IDX = {
  LESSON_DAY: 0,
  SPARRING_DAY: 1,
  COMPETITON: 2,
  PROMOTION: 3,
  OPEN_MAT: 4,
};

export const DIARY_CAT = [
  {
    ID: LESSON_DAY,
    ENG: DIARY_CAT_NAME.ENG.LESSON_DAY,
    KOR: DIARY_CAT_NAME.KOR.LESSON_DAY,
    IMG_SRC: DIARY_CAT_IMG_SRC.LESSON_DAY,
  },
  {
    ID: SPARRING_DAY,
    ENG: DIARY_CAT_NAME.ENG.SPARRING_DAY,
    KOR: DIARY_CAT_NAME.KOR.SPARRING_DAY,
    IMG_SRC: DIARY_CAT_IMG_SRC.SPARRING_DAY,
  },
  {
    ID: COMPETITON,
    ENG: DIARY_CAT_NAME.ENG.COMPETITON,
    KOR: DIARY_CAT_NAME.KOR.COMPETITON,
    IMG_SRC: DIARY_CAT_IMG_SRC.COMPETITON,
  },
  {
    ID: PROMOTION,
    ENG: DIARY_CAT_NAME.ENG.PROMOTION,
    KOR: DIARY_CAT_NAME.KOR.PROMOTION,
    IMG_SRC: DIARY_CAT_IMG_SRC.PROMOTION,
  },
  {
    ID: OPEN_MAT,
    ENG: DIARY_CAT_NAME.ENG.OPEN_MAT,
    KOR: DIARY_CAT_NAME.KOR.OPEN_MAT,
    IMG_SRC: DIARY_CAT_IMG_SRC.OPEN_MAT,
  },
];

export const DIARY_CAT_MAP = {
  LESSON_DAY: {
    ID: LESSON_DAY,
    ENG: DIARY_CAT_NAME.ENG.LESSON_DAY,
    KOR: DIARY_CAT_NAME.KOR.LESSON_DAY,
    IMG_SRC: DIARY_CAT_IMG_SRC.LESSON_DAY,
  },
  SPARRING_DAY: {
    ID: SPARRING_DAY,
    ENG: DIARY_CAT_NAME.ENG.SPARRING_DAY,
    KOR: DIARY_CAT_NAME.KOR.SPARRING_DAY,
    IMG_SRC: DIARY_CAT_IMG_SRC.SPARRING_DAY,
  },
  COMPETITON: {
    ID: COMPETITON,
    ENG: DIARY_CAT_NAME.ENG.COMPETITON,
    KOR: DIARY_CAT_NAME.KOR.COMPETITON,
    IMG_SRC: DIARY_CAT_IMG_SRC.COMPETITON,
  },
  PROMOTION: {
    ID: PROMOTION,
    ENG: DIARY_CAT_NAME.ENG.PROMOTION,
    KOR: DIARY_CAT_NAME.KOR.PROMOTION,
    IMG_SRC: DIARY_CAT_IMG_SRC.PROMOTION,
  },
  OPEN_MAT: {
    ID: OPEN_MAT,
    ENG: DIARY_CAT_NAME.ENG.OPEN_MAT,
    KOR: DIARY_CAT_NAME.KOR.OPEN_MAT,
    IMG_SRC: DIARY_CAT_IMG_SRC.OPEN_MAT,
  },
};
