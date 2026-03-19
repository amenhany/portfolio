'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
   useMotionValue,
   useTransform,
   animate,
   AnimationPlaybackControlsWithThen,
} from 'motion/react';
import { AudioManager } from '@/lib/AudioManager';
import { Token } from '@/types/dialogue';

type TypewriterProps = {
   tokens: Token[];
   speed?: number;
   delay?: number;
   onFinished?: () => void;
   skip?: boolean;
   sound?: boolean;
} & React.ComponentPropsWithoutRef<'p'>;

export default function Typewriter({
   tokens,
   speed = 0.1,
   delay = 0,
   onFinished = () => {},
   skip = false,
   sound = true,
   ...props
}: TypewriterProps) {
   const count = useMotionValue(0);
   const rounded = useTransform(count, (v) => Math.round(v));

   // store animation controls so we can stop/jump
   const controlsRef = useRef<AnimationPlaybackControlsWithThen | null>(null);
   const intervalRef = useRef<NodeJS.Timeout>(null);

   const [latestCount, setLatestCount] = useState(0);

   useEffect(() => {
      const unsubscribe = rounded.on('change', (v) => setLatestCount(v));
      return unsubscribe;
   }, [rounded]);

   useEffect(() => {
      if (sound) {
         if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
         }

         intervalRef.current = setInterval(
            () => AudioManager.Instance().playSfx('/audio/dialogue.wav'),
            75,
         );
      }

      count.set(0);
      const anim = animate(count, tokens.length, {
         type: 'tween',
         duration: tokens.length / speed,
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
   }, [tokens, speed, delay, onFinished]);

   useEffect(() => {
      if (skip && controlsRef.current) {
         controlsRef.current.stop();
         count.set(tokens.length);
         onFinished();
         if (intervalRef.current) clearInterval(intervalRef.current);
      }
   }, [skip, tokens, onFinished]);

   return (
      <p {...props}>
         {tokens.slice(0, latestCount).map((t, i) => (
            <React.Fragment key={i}>{t.node(t.char)}</React.Fragment>
         ))}
      </p>
   );
}
