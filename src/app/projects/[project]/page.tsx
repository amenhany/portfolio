import { type Project, type ProjectInfo, PROJECTS } from '@/data/projects';
import BackButton from './_components/BackButton';
import ProjectDescription from './_components/ProjectDescription';
import ProjectVideo from './_components/ProjectVideo';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function Project({
   params,
}: {
   params: Promise<{ project: string }>;
}) {
   const { project } = await params;
   if (!PROJECTS.includes(project as Project)) redirect('/projects?dialogue=unknown');

   const info = (await import(`@/assets/projects/${project}.json`))
      .default as ProjectInfo;

   return (
      <>
         <BackButton project={project} />
         <main className="bg-black min-h-screen relative overflow-hidden content-end">
            <ProjectVideo project={project} sound={info.sound} />
            <Suspense fallback={null}>
               <ProjectDescription project={project} info={info} />
            </Suspense>
         </main>
      </>
   );
}
