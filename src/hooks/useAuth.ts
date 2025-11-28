"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AUTH_COOKIE_NAME } from "@/config/auth";
import { login, register, LoginPayload, RegisterPayload } from "@/utils/auth";

export function useLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await login(payload);

      if (typeof document !== "undefined") {
        document.cookie = `${AUTH_COOKIE_NAME}=${
          response.token
        }; path=/; max-age=${60 * 60 * 24}`;
      }

      router.replace("/catalog");
    } catch {
      setError("Не удалось войти. Проверь логин и пароль.");
    } finally {
      setLoading(false);
    }
  };

  return {
    login: handleLogin,
    loading,
    error,
  };
}

export function useRegister() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (payload: RegisterPayload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await register(payload);

      if (typeof document !== "undefined") {
        document.cookie = `${AUTH_COOKIE_NAME}=${
          response.token
        }; path=/; max-age=${60 * 60 * 24}`;
      }

      router.replace("/catalog");
    } catch {
      setError("Не удалось создать аккаунт. Попробуй ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  return {
    register: handleRegister,
    loading,
    error,
  };
}

export type { LoginPayload, RegisterPayload };
