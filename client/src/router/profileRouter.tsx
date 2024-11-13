import { multipleChoiceTestAPI } from '@/api/multipleChoiceTest/multipleChoiceTest.api';
import { AuthLayout } from '@/layouts/AuthLayout';
import { ProfileMultipleChoicePage } from '@/pages/profile/multiple-choice/ProfileMultipleChoicePage';
import { ProfilePage } from '@/pages/profile/ProfilePage';
import { QueryClient, QueryOptions } from '@tanstack/react-query';
import { Params, RouteObject } from 'react-router-dom';

const queryClient = new QueryClient();

export const multipleChoiceTestDetailQuery = (id: string) =>
  ({
    queryKey: ['profile', 'multiple choice', id],
    queryFn: () => multipleChoiceTestAPI.getOneWithInfo(id),
  }) satisfies QueryOptions;

const profileMultipleChoiceLoader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Params<'id'> }) => {
    const query = multipleChoiceTestDetailQuery(params.id!);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export const profileRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/profile/multiple-choice/:id',
        element: <ProfileMultipleChoicePage />,
        loader: profileMultipleChoiceLoader(queryClient),
        errorElement: <div>There was an element</div>,
      },
    ],
  },
];
