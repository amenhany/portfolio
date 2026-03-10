'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useSearchParams } from 'next/navigation';
import ProjectTitle from '../../_components/ProjectTitle';
import type { Project, ProjectInfo } from '@/data/projects';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function ProjectDescription({
   project,
   info,
}: {
   project: string;
   info: ProjectInfo;
}) {
   const searchParams = useSearchParams();
   const isVisible = searchParams.get('info') === 'visible';

   return (
      <AnimatePresence>
         {isVisible && (
            <motion.aside
               className="absolute top-0 left-0 z-90 text-white h-full bg-linear-80 from-black from-20% to-transparent w-90 p-11 overflow-auto"
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
                  <p className="text-justify mb-5">{info.text}</p>
                  <h2 className="text-bold my-3 text-xl font-title">Tech Stack</h2>
                  <ul>
                     {info.stack.map((s, i) => (
                        <li key={i} className="ml-2 mb-1">
                           {s}
                        </li>
                     ))}
                  </ul>
               </div>
            </motion.aside>
         )}
      </AnimatePresence>
   );
}
