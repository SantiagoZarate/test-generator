import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

const textStyles = cva('first-letter:capitalize', {
  variants: {
    variant: {
      detail: 'text-xs opacity-50',
      regular: 'text-base',
      subtitle: 'text-xl font-semibold',
      title: 'text-3xl font-bold',
    },
  },
  defaultVariants: {
    variant: 'regular',
  },
});

type Props = ComponentProps<'p'> &
  VariantProps<typeof textStyles> & {
    asChild?: boolean;
  };

export function Text({ className, variant, asChild = false, ...args }: Props) {
  const Comp = asChild ? Slot : 'p';

  return <Comp className={textStyles({ variant, className })} {...args} />;
}
