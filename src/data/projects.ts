export const PROJECTS = [
    'cluedo',
    'tvlist',
    'mario',
    'cluedo',
    'tvlist',
    'mario',
] as const;

export type Project = (typeof PROJECTS)[number];

export type ProjectInfo = {
    text: string;
    stack: string[];
    src: string;
};
