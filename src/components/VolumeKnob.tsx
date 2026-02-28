'use client';
import styles from './VolumeKnob.module.scss';
import { AudioManager } from '@/lib/AudioManager';
import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export default function VolumeKnob() {
   const [isHovered, setIsHovered] = useState(false);
   const [volume, setVolume] = useState(1);
   const [isMuted, setIsMuted] = useState(false);
   const inputRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
      const muted = localStorage.getItem('muted');

      const vol = localStorage.getItem('volume');
      if (vol) updateVolume(parseFloat(vol));

      if (muted == 'yes') toggleMute();
   }, []);

   function toggleMute() {
      AudioManager.Instance().setMasterVolume(isMuted ? volume : 0);
      setIsMuted((prev) => !prev);
      localStorage.setItem('muted', isMuted ? 'no' : 'yes');
   }

   function updateVolume(value: number) {
      setVolume(value);
      localStorage.setItem('volume', value.toString());
      AudioManager.Instance().setMasterVolume(value);

      setIsMuted(false);
      localStorage.setItem('muted', 'no');

      if (inputRef.current) updateSliderFill(inputRef.current);
   }

   function updateSliderFill(el: HTMLInputElement) {
      const val = parseFloat(el.value);
      const min = parseFloat(el.min) || 0;
      const max = parseFloat(el.max) || 1;
      const pct = ((val - min) / (max - min)) * 100;

      el.style.background = `
         linear-gradient(
            to right,
            rgba(255,255,255,1) 0%,
            rgba(255,255,255,1) ${pct}%,
            rgba(255,255,255,0.5) ${pct}%,
            rgba(255,255,255,0.5) 100%
         )
      `;
   }

   useEffect(() => {
      if (inputRef.current) updateSliderFill(inputRef.current);
   }, [isHovered]);

   return (
      <motion.div
         onHoverStart={() => setIsHovered(true)}
         onHoverEnd={() => setIsHovered(false)}
         className={styles.volumeKnob}
      >
         <button className={`${styles.muteButton} drop-shadow`} onClick={toggleMute}>
            {isMuted ? (
               <VolumeX size={30} />
            ) : volume < 0.03 ? (
               <Volume size={30} />
            ) : volume < 0.5 ? (
               <Volume1 size={30} />
            ) : (
               <Volume2 size={30} />
            )}
         </button>

         <AnimatePresence>
            {isHovered && (
               <motion.div
                  className={styles.volumeSlider}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  style={{ originX: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
               >
                  <input
                     type="range"
                     ref={inputRef}
                     value={volume}
                     min="0"
                     max="1"
                     step="0.01"
                     onChange={(e) => updateVolume(parseFloat(e.target.value))}
                  />
               </motion.div>
            )}
         </AnimatePresence>
      </motion.div>
   );
}
