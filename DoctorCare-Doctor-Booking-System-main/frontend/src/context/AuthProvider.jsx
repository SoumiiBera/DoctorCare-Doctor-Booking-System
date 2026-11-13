import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./auth-context";

const USER_KEY = "doctorcare_user";
const TOKEN_KEY = "doctorcare_token";

function readStoredUser() {
  try {
    const user = JSON.parse(localStorage.getItem(USER_KEY));
    return user && localStorage.getItem(TOKEN_KEY) ? user : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  const login = useCallback((userData, token) => {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    localStorage.setItem(TOKEN_KEY, token);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, login, logout, isLoggedIn: Boolean(user) }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
