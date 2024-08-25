import { MultipleChoiceTestDraw } from '@/components/ui/MultipleChoiceTestDraw';
import { TestDraw } from '@/components/ui/TestDraw';

export const homePageLinks = [
  {
    title: 'Basic test',
    description:
      'Create a straightforward test with open-ended questions that require detailed responses from students.',
    path: '/basic-test',
    draw: <TestDraw />,
  },
  {
    title: 'Multiple choice test',
    description:
      'Design a test with multiple choice questions where students select the correct answer from a set of options.',
    path: '/multiple-choice',
    draw: <MultipleChoiceTestDraw />,
  },
];
