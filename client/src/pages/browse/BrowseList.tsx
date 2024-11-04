import { GetAllTests } from '@/api/interface';
import { ArrowUpRigthMicroIcon } from '@/components/icons/ArrowUpRigthMicroIcon';
import { MotionItem } from '@/components/motion/MotionItem';
import { MotionList } from '@/components/motion/MotionList';
import { Link } from 'react-router-dom';

interface Props {
  tests: GetAllTests[];
}

export function BrowseList({ tests }: Props) {
  return (
    <MotionList className="flex flex-col divide-y divide-border">
      {tests.map((test) => (
        <MotionItem className="group py-1" key={test.id}>
          <Link
            to={`/multiple-choice/${test.id}`}
            className="flex cursor-pointer items-center justify-between rounded-lg p-1 px-2 transition hover:bg-border"
          >
            <section className="flex items-center gap-2">
              <span className="opacity-0 transition group-hover:opacity-100">
                <ArrowUpRigthMicroIcon />
              </span>
              <p className="-translate-x-6 transition group-hover:translate-x-0">
                {test.title}
              </p>
            </section>
            <p>
              {test.questionsCounts}{' '}
              {test.questionsCounts > 1 ? 'preguntas' : 'pregunta'}
            </p>
          </Link>
        </MotionItem>
      ))}
    </MotionList>
  );
}
