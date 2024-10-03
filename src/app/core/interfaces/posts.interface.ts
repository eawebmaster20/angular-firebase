export interface IPost{
    id?: string;
    title: string;
    body: string;
    date: Date;
    userId?: string;
    emailVerified?: boolean;
}