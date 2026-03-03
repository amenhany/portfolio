import { motion } from 'motion/react';

export default function TVListTitle() {
   return (
      <motion.div
         className="flex items-center justify-center gap-4 drop-shadow"
         initial="hidden"
         animate="show"
      >
         <motion.img
            src="/images/tv.png"
            className="w-12 h-12"
            initial={{
               x: 60,
               opacity: 0,
            }}
            animate={{
               x: [60, 1.5],
               opacity: [1, 1],
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.1 }}
         />

         <motion.span
            className="text-4xl font-bold mt-2"
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: -1.5, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.1 }}
         >
            TV List
         </motion.span>
      </motion.div>
   );
}
