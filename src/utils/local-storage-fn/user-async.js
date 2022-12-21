import {
  containsKey,
  getStorageData,
  removeStorageData,
  saveStorageData,
  STORAGE_KEY,
} from "./diary-async";

export class AsyncFirebaseUser {
  #email;

  #localId;

  constructor(email, localId) {
    this.#email = email;
    this.#localId = localId;
  }

  getUser() {
    return { email: this.#email, localId: this.#localId };
  }
}

/**
 *
 * @param {Object} data - email, localId
 */
export const saveStorageFirebaseUser = async (data) => {
  await saveStorageData(STORAGE_KEY.FIREBASE_USER, data);
};

export const getStorageFirebaseUser = async () => {
  const hasFirebaseUser = await containsKey(STORAGE_KEY.FIREBASE_USER);
  if (!hasFirebaseUser) {
    return null;
  }
  const firebaseUser = await getStorageData(STORAGE_KEY.FIREBASE_USER);
  return firebaseUser;
};
export const removeStorageFirebaseUser = async () => {
  await removeStorageData(STORAGE_KEY.FIREBASE_USER);
};
