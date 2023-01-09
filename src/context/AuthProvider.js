import { createContext, useCallback, useContext } from "react";
import AuthService from "../class/AuthService-firebase";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children, authService }) {
  const login = useCallback(() => AuthService.login.bind(authService));
  const signUp = useCallback(() => AuthService.signUp.bind(authService));
  const logout = useCallback(() => AuthService.logout.bind(authService));
  const resetPassword = useCallback(() =>
    AuthService.resetPassword.bind(authService)
  );

  return (
    <AuthContext.Provider
      value={{
        login,
        signUp,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
