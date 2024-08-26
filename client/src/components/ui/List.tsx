import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

export function List(args: ComponentProps<'ul'>) {
  return (
    <ul
      className={cn('flex flex-col print:gap-12', args.className)}
      {...args}
    />
  );
}
