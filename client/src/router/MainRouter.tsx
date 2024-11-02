import { TestPage } from '@/pages/[id]';
import { MultipleChoiceTestPageByID } from '@/pages/multiple-choice-by-id/MultipleChoiceTestPageByID';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { BasicTestPage } from '../pages/basic-test/BasicTestPage';
import { HomePage } from '../pages/home/HomePage';
import { MultipleChoicePage } from '../pages/multiple-choice/MultipleChoiceTestPage';

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
      {
        element: <MultipleChoicePage />,
        path: '/multiple-choice',
      },
      {
        element: <MultipleChoiceTestPageByID />,
        path: '/multiple-choice/:id',
      },
    ],
  },
]);
