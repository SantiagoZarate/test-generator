import { GetAllTests } from '@/api/interface';
import { Link } from 'react-router-dom';

interface Props {
  tests: GetAllTests[];
}

export function BrowseList({ tests }: Props) {
  return (
    <ul className="flex flex-col divide-y divide-border">
      {tests.map((test) => (
        <li className="py-1" key={test.id}>
          <Link
            to={`/multiple-choice/${test.id}`}
            className="flex cursor-pointer items-center justify-between rounded-lg p-1 px-2 transition hover:bg-border"
          >
            <p>{test.title}</p>
            <p>
              {test.questionsCounts}{' '}
              {test.questionsCounts > 1 ? 'preguntas' : 'pregunta'}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
