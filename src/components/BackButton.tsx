'use client';

import { useTransition } from '@/app/_components/TransitionProvider';
import { AudioManager } from '@/lib/AudioManager';
import { Undo2 } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MouseEventHandler } from 'react';

export default function BackButton() {
   const { startTransition } = useTransition();
   const params = useParams();
   const project = params.project as string;

   const handleClick: MouseEventHandler<HTMLAnchorElement> = (evt) => {
      AudioManager.Instance().stopMusic();
      AudioManager.Instance().playSfx('/audio/click.wav');
      evt.preventDefault();
      startTransition(`/projects?dialogue=${project}`);
   };
   return (
      <motion.div
         initial={{ x: -100, y: 0 }}
         animate={{ x: 0, y: 0 }}
         whileTap={{ y: 5 }}
         className="nav-button"
      >
         <Link href={`/projects?dialogue=${project}`} onClick={handleClick}>
            <Undo2 size={30} />
         </Link>
      </motion.div>
   );
}
