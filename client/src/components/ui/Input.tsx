import React, { ComponentProps } from 'react';
import { cn } from '../../lib/cn';

export const Input = React.forwardRef<
  HTMLInputElement,
  ComponentProps<'input'>
>((args, ref) => (
  <input
    {...args}
    ref={ref}
    className={cn(
      'rounded-lg border border-border bg-card p-2 first-letter:uppercase',
      args.className
    )}
  />
));
