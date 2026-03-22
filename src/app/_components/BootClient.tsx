'use client';
import BouncyText from './BouncyText';
import { AudioManager } from '@/lib/AudioManager';
import { useEffect, useState } from 'react';
import { useTransition } from './TransitionProvider';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';

export default function BootClient() {
   const [swapped, setSwapped] = useState(false);
   const { startTransition } = useTransition();
   const router = useRouter();

   const [started, setStarted] = useState(false);

   useEffect(() => {
      const handleClick = () => {
         setStarted(true);
         window.removeEventListener('pointerdown', handleClick);
      };

      window.addEventListener('pointerdown', handleClick);

      return () => {
         window.removeEventListener('pointerdown', handleClick);
      };
   }, []);

   useEffect(() => {
      AudioManager.Instance().load('/audio/boot.mp3');
      if (!started) return;
      AudioManager.Instance().load('/audio/dialogue.wav');
      AudioManager.Instance().load('/audio/next_dialogue.wav');

      const timer = setTimeout(() => {
         setSwapped(true);
         AudioManager.Instance().playSfx('/audio/boot.mp3');
         router.prefetch('/projects');
         startTransition('/projects?dialogue=welcome&dialogue=about&dialogue=separator');
      }, 780);

      return () => clearTimeout(timer);
   }, [started]);

   return (
      <main
         className={`boot-page flex flex-col justify-center items-center min-h-screen
            ${!swapped ? 'bg-foreground' : 'bg-red-500'}`}
      >
         <h1
            className={`title font-medium ${swapped ? 'text-foreground' : 'text-red-500'}`}
         >
            <BouncyText started={started} />
         </h1>

         <AnimatePresence>
            {!started && (
               <motion.p
                  className="opacity-25 text-white absolute bottom-1/4"
                  initial={{ opacity: 0.25 }}
                  animate={{
                     opacity: [0, 0.25, 0.25, 0],
                     transition: { repeat: Infinity, duration: 2, delay: 1 },
                  }}
                  exit={{ opacity: 0 }}
               >
                  Press Anywhere
               </motion.p>
            )}
         </AnimatePresence>
      </main>
   );
}
