'use client';

import { AnimatePresence, motion } from 'motion/react';
import ProjectTitle from '../../_components/ProjectTitle';
import type { Project, ProjectInfo } from '@/data/projects';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { useQueryParams } from '@/hooks/useQueryParams';

export default function ProjectDescription({
   project,
   info,
}: {
   project: string;
   info: ProjectInfo;
}) {
   const { getParam, setParam } = useQueryParams();
   const isVisible = getParam('info') === 'visible';

   return (
      <AnimatePresence>
         {isVisible && (
            <>
               <div
                  className="fixed w-screen h-screen top-0 left-0"
                  onClick={() => setParam('info', null)}
               />
               <motion.aside
                  className="absolute top-0 left-0 z-90 text-white h-full bg-linear-85 from-black from-20% to-transparent sm:w-110 w-full p-11 overflow-auto"
                  initial={{ opacity: 0, x: '-100%' }}
                  exit={{ opacity: 0, x: '-100%' }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ease: 'easeOut', duration: 0.2 }}
               >
                  <div className="relative">
                     <ProjectTitle project={project as Project} />
                     <Link
                        href={info.src}
                        className="absolute -right-2 -top-2 nav-button z-40"
                     >
                        <ExternalLink />
                     </Link>
                  </div>
                  <div className="relative mt-12">
                     <p className="text-justify mb-5 whitespace-pre-line">{info.text}</p>
                     <h2 className="text-bold my-4 text-xl font-title">Tech Stack</h2>
                     <ul className="space-y-2">
                        {info.stack.map((s, i) => (
                           <li key={i} className="flex pl-5 gap-3 items-center">
                              <img src={s.icon} alt="" className="w-5 h-5" />
                              <span>{s.text}</span>
                           </li>
                        ))}
                     </ul>
                  </div>
               </motion.aside>
            </>
         )}
      </AnimatePresence>
   );
}
