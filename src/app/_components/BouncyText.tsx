'use client';
import { motion, type Variants } from 'motion/react';

const letters = [...'Amen'];

const container = {
   hidden: {},
   visible: {},
   animate: {
      scale: 0.5,
      transition: {
         staggerChildren: 0.05,
         delay: 0.7,
      },
   },
};

const letterVariants: Variants = {
   hidden: { y: '110%' },
   visible: (i: number) => ({
      y: '0%',
      transition: {
         delay: 0.15 + i * 0.09, // stagger
         duration: 0.75,
         ease: [0.22, 1, 0.36, 1],
      },
   }),
   animate: { y: [0, -20, 0] }, // bounce
};

export default function BouncyText({ started }: { started: boolean }) {
   return (
      <motion.div
         variants={container}
         initial="hidden"
         animate={started ? 'animate' : 'visible'}
         style={{ display: 'inline-flex' }}
      >
         {letters.map((l, i) => (
            <span
               key={i}
               style={{
                  display: 'inline-block',
                  overflow: 'hidden',
                  lineHeight: 1,
               }}
            >
               <motion.span
                  custom={i}
                  variants={letterVariants}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  style={{ display: 'inline-block' }}
               >
                  {l}
               </motion.span>
            </span>
         ))}
      </motion.div>
   );
}
