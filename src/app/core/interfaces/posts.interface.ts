export interface IPost{
    id?: string;
    title: string;
    content: string;
    category: string;
    date: string;
    userId?: string;
    emailVerified?: boolean;
}