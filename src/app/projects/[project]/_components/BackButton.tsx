'use client';

import { useTransition } from '@/app/_components/TransitionProvider';
import { AudioManager } from '@/lib/AudioManager';
import { Undo2 } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { MouseEventHandler } from 'react';

export default function BackButton({ project }: { project: string }) {
   const { startTransition } = useTransition();

   const handleClick: MouseEventHandler<HTMLAnchorElement> = (evt) => {
      AudioManager.Instance().stopMusic();
      AudioManager.Instance().playSfx('/audio/click.wav');
      evt.preventDefault();
      startTransition(`/projects?dialogue=${project}`);
   };
   return (
      <motion.div
         initial={{ x: -100 }}
         animate={{ x: 0 }}
         className="fixed top-0 left-0 pt-4 pl-4 z-100 nav-button"
      >
         <Link href={`/projects?dialogue=${project}`} onClick={handleClick}>
            <Undo2 size={30} />
         </Link>
      </motion.div>
   );
}
