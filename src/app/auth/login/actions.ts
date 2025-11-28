"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME } from "@/config/auth";

export type LoginFormState = {
  error: string | null;
};

export async function loginAction(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const usernameRaw = formData.get("username");
  const passwordRaw = formData.get("password");

  const username = typeof usernameRaw === "string" ? usernameRaw.trim() : "";
  const password = typeof passwordRaw === "string" ? passwordRaw.trim() : "";

  if (!username || !password) {
    return { error: "Введи логин и пароль." };
  }

  try {
    const response = await axios.post<{ token: string }>(
      "https://fakestoreapi.com/auth/login",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    cookies().set(AUTH_COOKIE_NAME, response.data.token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    redirect("/catalog");

    return { error: null };
  } catch {
    return { error: "Неверный логин или пароль." };
  }
}
