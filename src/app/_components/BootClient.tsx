'use client';
import BouncyText from './BouncyText';
import { AudioManager } from '@/lib/AudioManager';
import { useEffect, useState } from 'react';
import { Outfit } from 'next/font/google';
import { useTransition } from './TransitionProvider';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';

const outfitFont = Outfit({
   subsets: ['latin'],
   weight: ['500'],
   display: 'swap',
});

export default function BootClient() {
   const [swapped, setSwapped] = useState(false);
   const { startTransition } = useTransition();
   const router = useRouter();

   const [started, setStarted] = useState(false);

   useEffect(() => {
      const handleClick = () => {
         setStarted(true);
         AudioManager.Instance().setSfxVolume(1);
         window.removeEventListener('pointerdown', handleClick);
      };

      window.addEventListener('pointerdown', handleClick);

      return () => {
         window.removeEventListener('pointerdown', handleClick);
      };
   }, []);

   useEffect(() => {
      if (!started) return;

      const timer = setTimeout(() => {
         setSwapped(true);
         AudioManager.Instance().playSfx('/audio/boot.mp3');
         router.prefetch('/projects');
         startTransition(() => router.push('/projects'));
      }, 780);

      return () => clearTimeout(timer);
   }, [started]);

   return (
      <main
         className={`boot-page flex flex-col justify-center items-center min-h-screen
            ${!swapped ? 'bg-foreground' : 'bg-red-500'}`}
      >
         <h1
            className={`text-9xl font-medium ${swapped ? 'text-foreground' : 'text-red-500'} ${outfitFont.className}`}
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
                     transition: { repeat: Infinity, duration: 2 },
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
