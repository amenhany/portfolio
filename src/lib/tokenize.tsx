import QueryLink from '@/components/QueryLink';
import { DialoguePart, Token } from '@/types/dialogue';

export function tokenize(parts: DialoguePart[]) {
   const tokens: Token[] = [];
   if (!parts || !parts.length) return [];

   parts.forEach((part) => {
      for (const char of part.text) {
         const makeNode = (c: string) => {
            if (part.link) {
               return (
                  <QueryLink key={Math.random()} queryKey={part.link}>
                     {c}
                  </QueryLink>
               );
            }
            if (part.color) {
               return (
                  <span
                     key={Math.random()}
                     className={`text-${part.color} pointer-events-none`}
                  >
                     {c}
                  </span>
               );
            }
            return (
               <span key={Math.random()} className="pointer-events-none">
                  {c}
               </span>
            );
         };
         tokens.push({ char, node: makeNode });
      }
   });

   return tokens;
}
