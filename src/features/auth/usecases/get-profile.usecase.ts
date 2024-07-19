import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, EMPTY, lastValueFrom } from "rxjs";
import { GET_PROFILE_MOCK_URL } from "../interceptors/get-profile-mock.interceptor";
import { CredentialState, CredentialStore } from "../stores/credential.store";

@Injectable()
export class GetProfileUsecase {

    private readonly httpClient = inject(HttpClient);

    private readonly credentialStore = inject(CredentialStore);

    async execute() {
        // http 요청
        const http$ = this.httpClient.get<CredentialState>(GET_PROFILE_MOCK_URL).pipe(
            catchError((err) => {
                console.error(err);
                return EMPTY;
            })
        );
        const result = await lastValueFrom(http$);

        // 상태 초기화
        this.credentialStore.init(result);
    }
}