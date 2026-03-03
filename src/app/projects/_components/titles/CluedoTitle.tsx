import { motion } from 'motion/react';

export default function CluedoTitle() {
   return (
      <motion.span
         className="relative uppercase flex justify-center items-center"
         initial={{ y: -10, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 0.4, ease: 'easeInOut' }}
         //  style={
         //     {
         //        // textShadow: '3px 2px 0px black, 4px 2px 0px white',
         //     }
         //  }
      >
         <span className="text-6xl">C</span>luedo
      </motion.span>
   );
}
