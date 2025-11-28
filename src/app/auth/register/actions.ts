"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME } from "@/config/auth";

export type RegisterFormState = {
  error: string | null;
};

export async function registerAction(
  prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  const usernameRaw = formData.get("username");
  const passwordRaw = formData.get("password");
  const passwordRepeatRaw = formData.get("passwordRepeat");
  const firstNameRaw = formData.get("firstName");
  const lastNameRaw = formData.get("lastName");
  const emailRaw = formData.get("email");

  const username = typeof usernameRaw === "string" ? usernameRaw.trim() : "";
  const password = typeof passwordRaw === "string" ? passwordRaw.trim() : "";
  const passwordRepeat =
    typeof passwordRepeatRaw === "string" ? passwordRepeatRaw.trim() : "";
  const firstName = typeof firstNameRaw === "string" ? firstNameRaw.trim() : "";
  const lastName = typeof lastNameRaw === "string" ? lastNameRaw.trim() : "";
  const email = typeof emailRaw === "string" ? emailRaw.trim() : "";

  if (
    !username ||
    !password ||
    !passwordRepeat ||
    !firstName ||
    !lastName ||
    !email
  ) {
    return { error: "Заполни все поля формы." };
  }

  if (password !== passwordRepeat) {
    return { error: "Пароли не совпадают." };
  }

  try {
    await axios.post(
      "https://fakestoreapi.com/users",
      {
        email,
        username,
        password,
        name: {
          firstname: firstName,
          lastname: lastName,
        },
        address: {
          city: "Almaty",
          street: "Main street",
          number: 1,
          zipcode: "00000",
          geolocation: {
            lat: "0",
            long: "0",
          },
        },
        phone: "000-000-0000",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const loginResponse = await axios.post<{ token: string }>(
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

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, loginResponse.data.token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    redirect("/catalog");

    return { error: null };
  } catch {
    return { error: "Не удалось создать аккаунт. Попробуй ещё раз." };
  }
}
