/* eslint-disable max-classes-per-file */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authService } from "../../../firebaseConfig";
import {
  AsyncFirebaseUser,
  saveStorageFirebaseUser,
  removeStorageFirebaseUser,
} from "../async-storage/user-async";
import reduxStore, { updateUserEmail } from "../store";

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
}

export const getFirebaseUser = (email = "") => {
  return new FirebaseUser(email);
};

export class FirebasUserInput {
  #email;

  #password;

  constructor(input) {
    this.#email = input.email;
    this.#password = input.password;
  }
}
