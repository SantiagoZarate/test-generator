import { cn } from '@/lib/utils';
import { HTMLMotionProps, motion, Variants } from 'framer-motion';

const variants: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(8px)',
    scale: 0.9,
  },
  open: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
  },
};

type Props = HTMLMotionProps<'li'>;

export function MotionItem(args: Props) {
  return (
    <motion.li className={cn(args.className)} variants={variants} {...args}>
      {args.children}
    </motion.li>
  );
}
