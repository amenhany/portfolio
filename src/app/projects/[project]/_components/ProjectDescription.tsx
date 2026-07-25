'use client';

import { AnimatePresence, motion } from 'motion/react';
import ProjectTitle from '../../_components/ProjectTitle';
import type { Project, ProjectInfo } from '@/data/projects';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useEffect, useState } from 'react';
import type { MDXComponents } from 'mdx/types';

export default function ProjectDescription({
   project,
   info,
}: {
   project: string;
   info: ProjectInfo;
}) {
   const { getParam, setParam } = useQueryParams();
   const isVisible = getParam('info') === 'visible';
   const [MDX, setMDX] = useState<React.ComponentType<{
      components?: MDXComponents;
   }> | null>(null);

   const MDXComponents = {
      p: ({ children }: { children: React.ReactNode }) => (
         <p className="text-justify mb-5 whitespace-pre-line">{children}</p>
      ),
      h2: ({ children }: { children: React.ReactNode }) => (
         <h2 className="text-bold my-4 text-xl font-title">{children}</h2>
      ),
      ul: ({ children }: { children: React.ReactNode }) => (
         <ul className="pl-5 space-y-2 mb-5">{children}</ul>
      ),
      li: ({ children }: { children: React.ReactNode }) => (
         <li style={{ listStyleType: 'disc' }} className="leading-relaxed">
            {children}
         </li>
      ),
   };

   useEffect(() => {
      import(`@/assets/projects/description/${project}.mdx`).then((m) =>
         setMDX(() => m.default),
      );
   }, [project]);

   return (
      <AnimatePresence>
         {isVisible && (
            <>
               <div
                  className="fixed w-screen h-dvh top-0 left-0"
                  onClick={() => setParam('info', null)}
               />
               <motion.aside
                  className="absolute top-0 left-0 z-90 text-white h-full bg-linear-80 from-black from-35% via-black/80 to-transparent min-w-110 max-w-250 sm:w-1/3 w-full p-11 overflow-auto"
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
                     {MDX && <MDX components={MDXComponents} />}
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
