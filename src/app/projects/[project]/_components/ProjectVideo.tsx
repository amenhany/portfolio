'use client';

import { AudioManager } from '@/lib/AudioManager';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export default function ProjectVideo({
   project,
   sound = false,
}: {
   project: string;
   sound?: boolean;
}) {
   const [hasLoaded, setHasLoaded] = useState(false);
   const videoRef = useRef<HTMLVideoElement>(null);

   function onLoad() {
      setHasLoaded(true);
      if (sound)
         AudioManager.Instance().playMusic(
            `/projects/${project}/audio.m4a`,
            undefined,
            0,
            true,
         );
   }

   const attemptPlay = async (video: HTMLVideoElement | null) => {
      if (!video) return;
      // setHasLoaded(true);
      try {
         await video.play();
      } catch {
         console.error('Autoplay blocked');
      }
   };

   useEffect(() => {
      attemptPlay(videoRef.current);
   }, []);

   return (
      <section>
         <video
            ref={videoRef}
            autoPlay
            playsInline
            loop
            muted
            onPlaying={onLoad}
            preload="auto"
            className={`w-full h-screen object-contain ${hasLoaded ? '' : 'opacity-0'}`}
            src={`/projects/${project}/video.mp4`}
         />
         {!hasLoaded && (
            <div
               className="fixed h-screen w-full z-80 top-1/2 -translate-y-1/2"
               onClick={() => attemptPlay(videoRef.current)}
            >
               <img
                  src={`/projects/${project}/thumbnail.png`}
                  alt={project}
                  className="w-full h-full object-contain select-none"
                  draggable={false}
               />
            </div>
         )}

         <motion.div
            className="fixed top-0 left-0 vignette z-80 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.2 }}
         />
      </section>
   );
}
