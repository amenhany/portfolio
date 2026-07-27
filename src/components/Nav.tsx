'use client';

import React from 'react';
import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import AboutButton from './AboutButton';
import VolumeKnob from './VolumeKnob';
import BackButton from './BackButton';
import Contacts from './Contacts';
import NavTooltip from './NavTooltip';

type NavSlot = {
   component: React.ReactNode;
   show: (pathname: string) => boolean;
};

const leftSlots: NavSlot[] = [
   {
      component: <BackButton />,
      show: (p) => p.startsWith('/projects/') && p !== '/projects',
   },
   { component: <Contacts />, show: (p) => p === '/projects' },
];

const rightSlots: NavSlot[] = [
   {
      component: (
         <Suspense fallback={null}>
            <AboutButton dialogue="about" />
         </Suspense>
      ),
      show: () => true,
   },
   { component: <VolumeKnob />, show: () => true },
];

export default function Nav() {
   const pathname = usePathname();

   return (
      <NavTooltip>
         <nav className="fixed top-0 left-0 right-0 z-100 pointer-events-none flex items-start justify-between">
            <div className="pointer-events-auto p-4 flex gap-3 items-center">
               {leftSlots.map(
                  (slot, i) =>
                     slot.show(pathname) && (
                        <React.Fragment key={i}>{slot.component}</React.Fragment>
                     ),
               )}
            </div>
            <div className="pointer-events-auto p-2 flex gap-3 items-center">
               {rightSlots.map(
                  (slot, i) =>
                     slot.show(pathname) && (
                        <React.Fragment key={i}>{slot.component}</React.Fragment>
                     ),
               )}
            </div>
         </nav>
      </NavTooltip>
   );
}
