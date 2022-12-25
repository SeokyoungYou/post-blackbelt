import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("MainDB"); // returns Database object

export const TB_NAME = "Diary"; // TB = Table
export const TB = {
  ALL: "*",
  ID: "id",
  DATE: "date", // YYYY-MM-DD
  DIARY_CAT: "diaryCategory",
  TECH_CAT: "techCategory",
  TITLE: "title",
  CONTENT: "content",
};
const printResult = (tx, result) => {
  const resultArr = result.rows._array;
  console.log(resultArr);
};
const handleError = (txObj, error) => {
  console.log("Error ", error);
};

export const createTable = () => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        // eslint-disable-next-line operator-linebreak
        `CREATE TABLE IF NOT EXISTS ${TB_NAME} ` +
          `(${TB.ID} INTEGER PRIMARY KEY AUTOINCREMENT, ${TB.DATE} TEXT, ${TB.DIARY_CAT} TEXT, ${TB.TECH_CAT} TEXT, ${TB.TITLE} TEXT, ${TB.CONTENT} TEXT)`
      );
    });
  } catch (e) {
    console.log(e);
  }
};

/**
 *
 * @param {string} queryKey
 * @param {(tx, result)=>{}} handleSuccess - {all}[] = result.rows._array
 */
export const getSQLData = (queryKey, handleSuccess = printResult) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT ${queryKey} FROM ${TB_NAME}`,
        [],
        handleSuccess,
        handleError
      );
    });
  } catch (e) {
    console.log(e);
  }
};

export const getAllDiarys = (handleSuccess = printResult) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT ${TB.ALL} FROM ${TB_NAME}`,
        [],
        handleSuccess,
        handleError
      );
    });
  } catch (e) {
    console.log(e);
  }
};
/**
 *
 * @param {string} yearMonth - YYYY-MM
 * @param {(tx, result)=>{}} handleSuccess - {id,date,diaryCatehory}[] = result.rows._array
 */
export const getMonthlyDiarys = (yearMonth, handleSuccess = printResult) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT ${TB.ID}, ${TB.DATE}, ${TB.DIARY_CAT} FROM ${TB_NAME} WHERE ${TB.DATE} LIKE '%${yearMonth}%'`,
        [],
        handleSuccess,
        handleError
      );
    });
  } catch (e) {
    console.log(e);
  }
};
/**
 *
 * @param {number} id
 * @param {(tx, result)=>{}} handleSuccess - {all}[] = result.rows._array
 */
export const getDiaryById = (id, handleSuccess = printResult) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT ${TB.ALL} FROM ${TB_NAME} WHERE ${TB.ID} = ?`,
        [id],
        handleSuccess,
        handleError
      );
    });
  } catch (e) {
    console.log(e);
  }
};
/**
 *
 * @param {string} - YYYY-MM-DD
 * @param {(tx, result)=>{}} handleSuccess - {all}[] = result.rows._array
 */
export const getDiaryByDate = (date, handleSuccess = printResult) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT ${TB.ALL} FROM ${TB_NAME} WHERE ${TB.DATE} = ?`,
        [date],
        handleSuccess,
        handleError
      );
    });
  } catch (e) {
    console.log(e);
  }
};
/**
 *
 * @param {string} - YYYY-MM-DD
 * @param {(tx, result)=>{}} handleSuccess - {all}[] = result.rows._array
 */

/**
 *
 * @param {string} techCat
 * @param {(tx, result)=>{}} handleSuccess - {all}[] = result.rows._array
 */
export const getDiaryIdByTechCategory = (techCat, handleSuccess) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT ${TB.ID} FROM ${TB_NAME} WHERE ${TB.TECH_CAT} = ?`,
        [techCat],
        handleSuccess,
        handleError
      );
    });
  } catch (e) {
    console.log(e);
  }
};
/**
 *
 * @param {string} techCat
 * @param {(tx, result)=>{}} handleSuccess - {all}[] = result.rows._array
 */
export const getDiaryByTechCategory = (techCat, handleSuccess) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT ${TB.ALL} FROM ${TB_NAME} WHERE ${TB.TECH_CAT} = ?`,
        [techCat],
        handleSuccess,
        handleError
      );
    });
  } catch (e) {
    console.log(e);
  }
};

/**
 *
 * @param {obejct} data - date, diaryCategory, techCategory, title, content
 * @param {(tx, result)=>{}} handleSuccess
 */
export const saveNewDiary = (data, handleSuccess = printResult) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO ${TB_NAME} (${TB.DATE}, ${TB.DIARY_CAT}, ${TB.TECH_CAT}, ${TB.TITLE}, ${TB.CONTENT}) values (?, ?, ?, ?, ?)`,
        [
          data.date,
          data.diaryCategory,
          data.techCategory,
          data.title,
          data.content,
        ],
        handleSuccess,
        handleError
      );
    });
  } catch (e) {
    console.log(e);
  }
};

/**
 *
 * @param {number} id
 * @param {object} data - date, diaryCategory, techCategory, title, content
 * @param {*} handleSuccess
 */
export const updateDiaryById = (id, data, handleSuccess = printResult) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE ${TB_NAME} SET ${TB.DATE} = ?, ${TB.DIARY_CAT}= ?, ${TB.TECH_CAT} = ?, ${TB.TITLE} = ?, ${TB.CONTENT} =? WHERE ${TB.ID} = ${id}`,
        [
          data.date,
          data.diaryCategory,
          data.techCategory,
          data.title,
          data.content,
        ],
        handleSuccess,
        handleError
      );
    });
  } catch (e) {
    console.log(e);
  }
};

export const deleteDiaryById = (id, handleSuccess = printResult) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM ${TB_NAME} WHERE id = ?`,
        [id],
        handleSuccess,
        handleError
      );
    });
  } catch (e) {
    console.log(e);
  }
};

export const deleteAllSQLData = (handleSuccess = printResult) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(`DELETE FROM ${TB_NAME}`, [], handleSuccess, handleError);
    });
  } catch (e) {
    console.log(e);
  }
};
