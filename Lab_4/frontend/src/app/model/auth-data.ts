export type AuthRequest = {
    authType: string,
    username: string,
    password: string
}

export type AuthResponse = {
    message: string,
    jwt: string
}