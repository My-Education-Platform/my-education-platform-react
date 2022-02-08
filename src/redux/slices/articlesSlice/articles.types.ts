import { Timestamp } from "firebase/firestore";

export interface ArticlesState {
    articles: IArticle[]
}

export interface IArticle {
    title: string;
    content: string;
    id?: string;
    accountId: string;
    ownerId: string;
    published: boolean;
    createdAt: number;
    sketch: string;
}