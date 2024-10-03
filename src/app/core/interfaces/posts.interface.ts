export interface IPost{
    id?: string;
    title: string;
    content: string;
    category: string;
    date: Date;
    userId?: string;
    emailVerified?: boolean;
}