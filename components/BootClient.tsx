'use client';
import BouncyText from '@/components/BouncyText';
import { AudioManager } from '@/lib/AudioManager';
import { useEffect, useState } from 'react';
import { Outfit } from 'next/font/google';

const montserrat = Outfit({
   subsets: ['latin'],
   weight: ['500'],
   display: 'swap',
});

export default function BootClient() {
   const [swapped, setSwapped] = useState(false);

   useEffect(() => {
      const timer = setTimeout(() => {
         setSwapped(true);
         AudioManager.Instance().playSfx('/audio/boot.mp3');
      }, 780);
      return () => clearTimeout(timer);
   }, []);

   return (
      <main
         className={`boot-page flex justify-center items-center min-h-screen
            ${!swapped ? 'bg-foreground' : 'bg-red-500'}`}
      >
         <h1
            className={`text-9xl font-medium ${swapped ? 'text-foreground' : 'text-red-500'} ${montserrat.className}`}
         >
            <BouncyText text="Amen" />
         </h1>
      </main>
   );
}
