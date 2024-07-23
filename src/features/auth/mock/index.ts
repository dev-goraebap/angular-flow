import { TokenResource } from "projects/oauth2/src/public-api";
import { ReqLoginDTO } from "../dto/req-login.dto";
import { CredentialState } from "../stores/credential.store";

export const mockUser: ReqLoginDTO = {
    username: 'test01',
    password: 'test01'
};

export const mockTokens: TokenResource = {
    accessToken: 'test_access_token',
    refreshToken: 'test_refresh_token',
}

export const mockCredential: CredentialState = {
    id: 'test_id',
    nickname: 'test_nickname'
}