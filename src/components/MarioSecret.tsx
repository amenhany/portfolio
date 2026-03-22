'use client';
import { useEffect, useState } from 'react';
import { AudioManager } from '@/lib/AudioManager';
import { useQueryParams } from '@/hooks/useQueryParams';
import { motion } from 'motion/react';

const START = 1500;
const MUSIC = START + 500;
const TIME = MUSIC + 16000;

export default function MarioSecret({ onDone }: { onDone?: () => void }) {
   const { setParam } = useQueryParams();
   const [isGlitch, setIsGlitch] = useState(true);
   const [started, setStarted] = useState(false);

   function rand(lower = 0, upper = 1) {
      return Math.floor(Math.random() * (upper - lower)) + lower;
   }

   function resetSecret() {
      setParam('secret', null);
      AudioManager.Instance().stopMusic();
      onDone?.();
   }

   useEffect(() => {
      // play sound
      const startTimeout = setTimeout(() => {
         AudioManager.Instance().playMusic('/audio/scream.wav');
         setStarted(true);
      }, START);

      const musicTimeout = setTimeout(() => {
         AudioManager.Instance().playMusic('/audio/95.mp3');
         setIsGlitch(false);
      }, MUSIC);

      const timeout = setTimeout(resetSecret, TIME);

      // add escape option
      const handleKey = (e: KeyboardEvent) => {
         if (e.key === 'Escape') {
            AudioManager.Instance().stopMusic();
            resetSecret();
         }
      };

      window.addEventListener('keydown', handleKey);
      return () => {
         clearTimeout(timeout);
         clearTimeout(startTimeout);
         clearTimeout(musicTimeout);
         window.removeEventListener('keydown', handleKey);
      };
   }, []);

   if (!started) return <></>;
   return (
      <>
         {isGlitch ? (
            <>
               <div
                  className="fixed bg-black z-60"
                  style={{
                     width: `${rand(800, 2900)}px`,
                     height: `${rand(800, 2000)}px`,
                     rotate: `${rand(15, 135)}deg`,
                     top: `${rand(10, 90)}%`,
                     right: `${rand(10, 90)}%`,
                  }}
               />
               <div
                  className={`fixed inset-0 min-h-screen w-full bg-black z-15 z-${Math.random() > 0.5 ? '20' : '15'}`}
               />
            </>
         ) : (
            <div className="fixed inset-0 z-60 min-h-screen w-full bg-black">
               <motion.img
                  src="/images/95.png"
                  alt="Mario '95"
                  className="absolute size-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{
                     duration: (TIME - MUSIC) / 1000,
                     ease: 'easeIn',
                  }}
               />
            </div>
         )}
      </>
   );
}
