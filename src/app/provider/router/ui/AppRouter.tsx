import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "../model/routes";
import { Suspense } from "react";
import { SplashScreen } from "@/pages";

const router = createBrowserRouter(routes);

export const AppRouter = () => {
  return (
    <Suspense fallback={<SplashScreen />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
