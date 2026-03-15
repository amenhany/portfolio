import { Suspense } from 'react';
import ProjectsClient from './_components/ProjectsClient';
import StarBackground from './_components/StarBackground';

export default function Projects() {
   return (
      <main className="bg-nintendo-yellow min-h-screen">
         <StarBackground />
         <Suspense fallback={null}>
            <ProjectsClient />
         </Suspense>
      </main>
   );
}
