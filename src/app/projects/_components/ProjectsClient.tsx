'use client';
import { AudioManager } from '@/lib/AudioManager';
import DialogueLoader from './dialogue/DialogueLoader';
import Secrets from './Secrets';
import { useEffect, useState } from 'react';
import ProjectCarousel from './ProjectCarousel';
import { useQueryParams } from '@/hooks/useQueryParams';
import { PROJECTS as projects } from '@/data/projects';
import ProjectTitle from './ProjectTitle';

export default function ProjectsClient() {
   const { getParams, setParam } = useQueryParams();
   const [showProjects, setShowProjects] = useState(false);
   const [index, setIndex] = useState(0);

   useEffect(() => {
      AudioManager.Instance().load('/audio/music/main.wav');
      AudioManager.Instance().load('/audio/next.wav');
      AudioManager.Instance().load('/audio/click.wav');
      const dialogue = getParams('dialogue');
      if (dialogue.length) {
         const idx = projects.findIndex((p) => dialogue.includes(p));
         if (idx === -1) return;

         setIndex(idx);
         loadProjects();
      } else {
         loadProjects();
         updateProjects(0);
      }
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
      <div className="relative flex flex-col h-dvh overflow-hidden">
         <div className="flex flex-col flex-1 min-h-0 gap-5 md:gap-12">
            {showProjects && (
               <>
                  <ProjectTitle project={projects[index]} />
                  <div className="flex-1 flex items-center justify-center min-h-0">
                     <ProjectCarousel index={index} setIndex={updateProjects} />
                  </div>
               </>
            )}
         </div>
         <section className="relative h-[40vh] sm:w-4/5 w-9/10 flex justify-center shrink-0 mb-5 ms-auto me-auto">
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
         </section>
         <Secrets cleanUp={showProjects ? playBGM : () => {}} />
      </div>
   );
}
