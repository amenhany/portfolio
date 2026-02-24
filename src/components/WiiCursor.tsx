'use client';

import { useEffect, useState } from 'react';

export default function WiiCursor() {
   const [pos, setPos] = useState({ x: 0, y: 0 });

   useEffect(() => {
      const move = (e: MouseEvent) => {
         setPos({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener('mousemove', move);
      return () => window.removeEventListener('mousemove', move);
   }, []);

   return (
      <div
         style={{
            position: 'fixed',
            top: pos.y + 22 + 'px',
            left: pos.x + 'px',
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',

            width: '50px',
            height: '50px',

            backgroundImage: 'url(/images/wii-pointer.png)',
            backgroundSize: 'contain',
            zIndex: 9999,
            rotate: '13.5deg',
         }}
      />
   );
}
