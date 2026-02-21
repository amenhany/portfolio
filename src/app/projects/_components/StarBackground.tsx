'use client';
import { motion, MotionProps } from 'motion/react';
import styles from './StarBackground.module.css';

export default function StarBackground() {
   return (
      <motion.div className={styles.starContainer}>
         <motion.div
            className={styles.starPattern}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1 }}
         />
         <motion.div
            className={styles.starGradientOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 1 }}
         />
      </motion.div>
   );
}
