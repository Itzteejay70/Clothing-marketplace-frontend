import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const USERS_KEY = "users_v1";
const SESSION_KEY = "session_user_v1";
const HAS_ACCOUNT_KEY = "cm_has_account_v1";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      setUser(saved ? JSON.parse(saved) : null);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    try {
      if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      else localStorage.removeItem(SESSION_KEY);
    } catch {}
  }, [user]);

  function getUsers() {
    try {
      const saved = localStorage.getItem(USERS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function register({ fullName, email, password }) {
    const users = getUsers();
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) throw new Error("Email already registered.");

    const newUser = {
      id: crypto?.randomUUID?.() || String(Date.now()),
      fullName,
      email,
      password,
    };

    saveUsers([...users, newUser]);

    setUser({
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: "public",
    });

    localStorage.setItem(HAS_ACCOUNT_KEY, "true");
  }

  function login({ email, password }) {
    const users = getUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) throw new Error("Invalid email or password.");

    setUser({
      id: found.id,
      fullName: found.fullName,
      email: found.email,
      role: "public",
    });

    localStorage.setItem(HAS_ACCOUNT_KEY, "true");
  }

  // ✅ Vendor login: just sets session (password validation happens in VendorLogin page)
  function vendorLogin({ email, fullName }) {
    setUser({
      id: "vendor",
      fullName: fullName || "Vendor User",
      email,
      role: "vendor",
    });
  }

  // ✅ Logout
  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, register, login, vendorLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}