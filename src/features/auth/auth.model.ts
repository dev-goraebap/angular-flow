export type CredentialModel = {
    email: string;
    password: string;
};

export type RegisterModel = CredentialModel & {
    nickname: string;
}
