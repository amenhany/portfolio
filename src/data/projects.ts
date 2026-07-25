export const PROJECTS = [
    'cluedo',
    'tvlist',
    'mario',
    'xml_editor',
    'hotel_booking',
    'distributed_marketplace',
] as const;

export type Project = (typeof PROJECTS)[number];

export type ProjectInfo = {
    src: string;
    stack: {
        text: string;
        icon: string;
    }[];
    videoId: string;
};
