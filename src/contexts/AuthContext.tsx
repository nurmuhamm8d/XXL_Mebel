"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { login as apiLogin } from "@/utils/api";
import { AuthCredentials } from "@/types";
import {
  AUTH_COOKIE_NAME,
  LOCAL_TOKEN_STORAGE_KEY,
  LOCAL_USERNAME_STORAGE_KEY,
  LOCAL_USERS_STORAGE_KEY,
} from "@/config/auth";

type AuthUser = {
  username: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: AuthCredentials) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedToken = window.localStorage.getItem(LOCAL_TOKEN_STORAGE_KEY);
    const storedUsername = window.localStorage.getItem(
      LOCAL_USERNAME_STORAGE_KEY
    );

    if (storedToken && storedUsername) {
      setToken(storedToken);
      setUser({ username: storedUsername });
    }

    setReady(true);
  }, []);

  const loginHandler = useCallback(async (credentials: AuthCredentials) => {
    let nextToken: string | null = null;

    try {
      const response = await apiLogin(credentials);
      nextToken = response.token;
    } catch {
      if (typeof window !== "undefined") {
        const raw = window.localStorage.getItem(LOCAL_USERS_STORAGE_KEY);
        if (raw) {
          try {
            const list = JSON.parse(raw) as {
              username: string;
              password: string;
            }[];
            const found = list.find(
              (u) =>
                u.username === credentials.username &&
                u.password === credentials.password
            );
            if (found) {
              nextToken = `local-${credentials.username}-${Date.now()}`;
            }
          } catch {}
        }
      }
    }

    if (!nextToken) {
      throw new Error("Login failed");
    }

    setToken(nextToken);
    setUser({ username: credentials.username });

    if (typeof window !== "undefined") {
      window.localStorage.setItem(LOCAL_TOKEN_STORAGE_KEY, nextToken);
      window.localStorage.setItem(
        LOCAL_USERNAME_STORAGE_KEY,
        credentials.username
      );
      document.cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(
        nextToken
      )}; path=/`;
    }
  }, []);

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUser(null);

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(LOCAL_TOKEN_STORAGE_KEY);
      window.localStorage.removeItem(LOCAL_USERNAME_STORAGE_KEY);
      document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0`;
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login: loginHandler,
      logout: logoutHandler,
    }),
    [user, token, loginHandler, logoutHandler]
  );

  if (!ready) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
