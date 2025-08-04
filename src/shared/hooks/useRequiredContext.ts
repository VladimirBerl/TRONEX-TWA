import { Context, useContext } from "react";

export function useRequiredContext<T>(context: Context<T | undefined>, contextName = "Context"): T {
  const ctx: T | undefined = useContext(context);
  if (ctx === undefined) throw new Error(`${contextName} must be used within its Provider`);
  return ctx;
}
