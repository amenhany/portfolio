import { CircleQuestionMark } from 'lucide-react';
import DialogueChanger from './DialogueChanger';
import VolumeKnob from './VolumeKnob';

export default function Nav() {
   return (
      <nav className="fixed top-0 right-0 p-2 z-10 flex gap-3">
         <DialogueChanger dialogue="about">
            <CircleQuestionMark size={30} color="white" className="drop-shadow" />
         </DialogueChanger>
         <VolumeKnob />
      </nav>
   );
}
