import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import {
  deleteAllSQLData,
  getAllDiarys,
  saveNewDiary,
} from "../local-storage-fn/sql-db";
import { getStorageFirebaseUser } from "../local-storage-fn/user-async";

const COLLECTION = {
  DIARYS: "diarys",
};

export const uploadDiarysToFirebase = async () => {
  getAllDiarys(handleUploadDiarysToFirebase);
};
const handleUploadDiarysToFirebase = async (tx, result) => {
  const diarys = result.rows._array;
  const uploadData = {
    diarys: JSON.stringify(diarys),
  };
  const userEmail = await getStorageFirebaseUser();
  await setDoc(doc(db, COLLECTION.DIARYS, userEmail.email), uploadData);
};

export const replaceDirarysFromFirebase = async () => {
  deleteAllSQLData();
  const userEmail = await getStorageFirebaseUser();
  const docSnap = await getDoc(doc(db, COLLECTION.DIARYS, userEmail.email));
  const diarys = JSON.parse(docSnap.data().diarys);
  diarys.map((diary) => {
    delete diary.id;
    saveNewDiary(diary);
  });
};
