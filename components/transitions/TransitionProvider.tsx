'use client';

import { createContext, PropsWithChildren, useContext, useState } from 'react';
import DiagonalWipe from './DiagonalWipe';

const TransitionContext = createContext({
   startTransition: (cb: () => void) => {},
});

export function useTransition() {
   return useContext(TransitionContext);
}

export default function TransitionProvider({ children }: PropsWithChildren) {
   const [isActive, setIsActive] = useState(false);
   const [onComplete, setOnComplete] = useState<() => void>(() => () => {});

   const startTransition = (cb: () => void) => {
      setOnComplete(() => cb);
      setIsActive(true);
   };

   return (
      <TransitionContext.Provider value={{ startTransition }}>
         {children}
         {isActive && (
            <DiagonalWipe
               onDone={async () => {
                  setTimeout(() => setIsActive(false), 200);
                  onComplete();
               }}
            />
         )}
      </TransitionContext.Provider>
   );
}
