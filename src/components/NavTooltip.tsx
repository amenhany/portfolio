'use client';

import { AnimatePresence, motion } from 'motion/react';
import { type ReactNode, useCallback, useRef, useState } from 'react';

const CURSOR_OFFSET = 20;
const TOOLTIP_WIDTH = 65;
const TOOLTIP_HEIGHT = 32;
const TOOLTIP_DELAY = 500;

const clamp = (x: number, y: number) => ({
   x: Math.max(4, Math.min(x, window.innerWidth - TOOLTIP_WIDTH - 4)),
   y: Math.max(4, Math.min(y, window.innerHeight - TOOLTIP_HEIGHT - 4)),
});

export default function NavTooltip({ children }: { children: ReactNode }) {
   const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(
      null,
   );
   const currentRef = useRef<{ text: string } | null>(null);
   const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

   const hide = useCallback(() => {
      clearTimeout(timerRef.current ?? undefined);
      currentRef.current = null;
      setTooltip(null);
   }, []);

   const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
         const target = (e.target as Element).closest(
            '[data-nav-tooltip]',
         ) as HTMLElement | null;

         if (target) {
            const text = target.dataset.navTooltip!;

            if (currentRef.current?.text === text) {
               setTooltip((prev) =>
                  prev
                     ? {
                          ...prev,
                          ...clamp(e.clientX + CURSOR_OFFSET, e.clientY + CURSOR_OFFSET),
                       }
                     : null,
               );
               return;
            }

            clearTimeout(timerRef.current ?? undefined);
            currentRef.current = { text };
            timerRef.current = setTimeout(() => {
               setTooltip({
                  text,
                  ...clamp(e.clientX + CURSOR_OFFSET, e.clientY + CURSOR_OFFSET),
               });
            }, TOOLTIP_DELAY);
         } else {
            hide();
         }
      },
      [hide],
   );

   const handleMouseLeave = useCallback(() => hide(), [hide]);

   return (
      <div
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseLeave}
         className="contents"
      >
         {children}
         <AnimatePresence>
            {tooltip && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed pointer-events-none px-3 py-1 text-sm font-bold text-white whitespace-nowrap
                             bg-black/60 border-2 border-white rounded-md z-200"
                  style={{ left: tooltip.x, top: tooltip.y }}
               >
                  {tooltip.text}
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
}
