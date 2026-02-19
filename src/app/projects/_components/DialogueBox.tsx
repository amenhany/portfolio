'use client';
import { motion } from 'motion/react';
import styles from './DialogueBox.module.css';
import { useEffect, useState } from 'react';

export type dialoguePrompts = 'welcome';

const DIALOGUE = {
   welcome: ['Hello! Hi!', 'Welcome to my Portfolio!'],
};

export default function DialogueBox({ prompt }: { prompt: dialoguePrompts }) {
   const dialogue = DIALOGUE[prompt];
   const [dialogueIndex, setDialogueIndex] = useState(0);

   useEffect(() => {
      const handleClick = () => {
         setDialogueIndex((prev) => {
            if (prev < dialogue.length - 1) return prev + 1;
            return prev;
         });
      };
      window.addEventListener('pointerdown', handleClick);
      return () => window.removeEventListener('pointerdown', handleClick);
   }, [dialogue.length]);

   return (
      <motion.div
         className={`${styles.dialogueBox} p-8`}
         initial={{ width: 0 }}
         animate={{ width: '80%' }}
         transition={{ delay: 0.5 }}
      >
         <p className="text-2xl">{dialogue[dialogueIndex]}</p>
      </motion.div>
   );
}
