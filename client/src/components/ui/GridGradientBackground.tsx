import { cn } from '../../lib/cn';

interface Props {
  className?: string;
}

export function GridGradientBackground({ className }: Props) {
  return (
    <span
      className={cn(
        'pointer-events-none absolute inset-0 z-0 h-full w-full bg-inherit bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_100%_at_80%_50%,#000_60%,transparent_100%)]',
        className
      )}
    />
  );
}
