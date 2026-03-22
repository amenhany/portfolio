import { type Project } from '@/data/projects';
import { NextFont } from 'next/dist/compiled/@next/font';
import { cluedoFont, marioFont, monoFont, tvListFont } from '../fonts';
import { type ReactNode } from 'react';
import MarioTitle from './titles/MarioTitle';
import CluedoTitle from './titles/CluedoTitle';
import TVListTitle from './titles/TVListTitle';
import XMLEditorTitle from './titles/XMLEditorTitle';
import { defaultFont } from '@/app/fonts';
import HotelBooking from './titles/HotelBooking';

const FONTS: Record<Project, NextFont> = {
   cluedo: cluedoFont,
   tvlist: tvListFont,
   mario: marioFont,
   xml_editor: monoFont,
   hotel_booking: tvListFont,
};
const TITLES: Record<Project, ReactNode> = {
   cluedo: <CluedoTitle />,
   tvlist: <TVListTitle />,
   mario: <MarioTitle />,
   xml_editor: <XMLEditorTitle />,
   hotel_booking: <HotelBooking />,
};

export default function ProjectTitle({ project }: { project: Project }) {
   return (
      <h1
         className={`${FONTS[project].className} relative z-30 h-10 text-5xl text-center mt-12 shadow-text text-white font-bold`}
      >
         {TITLES[project]}
      </h1>
   );
}
