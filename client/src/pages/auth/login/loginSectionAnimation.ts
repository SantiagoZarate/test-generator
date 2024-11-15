import { Variants } from 'framer-motion';

export const animation: Variants = {
  animate: {
    y: 0,
    filter: 'blur(0px)',
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      duration: 0.3,
      stiffness: 100,
    },
  },
  initial: {
    y: 100,
    scale: 0.8,
    filter: 'blur(10px)',
    opacity: 0.6,
  },
};
