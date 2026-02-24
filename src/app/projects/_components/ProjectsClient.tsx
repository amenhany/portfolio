'use client';
import { AudioManager } from '@/lib/AudioManager';
import DialogueLoader from './DialogueLoader';
import Secrets from './Secrets';

export default function ProjectsClient() {
   function loadProjects() {
      AudioManager.Instance().playMusic(
         '/audio/music/main.mp3',
         undefined,
         true,
         2.4,
         165.6,
      );
   }
   return (
      <>
         <DialogueLoader onDone={loadProjects} />
         <Secrets />
      </>
   );
}
