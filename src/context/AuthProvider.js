import { createContext, useCallback, useContext } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ authService, children }) {
  const localLogin = authService.localLogin.bind(authService);
  const login = authService.login.bind(authService);
  const signUp = authService.signUp.bind(authService);
  const logout = authService.logout.bind(authService);
  const resetPassword = authService.resetPassword.bind(authService);
  return (
    <AuthContext.Provider
      value={{
        localLogin,
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
