import { Outfit, Nunito } from 'next/font/google';

export const titleFont = Outfit({
    subsets: ['latin'],
    weight: ['500'],
    display: 'swap',
    variable: '--font-title',
});

export const defaultFont = Nunito({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500'],
    display: 'swap',
    variable: '--font-default',
});
