import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { authService } from "../../firebaseConfig";
import {
  AsyncFirebaseUser,
  saveStorageFirebaseUser,
  removeStorageFirebaseUser,
} from "../utils/local-storage-fn/user-async";

export default class AuthService {
  #email;

  constructor() {
    this.#email = "";
  }

  email() {
    return this.#email;
  }

  localLogin(email) {
    this.#email = email;
  }

  async signUp(input) {
    const signUpData = await createUserWithEmailAndPassword(
      authService,
      input.email,
      input.password
    );
    this.#handleFetchUser(signUpData);
  }

  async login(input) {
    const loginData = await signInWithEmailAndPassword(
      authService,
      input.email,
      input.password
    );
    await this.#handleFetchUser(loginData);
  }

  async logout() {
    authService.signOut();
    this.#email = "";
    this.#removeAsyncStorageUser();
  }

  async resetPassword(email) {
    await sendPasswordResetEmail(authService, email);
  }

  async #handleFetchUser(fetchUser) {
    const { email, localId } = fetchUser._tokenResponse;
    const asyncUser = new AsyncFirebaseUser(email, localId);
    this.#email = email;
    this.#saveAsyncStorageUser(asyncUser.emailAndIdObj);
  }

  async #saveAsyncStorageUser(userData) {
    saveStorageFirebaseUser(userData);
  }

  async #removeAsyncStorageUser() {
    removeStorageFirebaseUser();
  }
}
