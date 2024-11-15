import { MotionItem } from '@/components/motion/MotionItem';
import { MotionList } from '@/components/motion/MotionList';

export function TestLoader() {
  return (
    <MotionList className="flex animate-pulse flex-col gap-2">
      {Array(5)
        .fill(1)
        .map((n) => (
          <MotionItem key={n}>
            <TestSkeleton />
          </MotionItem>
        ))}
    </MotionList>
  );
}

export function TestSkeleton() {
  return <div className="h-6 rounded-lg bg-primary/30" />;
}
