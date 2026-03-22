import SecretLink from '@/components/SecretLink';
import { DialoguePart } from '@/types/dialogue';
import type { ReactNode } from 'react';

export function tokenize(parts: DialoguePart[]): ReactNode[] {
   const tokens: ReactNode[] = [];
   if (!parts?.length) return [];

   parts.forEach((part) => {
      for (const char of part.text) {
         if (part.link) {
            tokens.push(
               <SecretLink
                  key={tokens.length}
                  secret={part.link}
                  color={part.color ? part.color : undefined}
               >
                  {char}
               </SecretLink>,
            );
         } else if (part.color) {
            tokens.push(
               <span
                  key={tokens.length}
                  className={`text-${part.color} pointer-events-none`}
               >
                  {char}
               </span>,
            );
         } else {
            tokens.push(
               <span key={tokens.length} className="pointer-events-none">
                  {char}
               </span>,
            );
         }
      }
   });

   return tokens;
}
