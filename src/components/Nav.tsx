import { Suspense } from 'react';
import AboutButton from './AboutButton';
import VolumeKnob from './VolumeKnob';

export default function Nav() {
   return (
      <nav className="fixed top-0 right-0 p-2 z-100 flex gap-3">
         <Suspense fallback={null}>
            <AboutButton dialogue="about" />
         </Suspense>
         <VolumeKnob />
      </nav>
   );
}
