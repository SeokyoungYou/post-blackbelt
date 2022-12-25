/* eslint-disable max-classes-per-file */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { authService } from "../../../firebaseConfig";
import {
  AsyncFirebaseUser,
  saveStorageFirebaseUser,
  removeStorageFirebaseUser,
} from "../local-storage-fn/user-async";

export class FirebaseUser {
  #email;

  constructor(email) {
    this.#email = email;
  }

  get email() {
    return this.#email;
  }

  async loginWithEmail(email) {}

  async signUp(input) {
    const signUpData = await createUserWithEmailAndPassword(
      authService,
      input.email,
      input.password
    );
    this.handleFetchUser(signUpData);
  }

  async login(input) {
    const loginData = await signInWithEmailAndPassword(
      authService,
      input.email,
      input.password
    );
    this.handleFetchUser(loginData);
  }

  async handleFetchUser(fetchUser) {
    const { email, localId } = fetchUser._tokenResponse;
    const user = new AsyncFirebaseUser(email, localId);
    this.#email = email;
    this.saveAsyncStorageUser(user.getUser());
  }

  async saveAsyncStorageUser(userData) {
    saveStorageFirebaseUser(userData);
  }

  async removeAsyncStorageUser() {
    removeStorageFirebaseUser();
  }

  async logout() {
    authService.signOut();
    this.#email = "";
    this.removeAsyncStorageUser();
  }

  async resetPassword() {
    await sendPasswordResetEmail(authService, this.#email);
  }
}

export const getFirebaseUser = (email = "") => {
  return new FirebaseUser(email);
};
