'use client';
import { motion } from 'motion/react';
import styles from './DialogueBox.module.scss';
import { useEffect, useState } from 'react';
import { AudioManager } from '@/lib/AudioManager';
import { Triangle } from 'lucide-react';
import Typewriter from './Typewriter';

export default function DialogueBox({ dialogue }: { dialogue: string[] }) {
   const [dialogueIndex, setDialogueIndex] = useState(0);
   const [dialogueBoxOpen, setDialogueBoxOpen] = useState(false);

   const [typewriterDone, setTypewriterDone] = useState(false);
   const [shouldSkip, setShouldSkip] = useState(false);

   function advanceDialogue() {
      if (!typewriterDone) {
         setShouldSkip(true);
         AudioManager.Instance().playSfx('/audio/next_dialogue.wav');
         return;
      }

      setDialogueIndex((prev) => {
         if (prev >= dialogue.length - 1) return prev;

         setTypewriterDone(false);
         AudioManager.Instance().playSfx('/audio/next_dialogue.wav');
         return prev + 1;
      });
   }

   useEffect(() => {
      setDialogueIndex(0);
   }, [dialogue]);

   return (
      <motion.div
         className={`${styles.dialogueBox} p-1`}
         initial={{ width: 0, maxHeight: 0 }}
         animate={{ width: [0, 0, '80%'], maxHeight: [0, '100%', '100%'] }}
         exit={{ width: ['80%', 0, 0], maxHeight: ['100%', '100%', 0] }}
         transition={{ delay: 0.5, times: [0, 0.5, 1] }}
         onClick={advanceDialogue}
         onAnimationComplete={() => setTimeout(() => setDialogueBoxOpen(true), 500)}
      >
         {dialogueBoxOpen && dialogue[dialogueIndex]?.length && (
            <>
               <Typewriter
                  text={dialogue[dialogueIndex]}
                  className="text-2xl p-14 font-normal pointer-events-none"
                  speed={100}
                  onFinished={() => {
                     setTypewriterDone(true);
                     setShouldSkip(false);
                  }}
                  skip={shouldSkip}
               />

               {typewriterDone && dialogueIndex < dialogue.length - 1 && (
                  <motion.div
                     className={`${styles.dialogueArrow} absolute right-20 bottom-20`}
                     initial={{ y: 0 }}
                     animate={{ y: [0, -10, -10, 0] }}
                     transition={{
                        repeat: Infinity,
                        times: [0.2, 0.45, 0.55, 0.95],
                        duration: 1.5,
                     }}
                  >
                     <Triangle />
                  </motion.div>
               )}
            </>
         )}
      </motion.div>
   );
}
