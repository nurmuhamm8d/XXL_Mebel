import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME } from "@/config/auth";

export default async function CatalogLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE_NAME);

  if (!authCookie) {
    redirect("/auth/login");
  }

  return <>{children}</>;
}
