'use client';
import { Outfit } from 'next/font/google';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { AudioManager } from '@/lib/AudioManager';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const outfitFont = Outfit({
   subsets: ['latin'],
   weight: ['500'],
   display: 'swap',
});

const colors = [
   { text: 'Because', background: '#487ABF', foreground: '#000', duration: 0.37 },
   { text: 'Sometimes', background: '#444A4A', foreground: '#568BA4', duration: 1.13 },
   { text: 'To', background: '#8BF44B', foreground: '#C5FDA2', duration: 0.2 },
   { text: 'Change', background: '#FFDC5E', foreground: '#3E74A9', duration: 0.5 },
   { text: 'The', background: '#9299A1', foreground: '#E1E1DF', duration: 0.2 },
   { text: 'Entire', background: '#417DAF', foreground: '#FEDA5C', duration: 0.6 },
   { text: 'Universe', background: '#CAE3E7', foreground: '#C84626', duration: 1.15 },
   { text: 'You', background: '#FEE25B', foreground: '#313234', duration: 0.5 },
   { text: 'Have', background: '#EB6554', foreground: '#C8E4E4', duration: 0.4 },
   { text: 'To', background: '#D1D1D1', foreground: '#88949E', duration: 0.2 },
   { text: 'Be', background: '#4C4E57', foreground: '#FBE553', duration: 0.8 },
];

export default function InvincibleSecret({ onDone }: { onDone?: () => void }) {
   const searchParams = useSearchParams();
   const pathname = usePathname();
   const router = useRouter();
   const [index, setIndex] = useState(0);

   function resetSecret() {
      const params = new URLSearchParams(searchParams.toString());
      params.set('secret', '');
      router.push(`${pathname}?${params.toString()}`);
      onDone?.();
   }

   useEffect(() => {
      // preload images
      const img1 = new Image();
      img1.src = '/images/title-card.png';

      const img2 = new Image();
      img2.src = '/images/title-card-subtitle.png';

      // play sound
      AudioManager.Instance().playMusic('/audio/invincible.wav', resetSecret);

      // add escape option
      const handleKey = (e: KeyboardEvent) => {
         if (e.key === 'Escape') {
            AudioManager.Instance().stopMusic();
            resetSecret();
         }
      };
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
   }, []);

   useEffect(() => {
      if (index >= colors.length) return;

      const timeout = setTimeout(() => {
         setIndex((prev) => prev + 1);
      }, colors[index].duration * 1000);

      return () => clearTimeout(timeout);
   }, [index]);

   const current = colors[index];

   return (
      <>
         <motion.div
            className="fixed inset-0 z-60 min-h-screen"
            initial={{ scale: 1 }}
            animate={{ scale: 1.15 }}
            transition={{ delay: 6.1, duration: 14, ease: 'easeOut' }}
         >
            <img
               src="/images/title-card-subtitle.png"
               alt="Title Card"
               className="absolute size-full object-cover"
            />
            <motion.img
               src="/images/title-card.png"
               className="absolute size-full object-cover"
               style={{ clipPath: 'inset(0 0 0 0)' }}
               initial={{ clipPath: 'inset(0 0 0 0)' }}
               animate={{ clipPath: 'inset(0 100% 0 0)' }}
               transition={{ duration: 0.2, ease: 'easeIn', delay: 8.15 }}
            />
         </motion.div>
         {current && (
            <motion.div
               key={index}
               className="fixed inset-0 z-70 flex justify-center items-center min-h-screen"
               style={{ backgroundColor: current.background }}
               initial={false}
               animate={{}}
            >
               <h1
                  className={`text-9xl font-bold uppercase ${outfitFont.className}`}
                  style={{ color: current.foreground }}
               >
                  {current.text}
               </h1>
            </motion.div>
         )}
      </>
   );
}
