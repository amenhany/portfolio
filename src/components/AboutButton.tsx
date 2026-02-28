'use client';
import { useQueryParams } from '@/hooks/useQueryParams';
import { CircleQuestionMark } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

export default function AboutButton({
   dialogue,
   ...props
}: { dialogue: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
   const { setParam } = useQueryParams();

   return (
      <button {...props} onClick={() => setParam('dialogue', dialogue)}>
         <CircleQuestionMark size={30} color="white" className="drop-shadow" />
      </button>
   );
}
