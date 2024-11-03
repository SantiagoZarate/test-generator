import { cn } from '@/lib/utils';
import { HTMLMotionProps, motion, Variants } from 'framer-motion';

const variants: Variants = {
  open: {
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
  },
};

type Props = HTMLMotionProps<'ul'>;

export function MotionList(args: Props) {
  return (
    <motion.ul
      className={cn(args.className)}
      variants={variants}
      animate="open"
      initial="hidden"
      {...args}
    >
      {args.children}
    </motion.ul>
  );
}
