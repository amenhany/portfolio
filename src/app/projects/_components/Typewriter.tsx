'use client';
import { useEffect, useRef, useState } from 'react';
import {
   motion,
   useMotionValue,
   useTransform,
   animate,
   AnimationPlaybackControlsWithThen,
} from 'motion/react';
import { AudioManager } from '@/lib/AudioManager';

type TypewriterProps = {
   text: string;
   speed?: number;
   delay?: number;
   onFinished?: () => void;
   skip?: boolean;
} & React.ComponentPropsWithoutRef<'p'>;

export default function Typewriter({
   text,
   speed = 0.1,
   delay = 0,
   onFinished = () => {},
   skip = false,
   ...props
}: TypewriterProps) {
   const count = useMotionValue(0);
   const rounded = useTransform(count, (v) => Math.round(v));
   const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

   // store animation controls so we can stop/jump
   const controlsRef = useRef<AnimationPlaybackControlsWithThen | null>(null);
   const intervalRef = useRef<NodeJS.Timeout>(null);

   useEffect(() => {
      if (intervalRef.current !== null) {
         clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(
         () => AudioManager.Instance().playSfx('/audio/dialogue.wav'),
         75,
      );

      count.set(0);
      const anim = animate(count, text.length, {
         type: 'tween',
         duration: text.length / speed,
         delay,
         ease: 'linear',
         onComplete: () => {
            onFinished();
            if (intervalRef.current) clearInterval(intervalRef.current);
         },
      });
      controlsRef.current = anim;

      return () => {
         anim.stop();
         if (intervalRef.current) clearInterval(intervalRef.current);
      };
   }, [text, speed, delay]);

   useEffect(() => {
      if (skip && controlsRef.current) {
         controlsRef.current.stop();
         count.set(text.length);
         onFinished();
         if (intervalRef.current) clearInterval(intervalRef.current);
      }
   }, [skip, text, onFinished]);

   return (
      <p {...props}>
         <motion.span>{displayText}</motion.span>
      </p>
   );
}
