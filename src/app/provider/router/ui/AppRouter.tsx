import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "../model/routes";
import { Suspense } from "react";
import { SplashScreen } from "@/pages";
import { AuthProvider } from "@/app/provider/auth-provider";

const router = createBrowserRouter(routes);

export const AppRouter = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<SplashScreen />}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  );
};
