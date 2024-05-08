export type JwtResourceModel = {
    accessToken: string;
    refreshToken?: string;
    expiresIn?: number;
}