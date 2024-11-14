import { BaseLayout } from '@/layouts/BaseLayout';
import { BrowseLayout } from '@/layouts/BrowseLayout';
import { ProtectedRouteLayout } from '@/layouts/ProtectedRouteLayout';
import { TestPage } from '@/pages/[id]';
import { BrowseMultipleChoiceTestsPage } from '@/pages/browse/BrowseMultipleChoiceTestsPage';
import { BrowseTestsPage } from '@/pages/browse/BrowseTestsPage';
import { ProfileMultipleChoicePage } from '@/pages/profile/multiple-choice/ProfileMultipleChoicePage';
import { ProfilePage } from '@/pages/profile/ProfilePage';
import { RedirectLoginPage } from '@/pages/redirect/RedirectLoginPage';
import { RedirectRegisterPage } from '@/pages/redirect/RedirectRegisterPage';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { BasicTestPage } from '../pages/basic-test/BasicTestPage';
import { HomePage } from '../pages/home/HomePage';
import { authRouter } from './authRouter';
import { multipleChoiceRouter } from './multipleChoiceRouter';

export const mainRouter = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
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
            element: <RedirectRegisterPage />,
            path: '/redirect',
            errorElement: <div>There was an error</div>,
          },
          {
            element: <RedirectLoginPage />,
            path: '/redirect-login',
            errorElement: <div>There was an error</div>,
          },
          {
            element: <BasicTestPage />,
            path: '/basic-test',
          },
          {
            element: <BrowseLayout />,
            path: '/browse',
            children: [
              {
                path: '/browse/multiple-choice-test',
                element: <BrowseMultipleChoiceTestsPage />,
              },
              {
                path: '/browse/test',
                element: <BrowseTestsPage />,
              },
            ],
          },
          {
            element: <ProtectedRouteLayout />,
            children: [
              {
                path: '/profile',
                element: <ProfilePage />,
              },
              {
                path: '/profile/multiple-choice/:id',
                element: <ProfileMultipleChoicePage />,
              },
            ],
          },
          ...multipleChoiceRouter,
        ],
      },
      ...authRouter,
    ],
  },
]);
