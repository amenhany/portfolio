import { motion } from 'motion/react';

export default function SlidingIcon({
   icon,
   text,
   value = 60,
}: {
   icon: string;
   text: string;
   value?: number;
}) {
   return (
      <motion.div
         className="flex items-center justify-center gap-4 drop-shadow"
         initial="hidden"
         animate="show"
      >
         <motion.img
            src={icon}
            className="w-12 h-12"
            initial={{
               x: value,
               opacity: 0,
            }}
            animate={{
               x: [value, 1.5],
               opacity: [1, 1],
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.1 }}
         />

         <motion.span
            className="text-4xl font-bold mt-2"
            initial={{ x: -value, opacity: 0 }}
            animate={{ x: -1.5, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.1 }}
         >
            {text}
         </motion.span>
      </motion.div>
   );
}
