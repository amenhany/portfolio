'use client';
import React, { type ReactNode, useEffect, useRef } from 'react';
import { animate, useMotionValue } from 'motion/react';
import { AudioManager } from '@/lib/AudioManager';

type TypewriterProps = {
   tokens: ReactNode[];
   speed?: number;
   delay?: number;
   onFinished?: () => void;
   skip?: boolean;
   sound?: boolean;
} & React.ComponentPropsWithoutRef<'p'>;

export default function Typewriter({
   tokens,
   speed = 50,
   onFinished = () => {},
   skip = false,
   sound = true,
   ...props
}: TypewriterProps) {
   const containerRef = useRef<HTMLParagraphElement>(null);
   const count = useMotionValue(0);
   const audioSrcRef = useRef<AudioBufferSourceNode | null>(null);

   function stopAudio() {
      if (audioSrcRef.current) audioSrcRef.current.loop = false;
   }

   useEffect(() => {
      let isCancelled = false;
      if (sound) {
         AudioManager.Instance()
            .playSfx('/audio/dialogue.wav', true)
            .then((src) => {
               if (!isCancelled) audioSrcRef.current = src;
               else src.loop = false;
            });
      }

      count.set(0);
      const anim = animate(count, tokens.length, {
         duration: tokens.length / speed,
         ease: 'linear',
         onUpdate: (latest) => {
            const currentIdx = Math.floor(latest);
            if (!containerRef.current) return;

            const children = containerRef.current.children;
            for (let i = 0; i < children.length; i++) {
               (children[i] as HTMLElement).style.opacity = i < currentIdx ? '1' : '0';
            }
         },
         onComplete: () => {
            stopAudio();
            onFinished();
         },
      });

      return () => {
         isCancelled = true;
         anim.stop();
         stopAudio();
      };
   }, [tokens, speed]);

   // Handle Skip
   useEffect(() => {
      if (skip) {
         count.stop();
         stopAudio();
         if (containerRef.current) {
            Array.from(containerRef.current.children).forEach(
               (c) => ((c as HTMLElement).style.opacity = '1'),
            );
         }
         onFinished();
      }
   }, [skip]);

   return (
      <p ref={containerRef} {...props}>
         {tokens.map((node, i) => (
            <span key={i} style={{ opacity: '0' }}>
               {node}
            </span>
         ))}
      </p>
   );
}
