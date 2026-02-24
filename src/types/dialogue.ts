import { ReactNode } from 'react';

export type DialoguePart = {
    text: string;
    color?: string;
    link?: string;
};

export type Token = {
    char: string;
    node: (char: string) => ReactNode;
};
