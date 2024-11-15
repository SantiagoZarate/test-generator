import { Text } from '@/components/ui/Text';

interface Props {
  value: number | string;
  description: string;
}

export function AnalyticBox({ description, value }: Props) {
  return (
    <section className="flex aspect-square h-full flex-col items-center justify-center gap-2 overflow-hidden">
      <Text>{value}</Text>
      <Text variant={'subtitle'}>{description}</Text>
    </section>
  );
}
