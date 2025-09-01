import { redirect } from "react-router-dom";
import { PATHS } from "@/shared/config/navigation.ts";

export function authLoader(): null {
  const token = localStorage.getItem("token");

  if (!token) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect(PATHS.HOME);
  }

  return null;
}
