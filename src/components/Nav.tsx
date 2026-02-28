import AboutButton from './AboutButton';
import VolumeKnob from './VolumeKnob';

export default function Nav() {
   return (
      <nav className="fixed top-0 right-0 p-2 z-10 flex gap-3">
         <AboutButton dialogue="about" />
         <VolumeKnob />
      </nav>
   );
}
