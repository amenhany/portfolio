import { motion, Variants } from 'motion/react';

const container = {
   hidden: {},
   show: {
      transition: {
         staggerChildren: 0.12,
      },
   },
};

const letter: Variants = {
   hidden: {
      y: 40,
      scale: 0.5,
      opacity: 0,
   },
   show: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
         type: 'spring',
         stiffness: 500,
         damping: 20,
      },
   },
};

export default function MarioTitle() {
   return (
      <motion.span
         className="font-outline-2 inline-block"
         variants={container}
         initial="hidden"
         animate="show"
      >
         <motion.span variants={letter} className="inline-block text-[#E62310]">
            M
         </motion.span>
         <motion.span variants={letter} className="inline-block text-[#43AF35]">
            A
         </motion.span>
         <motion.span variants={letter} className="inline-block text-[#FCCF00]">
            R
         </motion.span>
         <motion.span variants={letter} className="inline-block text-[#009BD9]">
            I
         </motion.span>
         <motion.span variants={letter} className="inline-block text-[#43AF35]">
            O
         </motion.span>
      </motion.span>
   );
}
