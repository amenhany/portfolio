'use client';

import { useSearchParams } from 'next/navigation';
import DialogueBox from './DialogueBox';
import { useDialogue } from '@/hooks/useDialogue';
import { AnimatePresence } from 'motion/react';

export default function DialogueLoader({ onDone = () => {} }: { onDone?: () => void }) {
   const searchParams = useSearchParams();
   const keys = searchParams.getAll('dialogue');
   const dialogue = useDialogue(keys);

   return (
      <AnimatePresence>
         {dialogue.length && <DialogueBox dialogue={dialogue} onDone={onDone} />}
      </AnimatePresence>
   );
}
