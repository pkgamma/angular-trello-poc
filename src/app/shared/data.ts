export interface Board {
    title: string;
    id: number;
    content: List[];
}

export interface List {
    title: string;
    content: Item[];
}

export interface Item {
    title: string;
    content: string;
}