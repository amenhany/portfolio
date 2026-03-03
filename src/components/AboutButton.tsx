'use client';
import { Project, PROJECTS } from '@/data/projects';
import { useQueryParams } from '@/hooks/useQueryParams';
import { CircleQuestionMark } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

export default function AboutButton({
   dialogue,
   ...props
}: { dialogue: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
   const { setParam, getParams, setParamArray } = useQueryParams();

   const handleClick = () => {
      const projectDialogue = getParams('dialogue');
      if (
         projectDialogue?.length === 1 &&
         PROJECTS.includes(projectDialogue[0] as Project)
      )
         setParamArray('dialogue', [dialogue, projectDialogue[0]]);
      else setParam('dialogue', dialogue);
   };

   return (
      <button {...props} onClick={handleClick}>
         <CircleQuestionMark size={30} color="white" className="drop-shadow" />
      </button>
   );
}
