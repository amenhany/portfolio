'use client';

import { createContext, PropsWithChildren, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import DiagonalWipe from './DiagonalWipe';

const TransitionContext = createContext({
   startTransition: (href: string) => {},
});

export function useTransition() {
   return useContext(TransitionContext);
}

export default function TransitionProvider({ children }: PropsWithChildren) {
   const [isActive, setIsActive] = useState(false);
   const [pendingPath, setPendingPath] = useState<string | null>(null);

   const router = useRouter();
   const pathname = usePathname();

   const startTransition = (href: string) => {
      setPendingPath(href);
      setIsActive(true);
   };

   // When route actually changes, remove wipe
   useEffect(() => {
      if (pendingPath && pathname === pendingPath.split('?')[0]) {
         setIsActive(false);
         setPendingPath(null);
      }
   }, [pathname, pendingPath]);

   return (
      <TransitionContext.Provider value={{ startTransition }}>
         {children}
         {isActive && (
            <DiagonalWipe
               onDone={pendingPath ? () => router.push(pendingPath) : () => {}}
            />
         )}
      </TransitionContext.Provider>
   );
}
