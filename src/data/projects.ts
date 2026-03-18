export const PROJECTS = [
    'cluedo',
    'tvlist',
    'mario',
    'xml_editor',
    'hotel_booking',
] as const;

export type Project = (typeof PROJECTS)[number];

export type ProjectInfo = {
    text: string;
    src: string;
    stack: {
        text: string;
        icon: string;
    }[];
};
