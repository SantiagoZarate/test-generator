import { BasicAnalytics } from '@/api/multipleChoiceTest';
import { AnalyticBox } from './AnalyticsBox';
import { MultipleChoiceChart } from './MultipleChoiceChart';

interface Props {
  info: BasicAnalytics;
}

export function InformationGrid({ info }: Props) {
  return (
    <section className="relative grid grid-cols-2 divide-x border-y lg:grid-cols-4">
      <AnalyticBox
        description="Average Score"
        value={info.averageScore + '/' + info.questionsCount}
      />
      <AnalyticBox
        description="Disaproved tests"
        value={info.countDisaprovedTests}
      />
      <AnalyticBox description="Aproved tests" value={info.countAprovedTests} />
      <MultipleChoiceChart
        aproved={info.countAprovedTests}
        disaproved={info.countDisaprovedTests}
      />
    </section>
  );
}
