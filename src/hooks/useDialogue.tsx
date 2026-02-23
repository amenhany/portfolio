import { useEffect, useState } from 'react';

export function useDialogue(keys: string[]) {
   const [dialogues, setDialogues] = useState<string[]>([]);

   useEffect(() => {
      async function load() {
         const loaded = await Promise.all(
            keys.map(async (key) => {
               try {
                  const module = await import(`@/assets/dialogues/${key}.json`);
                  return module.default as string[];
               } catch {
                  console.warn(`Dialogue ${key} doesn’t exist`);
                  return [];
               }
            }),
         );
         setDialogues(loaded.flat());
      }
      load();
   }, [keys.join(',')]);

   return dialogues;
}
