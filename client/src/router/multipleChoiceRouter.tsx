import { MultipleChoiceTestsPage } from '@/pages/multiple-choice-all/MultipleChoiceTestsPage';
import { MultipleChoiceTestPageByID } from '@/pages/multiple-choice-by-id/MultipleChoiceTestPageByID';
import { MultipleChoicePage } from '@/pages/multiple-choice/MultipleChoiceTestPage';
import { RouteObject } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
const BASE = '/multiple-choice';

const multipleChoiceRouter: RouteObject[] = [
  {
    element: <MultipleChoicePage />,
    path: BASE,
  },
  {
    element: <MultipleChoiceTestPageByID />,
    path: BASE + '/:id',
  },
  {
    element: <MultipleChoiceTestsPage />,
    path: BASE + '/all',
  },
];

export { multipleChoiceRouter };
