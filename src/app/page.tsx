import Link from 'next/link';
import BootClient from './_components/BootClient';
import { PROJECTS } from '@/data/projects';

export default function Boot() {
   return (
      <>
         {PROJECTS.map((name) => (
            <link
               key={name}
               rel="preload"
               as="image"
               href={`/images/thumbnails/${name}.png`}
            />
         ))}
         <Link href="/projects" className="invisible absolute inset-0 z-[-1]" />
         <BootClient />
      </>
   );
}
