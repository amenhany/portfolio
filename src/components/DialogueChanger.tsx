'use client';
import { useRouter } from 'next/navigation';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export default function DialogueChanger({
   dialogue,
   children,
   ...props
}: { dialogue: string; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
   const router = useRouter();

   const addDialogueKey = () => {
      const params = new URLSearchParams();
      params.append('dialogue', dialogue);
      router.push(`?${params.toString()}`);
   };

   return (
      <button {...props} onClick={addDialogueKey}>
         {children}
      </button>
   );
}
