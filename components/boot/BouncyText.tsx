'use client';
import { motion } from 'motion/react';

const letters = [...'Amen'];

const container = {
   initial: { scale: 1 },
   animate: {
      scale: 0.5,
      transition: {
         staggerChildren: 0.05,
         delay: 0.7,
      },
   },
};

const item = {
   initial: { y: 0 },
   animate: { y: [0, -20, 0] },
};

export default function BouncyText({ started }: { started: boolean }) {
   return (
      <motion.div
         variants={container}
         initial="initial"
         animate={started ? 'animate' : 'initial'}
         style={{ display: 'inline-block' }}
      >
         {letters.map((l, i) => (
            <motion.span
               key={i}
               variants={item}
               transition={{ duration: 0.4, ease: 'easeInOut' }}
               style={{ display: 'inline-block' }}
            >
               {l}
            </motion.span>
         ))}
      </motion.div>
   );
}
