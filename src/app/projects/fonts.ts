import localFont from 'next/font/local';
import { JetBrains_Mono, Roboto, Rubik } from 'next/font/google';

export const marioFont = localFont({
    src: './_fonts/SuperMario256.ttf',
    display: 'swap',
});

export const cluedoFont = localFont({
    src: './_fonts/CupheadHenriette.ttf',
    display: 'swap',
});

export const tvListFont = Rubik({
    subsets: ['latin'],
    weight: ['700'],
    display: 'swap',
});

export const monoFont = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['700'],
    display: 'swap',
});
