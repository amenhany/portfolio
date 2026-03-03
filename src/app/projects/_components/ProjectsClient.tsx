'use client';
import { AudioManager } from '@/lib/AudioManager';
import DialogueLoader from './dialogue/DialogueLoader';
import Secrets from './Secrets';
import { useEffect, useRef, useState } from 'react';
import ProjectCarousel from './ProjectCarousel';
import { useQueryParams } from '@/hooks/useQueryParams';
import { PROJECTS as projects } from '@/data/projects';
import ProjectTitle from './ProjectTitle';

export default function ProjectsClient() {
   const { getParams, setParam } = useQueryParams();
   const [showProjects, setShowProjects] = useState(false);
   const [index, setIndex] = useState(0);

   useEffect(() => {
      const dialogue = getParams('dialogue');
      if (dialogue.length) {
         const idx = projects.findIndex((p) => dialogue.includes(p));
         if (idx === -1) return;

         setIndex(idx);
         loadProjects();
      } else loadProjects();
   }, []);

   // Not using this because it overrides extra dialogue when loading a URL
   // useEffect(() => {
   //    if (showProjects) setParam('dialogue', projects[index]);
   // }, [index, showProjects]);

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
      setShowProjects(true);
   }

   function updateProjects(idx: number) {
      setIndex(idx);
      setParam('dialogue', projects[idx]);
   }

   return (
      <>
         {showProjects && (
            <section className="relative">
               <ProjectTitle index={index} />
               <ProjectCarousel index={index} setIndex={updateProjects} />
            </section>
         )}
         <DialogueLoader
            onDone={
               showProjects
                  ? () => {}
                  : () => {
                       loadProjects();
                       setParam('dialogue', projects[index]);
                    }
            }
         />
         <Secrets cleanUp={showProjects ? playBGM : () => {}} />
      </>
   );
}
