'use client';

import { useEffect, useState } from 'react';

export default function WiiCursor() {
   const [pos, setPos] = useState({ x: 0, y: 0 });
   const [visible, setVisible] = useState(false);

   useEffect(() => {
      const move = (e: MouseEvent) => {
         setPos({ x: e.clientX, y: e.clientY });
         setVisible(true);
      };

      const handleMouseOut = (e: MouseEvent) => {
         if (!e.relatedTarget) {
            setVisible(false);
         }
      };

      const handleTouch = () => setVisible(false);

      document.addEventListener('mousemove', move);
      document.addEventListener('mouseout', handleMouseOut);
      document.addEventListener('touchstart', handleTouch, { passive: true });
      window.addEventListener('blur', () => setVisible(false));

      return () => {
         document.removeEventListener('mousemove', move);
         document.removeEventListener('mouseout', handleMouseOut);
         document.removeEventListener('touchstart', handleTouch);
         window.removeEventListener('blur', () => setVisible(false));
      };
   }, []);

   return (
      <div
         style={{
            opacity: visible ? 1 : 0,
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
            cursor: 'none',
         }}
      />
   );
}
