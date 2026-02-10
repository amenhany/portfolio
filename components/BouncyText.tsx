'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function BouncyText({ text }: { text: string }) {
   const containerRef = useRef<HTMLSpanElement>(null);

   useEffect(() => {
      if (!containerRef.current) return;
      const letters = containerRef.current.querySelectorAll('.letter');

      const tl = gsap.timeline();

      tl.to(letters, {
         opacity: 1,
         y: -50,
         duration: 0.3,
         ease: 'power1.out',
         stagger: { each: 0.1 },
      });

      tl.to(
         letters,
         {
            y: 0,
            duration: 0.3,
            ease: 'power1.out',
            stagger: { each: 0.1 },
         },
         '-=0.4',
      );

      tl.to(containerRef.current, {
         delay: 0.1,
         scale: 0.5,
         duration: 0.3,
         ease: 'power1.out',
      });
   }, [text]);

   return (
      <span ref={containerRef} style={{ display: 'inline-block' }}>
         {[...text].map((char, idx) => (
            <span key={idx} className="letter" style={{ display: 'inline-block' }}>
               {char}
            </span>
         ))}
      </span>
   );
}
