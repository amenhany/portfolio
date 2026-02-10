'use client';
import BouncyText from '@/components/BouncyText';
import { AudioManager } from '@/lib/AudioManager';
import { useEffect, useState } from 'react';

export default function BootClient() {
   const [swapped, setSwapped] = useState(false);

   useEffect(() => {
      const timer = setTimeout(() => {
         setSwapped(true);
         AudioManager.Instance().playSfx('/audio/boot.mp3');
      }, 1050);
      return () => clearTimeout(timer);
   }, []);

   return (
      <main
         className={`boot-page flex justify-center items-center min-h-screen
            ${!swapped ? 'bg-foreground' : 'bg-red-500'}`}
      >
         <h1
            className={`text-9xl font-medium ${swapped ? 'text-foreground' : 'text-red-500'}`}
         >
            <BouncyText text="Amen" />
         </h1>
      </main>
   );
}
