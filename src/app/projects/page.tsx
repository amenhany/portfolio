import { Suspense } from 'react';
import ProjectsClient from './_components/ProjectsClient';
import StarBackground from './_components/StarBackground';
import Contacts from './_components/Contacts';

export default function Projects() {
   return (
      <main className="bg-nintendo-yellow min-h-screen">
         <StarBackground />
         <Suspense fallback={null}>
            <ProjectsClient />
         </Suspense>
         <Contacts />
      </main>
   );
}
