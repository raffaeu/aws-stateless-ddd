/**
 * An Authenticated user
 */
export type User = {
    username: string;
    email: string;
    roles: [];
    token: string;
}

export type Credentials = {
    username: string;
    password: string;
}