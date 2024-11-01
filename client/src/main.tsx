import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { mainRouter } from './router/MainRouter.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={mainRouter} />
  </StrictMode>
);
