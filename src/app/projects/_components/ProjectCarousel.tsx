'use client';

import { useCallback, useRef, useState } from 'react';
import { motion, Variants } from 'motion/react';
import { Triangle } from 'lucide-react';
import styles from './Projects.module.scss';
import { useRouter } from 'next/navigation';
import { AudioManager } from '@/lib/AudioManager';
import { PROJECTS } from '@/data/projects';

export default function ProjectCarousel({
   index,
   setIndex,
}: {
   index: number;
   setIndex: (idx: number) => void;
}) {
   const router = useRouter();

   const handleClick = useCallback(() => {
      router.push(`/projects/${PROJECTS[index]}`);
   }, [index]);

   const paginate = useCallback(
      (dir: number) => {
         // Logic: (0 + 1) % 3 = 1 | (0 - 1 + 3) % 3 = 2
         setIndex((index + dir + PROJECTS.length) % PROJECTS.length);
         AudioManager.Instance().playSfx('/audio/next.wav');
      },
      [index],
   );

   return (
      <div className="relative mt-4 flex justify-center items-center h-100 w-full select-none">
         <RedArrow onClick={() => paginate(-1)} direction="left" />

         <div className="relative flex justify-center items-center w-full h-64">
            {PROJECTS.map((name, i) => {
               let offset = i - index;
               if (offset > PROJECTS.length / 2) offset -= PROJECTS.length;
               if (offset < -PROJECTS.length / 2) offset += PROJECTS.length;
               if (Math.abs(offset) > 2) return null;

               return (
                  <ProjectCard
                     key={name}
                     name={name}
                     offset={offset}
                     onClick={handleClick}
                  />
               );
            })}
         </div>

         <RedArrow onClick={() => paginate(1)} direction="right" />
      </div>
   );
}

const ZOOM_TIME = 0.7;
const variants: Variants = {
   initial: (off: number) => {
      if (off === 0)
         return {
            scale: 0,
            opacity: 0,
            x: 0,
         };
      else
         return {
            opacity: 0,
            scale: 0,
            x: off > 0 ? '-70%' : '70%',
         };
   },
   active: (off: number) => ({
      x: `calc(${off} * 29vw)`, // Distance between cards
      scale: off === 0 ? 1.2 : 0.8,
      opacity: Math.abs(off) > 1 ? 0 : off === 0 ? 1 : 0.6,
      // filter: off === 0 ? 'blur(0px)' : 'blur(2px)',
      zIndex: off === 0 ? 20 : 10,
      // boxShadow: off === 0 ? '10px 10px 1px 6px rgba(0, 0, 0, 0.1)' : 'none',
      // display: Math.abs(off) > 1 ? 'none' : 'block', // Hide far-away items
      top: '50%',
      y: '-50%',
   }),
   tap: { scale: 1.15 },
   hover: { scale: 1.25 },
   clicked: {
      scale: 1,
      position: 'fixed',
      height: '100vh',
      width: '100%',
      zIndex: 80,
      border: 'none',
      top: '50%',
      y: '-50%',
      borderRadius: 0,
      opacity: 1,
      transition: { duration: ZOOM_TIME, ease: [0.4, 0, 0.2, 1] },
   },
};

const ProjectCard = ({
   name,
   offset,
   onClick,
}: {
   name: string;
   offset: number;
   onClick: () => void;
}) => {
   const isFirstRender = useRef(true);
   const [hasClicked, setHasClicked] = useState(false);
   const [echo, setEcho] = useState<boolean>(false);
   const [fitContain, setFitContain] = useState(false);
   const router = useRouter();

   const handleClick = useCallback(() => {
      if (offset !== 0) return;
      setEcho(true);

      router.prefetch(`/projects/${name}`);

      AudioManager.Instance().playSfx('/audio/click.wav');
      AudioManager.Instance().stopMusic();

      setTimeout(() => {
         setHasClicked(true);
         setFitContain(true);
         setTimeout(onClick, ZOOM_TIME * 1000);
      }, 1000);
   }, [offset, name, onClick]);

   return (
      <motion.div
         custom={offset}
         initial="initial"
         animate={hasClicked ? 'clicked' : 'active'}
         variants={variants}
         whileHover={offset === 0 && !hasClicked ? 'hover' : undefined}
         whileTap={offset === 0 && !hasClicked ? 'tap' : undefined}
         onTap={handleClick}
         onAnimationComplete={() => (isFirstRender.current = false)}
         transition={{
            type: 'spring',
            stiffness: 200,
            damping: 28,
            // opacity: { duration: 0.2 },
            delay: offset !== 0 && isFirstRender.current ? 0.25 : 0,
         }}
         className={`absolute ${styles.projectCard} ${offset === 0 ? styles.active : ''} rounded-xl bg-neutral-800 border border-white/10`}
      >
         {echo && (
            <div className={styles.echo}>
               <img
                  src={`/images/thumbnails/${name}.png`}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover select-none"
                  draggable={false}
               />
            </div>
         )}
         <img
            src={`/images/thumbnails/${name}.png`}
            alt={name}
            loading="eager"
            className={`w-full h-full select-none ${fitContain ? 'object-contain' : 'object-cover'}`}
            draggable={false}
         />
      </motion.div>
   );
};

function RedArrow({
   onClick,
   direction,
}: {
   onClick: () => void;
   direction: 'left' | 'right';
}) {
   return (
      <motion.div
         className={`cursor-pointer red-arrow z-50 absolute ${direction === 'left' ? 'left-[23%] -rotate-90' : 'right-[23%] rotate-90'}`}
         whileHover={{ scale: 1.1, y: -5 }}
         whileTap={{ scale: 0.9 }}
         onClick={onClick}
      >
         <Triangle size={50} />
      </motion.div>
   );
}
