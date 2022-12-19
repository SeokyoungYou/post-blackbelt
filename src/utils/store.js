/* eslint-disable no-param-reassign */
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { getFormattedToday } from "./date-fn";

// selected date in calendar
const editDiaryInital = {
  diaryCategory: "",
  techCategory: "",
  title: "",
  content: "",
};
const initialState = {
  selectedDate: getFormattedToday(),
  editDiary: editDiaryInital,
};
const date = createSlice({
  name: "dateReducer",
  initialState,
  reducers: {
    updateSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    initializeEditDiray: (state) => {
      state.editDiary = editDiaryInital;
    },
    updateEditDiary: (state, action) => {
      state.editDiary = action.payload;
    },
    updateDiaryCategory: (state, action) => {
      state.editDiary.diaryCategory = action.payload;
    },
    updateTechCategory: (state, action) => {
      state.editDiary.techCategory = action.payload;
    },
    updateTitle: (state, action) => {
      state.editDiary.title = action.payload;
    },
    updateContent: (state, action) => {
      state.editDiary.content = action.payload;
    },
  },
});

const reduxStore = configureStore({ reducer: date.reducer });
export const {
  updateSelectedDate,
  initializeEditDiray,
  updateEditDiary,
  updateDiaryCategory,
  updateTechCategory,
  updateTitle,
  updateContent,
} = date.actions;

export default reduxStore;
