export type AuthRequest = {
    authType: string,
    username: string,
    password: string
}

export type AuthResponse = {
    message: string,
    accessToken: string,
    refreshToken: string
}

export type RefreshRequest = {
    username: string,
    accessToken: string,
    refreshToken: string
}