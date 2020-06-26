export interface Board {
    title: string;
    id: number;
    content: List[];
}

export interface List {
    title: string;
    id: number;
    content: Item[];
}

export interface Item {
    title: string;
    id: number;
    content: string;
}