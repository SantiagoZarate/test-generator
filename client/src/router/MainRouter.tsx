import { BaseLayout } from '@/layouts/BaseLayout';
import { BrowseLayout } from '@/layouts/BrowseLayout';
import { ProtectedRouteLayout } from '@/layouts/ProtectedRouteLayout';
import { AboutPage } from '@/pages/about/AboutPage';
import { BasicTestByIdPage } from '@/pages/basic-test-by-id/basicTestByIdPage';
import { BrowseMultipleChoiceTestsPage } from '@/pages/browse/BrowseMultipleChoiceTestsPage';
import { BrowseTestsPage } from '@/pages/browse/BrowseTestsPage';
import { MultipleChoiceTestPageByID } from '@/pages/multiple-choice-by-id/MultipleChoiceTestPageByID';
import { MultipleChoicePage } from '@/pages/multiple-choice/MultipleChoiceTestPage';
import { ProfileMultipleChoicePage } from '@/pages/profile/multiple-choice/ProfileMultipleChoicePage';
import { ProfilePage } from '@/pages/profile/ProfilePage';
import { RedirectLoginPage } from '@/pages/redirect/RedirectLoginPage';
import { RedirectRegisterPage } from '@/pages/redirect/RedirectRegisterPage';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { BasicTestPage } from '../pages/basic-test/BasicTestPage';
import { HomePage } from '../pages/home/HomePage';
import { authRouter } from './authRouter';

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
            element: <AboutPage />,
            path: '/about',
          },
          {
            element: <BasicTestByIdPage />,
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
              {
                element: <MultipleChoicePage />,
                path: '/multiple-choice',
              },
              {
                element: <BasicTestPage />,
                path: '/basic-test',
              },
            ],
          },
          {
            element: <MultipleChoiceTestPageByID />,
            path: '/multiple-choice/:id',
          },
        ],
      },
      ...authRouter,
    ],
  },
]);
