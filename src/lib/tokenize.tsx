import SecretLink from '@/components/SecretLink';
import { DialoguePart, Token } from '@/types/dialogue';

export function tokenize(parts: DialoguePart[]) {
   const tokens: Token[] = [];
   if (!parts || !parts.length) return [];
   const index = tokens.length;

   parts.forEach((part) => {
      for (const char of part.text) {
         const makeNode = (c: string) => {
            if (part.link) {
               return (
                  <SecretLink key={`link-${index}`} secret={part.link}>
                     {c}
                  </SecretLink>
               );
            }
            if (part.color) {
               return (
                  <span
                     key={`char-${index}`}
                     className={`text-${part.color} pointer-events-none`}
                  >
                     {c}
                  </span>
               );
            }
            return (
               <span key={`char-${index}`} className="pointer-events-none">
                  {c}
               </span>
            );
         };
         tokens.push({ char, node: makeNode });
      }
   });

   return tokens;
}
