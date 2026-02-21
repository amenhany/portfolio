'use client';
import { motion, MotionProps } from 'motion/react';

export default function DiagonalWipe({ onDone }: { onDone: () => void }) {
   const common: MotionProps = {
      initial: { scale: 0 },
      animate: { scale: 3, x: '-5%', y: '-5%' },
      transition: { duration: 2, ease: [1, 0.5, 0.8, 1] },
   };

   return (
      <div className="wipe-root">
         <motion.div className="wipe pink" {...common} />
         <motion.div
            className="wipe cyan"
            {...common}
            transition={{ ...common.transition, delay: 0.07 }}
         />
         <motion.div
            className="wipe yellow"
            {...common}
            transition={{ ...common.transition, delay: 0.13 }}
            onAnimationComplete={onDone}
         />
      </div>
   );
}
