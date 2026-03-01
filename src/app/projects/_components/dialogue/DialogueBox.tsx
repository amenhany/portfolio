'use client';
import { motion } from 'motion/react';
import styles from './DialogueBox.module.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AudioManager } from '@/lib/AudioManager';
import { Triangle } from 'lucide-react';
import Typewriter from './Typewriter';
import type { DialoguePart } from '@/types/dialogue';
import { tokenize } from '@/lib/tokenize';

export default function DialogueBox({
   dialogue,
   onDone,
}: {
   dialogue: DialoguePart[][];
   onDone: () => void;
}) {
   const [dialogueIndex, setDialogueIndex] = useState(0);
   const [dialogueBoxOpen, setDialogueBoxOpen] = useState(false);

   const [typewriterDone, setTypewriterDone] = useState(false);
   const [shouldSkip, setShouldSkip] = useState(false);
   const [dialogueDone, setDialogueDone] = useState(false);

   const tokens = useMemo(
      () => tokenize(dialogue[dialogueIndex]),
      [dialogueIndex, dialogue],
   );

   const advanceDialogue = useCallback(() => {
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
   }, [typewriterDone, dialogue.length]);

   const handleFinished = useCallback(() => {
      setTypewriterDone(true);
      setShouldSkip(false);
   }, []);

   useEffect(() => {
      setDialogueIndex(0);
   }, [dialogue]);

   useEffect(() => {
      if (dialogueIndex >= dialogue.length - 1 && !dialogueDone && typewriterDone) {
         onDone();
         setDialogueDone(true);
      }
   }, [dialogueIndex, dialogue, onDone, typewriterDone]);

   return (
      <motion.div
         className={`${styles.dialogueBox} h-[250px] md:h-[300px] p-1 select-none z-20`}
         initial={{ width: 0, maxHeight: 0 }}
         animate={{ width: [0, 0, '80%'], maxHeight: [0, '100%', '100%'] }}
         exit={{
            width: ['80%', 0, 0],
            maxHeight: ['100%', '100%', 0],
            overflow: 'hidden',
            textWrap: 'nowrap',
         }}
         transition={{ delay: 0.5, times: [0, 0.5, 1] }}
         onClick={advanceDialogue}
         onAnimationComplete={() => setTimeout(() => setDialogueBoxOpen(true), 500)}
      >
         {dialogueBoxOpen && (
            <>
               <Typewriter
                  tokens={tokens}
                  className="text-lg md:text-2xl lg:p-14 p-10 font-normal"
                  speed={100}
                  onFinished={handleFinished}
                  skip={shouldSkip}
               />

               {typewriterDone && dialogueIndex < dialogue.length - 1 && (
                  <motion.div
                     className={`${styles.dialogueArrow} red-arrow absolute right-20 bottom-20`}
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
