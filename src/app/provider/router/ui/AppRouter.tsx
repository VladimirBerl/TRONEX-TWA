import { Route, Routes } from 'react-router';
import { routes } from '../model/routes';
import { BrowserRouter } from 'react-router-dom';

export const AppRouter = () => (
  <BrowserRouter >
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} {...route} />
      ))}
    </Routes>
  </BrowserRouter>
);
