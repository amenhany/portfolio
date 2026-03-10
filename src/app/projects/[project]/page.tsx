import { ProjectInfo } from '@/data/projects';
import BackButton from './_components/BackButton';
import ProjectDescription from './_components/ProjectDescription';
import ProjectVideo from './_components/ProjectVideo';

export default async function Project({
   params,
}: {
   params: Promise<{ project: string }>;
}) {
   const { project } = await params;
   const info = (await import(`@/assets/projects/${project}.json`))
      .default as ProjectInfo;

   return (
      <>
         <BackButton project={project} />
         <main className="bg-black min-h-screen relative overflow-hidden content-end">
            <ProjectVideo project={project} />
            <ProjectDescription project={project} info={info} />
         </main>
      </>
   );
}
