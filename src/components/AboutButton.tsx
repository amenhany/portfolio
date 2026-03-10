'use client';
import { Project, PROJECTS } from '@/data/projects';
import { useQueryParams } from '@/hooks/useQueryParams';
import { AudioManager } from '@/lib/AudioManager';
import { CircleQuestionMark } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { type ButtonHTMLAttributes } from 'react';

export default function AboutButton({
   dialogue,
   ...props
}: { dialogue: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
   const { setParam, getParam, getParams, setParamArray } = useQueryParams();
   const pathname = usePathname();
   const isAlternate = pathname.length > 9 && pathname.slice(0, 10) === '/projects/';

   const handleClick = () => {
      const projectDialogue = getParams('dialogue');
      if (
         projectDialogue?.length === 1 &&
         PROJECTS.includes(projectDialogue[0] as Project)
      )
         setParamArray('dialogue', [dialogue, projectDialogue[0]]);
      else setParam('dialogue', dialogue);
   };

   const handleAlternate = () => {
      const info = getParam('info');
      if (info === 'visible') setParam('info', null);
      else {
         AudioManager.Instance().playSfx('/audio/pause.wav');
         setParam('info', 'visible');
      }
   };

   return (
      <button
         {...props}
         onClick={isAlternate ? handleAlternate : handleClick}
         className="drop-shadow nav-button"
      >
         <CircleQuestionMark size={30} />
      </button>
   );
}
