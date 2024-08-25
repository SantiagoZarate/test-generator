import { ComponentProps } from 'react';
import { cn } from '../../lib/cn';

export function Button(args: ComponentProps<'button'>) {
  return (
    <button
      {...args}
      className={cn(
        'flex items-center justify-center gap-2 rounded border border-border bg-neutral-300 px-4 py-2 capitalize text-neutral-800 transition hover:bg-neutral-500 disabled:bg-neutral-700',
        args.className
      )}
    />
  );
}
