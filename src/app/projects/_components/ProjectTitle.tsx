import { Project, PROJECTS } from '@/data/projects';
import { NextFont } from 'next/dist/compiled/@next/font';
import { cluedoFont, marioFont, tvListFont } from '../fonts';
import { type ReactNode } from 'react';
import MarioTitle from './titles/MarioTitle';
import CluedoTitle from './titles/CluedoTitle';
import TVListTitle from './titles/TVListTitle';

const FONTS: Record<Project, NextFont> = {
   cluedo: cluedoFont,
   tvlist: tvListFont,
   mario: marioFont,
};
const TITLES: Record<Project, ReactNode> = {
   cluedo: <CluedoTitle />,
   tvlist: <TVListTitle />,
   mario: <MarioTitle />,
};

export default function ProjectTitle({ index }: { index: number }) {
   return (
      <h1
         className={`${FONTS[PROJECTS[index]].className} relative z-30 h-10 text-5xl text-center mt-12 shadow-text text-white font-bold`}
      >
         {TITLES[PROJECTS[index]]}
      </h1>
   );
}
