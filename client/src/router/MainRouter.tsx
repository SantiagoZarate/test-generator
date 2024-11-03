import { TestPage } from '@/pages/[id]';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { BasicTestPage } from '../pages/basic-test/BasicTestPage';
import { HomePage } from '../pages/home/HomePage';
import { multipleChoiceRouter } from './multipleChoiceRouter';

export const mainRouter = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        element: <HomePage />,
        path: '/',
        index: true,
      },
      {
        element: <TestPage />,
        path: '/basic-test/:id',
      },
      {
        element: <BasicTestPage />,
        path: '/basic-test',
      },
      ...multipleChoiceRouter,
    ],
  },
]);
