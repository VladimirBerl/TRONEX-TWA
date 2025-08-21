import { redirect } from "react-router-dom";
import { PATHS } from "@/shared/config/navigation.ts";

function getStatusFromCookie(request: Request): string | null {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/status=([^;]+)/);
  return match ? match[1] : null;
}
export function authLoader({ request }: { request: Request }): null {
  const status = getStatusFromCookie(request);

  if (status === "banned") {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect(PATHS.BANNED);
  }

  if (status !== "active" && status == null) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect(PATHS.HOME);
  }

  return null;
}
