'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, Variants } from 'motion/react';
import { Triangle } from 'lucide-react';
import styles from './Projects.module.scss';
import { useRouter } from 'next/navigation';
import { AudioManager } from '@/lib/AudioManager';
import { PROJECTS as projects } from '@/data/projects';

export default function ProjectCarousel({
   index,
   setIndex,
}: {
   index: number;
   setIndex: (idx: number) => void;
}) {
   const router = useRouter();

   const handleClick = () => {
      router.push(`/projects/${projects[index]}`);
   };

   const paginate = (dir: number) => {
      // Logic: (0 + 1) % 3 = 1 | (0 - 1 + 3) % 3 = 2
      setIndex((index + dir + projects.length) % projects.length);
      AudioManager.Instance().playSfx('/audio/next.wav');
   };

   return (
      <div className="relative mt-4 flex justify-center items-center h-100 w-full select-none">
         <RedArrow onClick={() => paginate(-1)} direction="left" />

         <div className="relative flex justify-center items-center w-full h-64">
            {projects.map((name, i) => (
               <ProjectCard
                  key={name + i}
                  name={name}
                  currentIndex={index}
                  itemIndex={i}
                  onClick={index === i ? handleClick : () => {}}
               />
            ))}
         </div>

         <RedArrow onClick={() => paginate(1)} direction="right" />
      </div>
   );
}

const ZOOM_TIME = 0.7;

const ProjectCard = ({
   name,
   currentIndex,
   itemIndex,
   onClick,
}: {
   name: string;
   currentIndex: number;
   itemIndex: number;
   onClick: () => void;
}) => {
   const isFirstRender = useRef(true);
   const [hasClicked, setHasClicked] = useState(false);
   const [echo, setEcho] = useState<boolean>(false);
   const router = useRouter();
   const imgRef = useRef<HTMLImageElement>(null);
   let offset = itemIndex - currentIndex;
   if (offset > projects.length / 2) offset -= projects.length;
   if (offset < -projects.length / 2) offset += projects.length;

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
         x: off * 29 + 'vw', // Distance between cards
         scale: off === 0 ? 1.2 : 0.8,
         opacity: Math.abs(off) > 1 ? 0 : off === 0 ? 1 : 0.6,
         filter: off === 0 ? 'blur(0px)' : 'blur(2px)',
         zIndex: off === 0 ? 20 : 10,
         // boxShadow: off === 0 ? '10px 10px 1px 6px rgba(0, 0, 0, 0.1)' : 'none',
         display: Math.abs(off) > 1 ? 'none' : 'block', // Hide far-away items
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

   const handleClick = () => {
      if (offset !== 0) return;
      setEcho(true);

      router.prefetch(`/projects/${name}`);

      AudioManager.Instance().playSfx('/audio/click.wav');
      AudioManager.Instance().stopMusic();

      setTimeout(() => {
         setHasClicked(true);
         if (imgRef.current) imgRef.current.style.objectFit = 'contain';
         setTimeout(onClick, ZOOM_TIME * 1000);
      }, 1000);
   };

   return (
      <motion.div
         custom={offset}
         initial="initial"
         animate={hasClicked ? 'clicked' : 'active'}
         variants={variants}
         whileHover={offset === 0 && !hasClicked ? 'hover' : ''}
         whileTap={offset === 0 && !hasClicked ? 'tap' : ''}
         onTap={handleClick}
         onAnimationComplete={() => (isFirstRender.current = false)}
         transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            // opacity: { duration: 0.2 },
            delay: offset !== 0 && isFirstRender.current ? 0.25 : 0,
         }}
         className={`absolute ${styles.projectCard} ${offset === 0 ? styles.active : ''} rounded-xl bg-neutral-800 border border-white/10`}
      >
         <AnimatePresence>
            {echo && (
               <motion.div
                  className={`absolute ${styles.projectCard} ${offset === 0 ? styles.active : ''} -z-1 rounded-xl bg-neutral-800 border border-white/10`}
                  initial={{ scale: 1, opacity: 0.4 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                     duration: 0.6,
                     ease: 'easeOut',
                  }}
                  onAnimationComplete={() => setEcho(false)}
               >
                  <img
                     src={`/images/thumbnails/${name}.png`}
                     alt={name}
                     className="w-full h-full object-cover select-none"
                     draggable={false}
                  />
               </motion.div>
            )}
         </AnimatePresence>
         <img
            src={`/images/thumbnails/${name}.png`}
            alt={name}
            ref={imgRef}
            className="w-full h-full object-cover select-none"
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
