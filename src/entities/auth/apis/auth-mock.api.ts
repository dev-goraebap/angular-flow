import { Observable } from "rxjs";
import { mockUserList } from "src/entities/user";
import { CredentialModel, JwtResourceModel } from "../models";
import { AuthApi } from "./auth.api";

export class AuthMockApi implements AuthApi {

    login(credential: CredentialModel): Observable<JwtResourceModel> {
        return new Observable(subscriber => {
            const hasUser = mockUserList.find(user => 
                user.username === credential.username && 
                user.password === credential.password
            );
            if (!hasUser) {
                subscriber.error('아이디 또는 비밀번호가 일치하지 않습니다.');
                return;
            }
            subscriber.next({
                accessToken: `Bearer ${hasUser.id}`
            });
            subscriber.complete();
        });
    }
}