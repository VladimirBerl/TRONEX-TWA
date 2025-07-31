import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../model/routes';

const router = createBrowserRouter(routes);

export const AppRouter = () => {
  return <RouterProvider router={ router }/>;
};
