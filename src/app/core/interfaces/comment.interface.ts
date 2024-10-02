export interface IComment{
    id?: string;
    postId: string;
    body: string;
    date: string;
    userId: string;
}

export interface IDisplayedComment{
    id?: string;
    postId: string;
    body: string;
    date: string;
    userId: string;
}