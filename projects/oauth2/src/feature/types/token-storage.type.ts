/** @publicApi */
export type TokenResource = {
    accessToken: string;
    refreshToken: string;
}

export type TokenType = 'accessToken' | 'refreshToken';