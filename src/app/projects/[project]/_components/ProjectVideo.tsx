'use client';

import Spinner from '@/components/Spinner';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

export default function ProjectVideo({
   project,
   videoId,
}: {
   project: string;
   videoId: string;
}) {
   const [hasLoaded, setHasLoaded] = useState(false);
   const [showSpinner, setShowSpinner] = useState(false);

   useEffect(() => {
      const timer = setTimeout(() => {
         if (!hasLoaded) {
            setShowSpinner(true);
         }
      }, 2000);

      return () => clearTimeout(timer);
   }, [hasLoaded]);

   function onLoad() {
      setHasLoaded(true);
   }

   return (
      <section>
         <YouTube
            videoId={videoId}
            iframeClassName={`w-full h-screen object-contain ${hasLoaded ? '' : 'opacity-0'}`}
            opts={{
               playerVars: {
                  autoplay: 1,
                  playsinline: 1,
                  loop: 1,
                  playlist: videoId,
                  controls: 0,
                  mute: localStorage.getItem('muted') === 'yes' ? 1 : 0,
                  modestbranding: 1,
                  rel: 0,
               },
            }}
            onReady={(event) => {
               window.playerRef = event.target;
            }}
            onPlay={onLoad}
         />
         {/* <video
            autoPlay
            playsInline
            loop
            muted
            onPlaying={onLoad}
            preload="auto"
            className={`w-full h-screen object-contain ${hasLoaded ? '' : 'opacity-0'}`}
            src={`/projects/${project}/video.mp4`}
         /> */}
         {!hasLoaded && (
            <>
               <div
                  className="fixed h-screen w-full z-80 top-1/2 -translate-y-1/2"
                  // onClick={() => attemptPlay(videoRef.current)}
               >
                  <img
                     src={`/images/thumbnails/${project}.png`}
                     alt={project}
                     className="w-full h-full object-contain select-none"
                     draggable={false}
                  />
               </div>
               {showSpinner && (
                  <div className="fixed inset-0 flex items-center justify-center z-100 pointer-events-none">
                     <Spinner />
                  </div>
               )}
            </>
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
