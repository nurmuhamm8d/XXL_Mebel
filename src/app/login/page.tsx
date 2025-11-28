import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME } from "@/config/auth";

export default async function RootPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE_NAME);

  if (!authCookie) {
    redirect("/auth/login");
  }

  redirect("/catalog");
}
