'use client';
import { AudioManager } from '@/lib/AudioManager';
import DialogueLoader from './DialogueLoader';
import Secrets from './Secrets';

export default function ProjectsClient() {
   function playBGM() {
      AudioManager.Instance().playMusic(
         '/audio/music/main.wav',
         undefined,
         1,
         true,
         2.4,
         165.6,
      );
   }

   function loadProjects() {
      playBGM();
   }

   return (
      <>
         <DialogueLoader onDone={loadProjects} />
         <Secrets cleanUp={playBGM} />
      </>
   );
}
