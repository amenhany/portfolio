import { CircleQuestionMark } from 'lucide-react';
import DialogueChanger from './DialogueChanger';
import VolumeKnob from './VolumeKnob';

export default function Nav() {
   return (
      <nav className="fixed top-0 right-0 p-2 z-10 flex gap-3">
         <DialogueChanger dialogue="about" className="cursor-pointer">
            <CircleQuestionMark
               size={30}
               color="white"
               style={{ filter: 'drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.2))' }}
            />
         </DialogueChanger>
         <VolumeKnob />
      </nav>
   );
}
