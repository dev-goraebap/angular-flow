# Angular OAuth2 Flow 🫧
OAuth2 기반의 인증을 도와주는 라이브러리

- [데모 사이트](https://angular-flow.pages.dev)  에서 기능을 살펴볼 수 있습니다.

## 인증 흐름
![image](https://github.com/user-attachments/assets/d3beb504-a6e0-4eea-a24d-b4a416a62252)

## 설정
```ts
// app.config.ts
...
export const appConfig: ApplicationConfig = {
  providers: [
    ...
    // oauth2 공급자 추가
    provideOauth2({
      tokenRefreshBehavior: RefreshTokensUsecase // TokenRefreshBehavior를 상속하는 class 추가
      // customTokenStorage: <TokenStorage 인터페이스를 구현하는 클래스> (선택)
    }),
    provideHttpClient(
      withInterceptors([
        // oauth2 인터셉터 추가
        oauth2Interceptor
      ])
    ),
  ]
};
```

Oauth2 공급자를 등록하기 위해서 `tokenRefreshBehavior` 등록은 필수입니다.

`TokenRefreshBehavior` 클래스를 상속하는 클래스를 생성하고 refresh 메서드를 오버라이드해줍니다.

```ts
@Injectable()
export class RefreshTokensUsecase extends TokenRefreshBehavior {
    override refresh(): Observable<TokenResource> {
        // oauth2 interceptor 를 우회 및 부수적인 기능연계를 위해
        // 제공된 refreshHttpClient 를 사용하여 http 통신하는 것을 권장합니다.
        return this.refreshHttpClient({
            method: 'post',
            url: 'http://localhost:3000/api/auth/refresh',
        }).pipe(
            catchError((res: HttpErrorResponse) => {
                window.alert(res.error.message);
                return throwError(() => res);
            })
        );
    }
}
```

토큰 스토리지를 통해 토큰을 조회하거나 저장, 삭제할 수 있습니다.

예를 들어, 로그인 기능을 통해 토큰 리소스를 성공적으로 전달 받을 경우 제공되는 `TOKEN_STORAGE` 프로바이더를 활용하여 토큰 리소스를 저장합니다.

```ts
@Injectable()
export class LoginUsecase {

    private readonly httpClient = inject(HttpClient);

    private readonly tokenStorage = inject(TOKEN_STORAGE);

    async execute(dto: ReqLoginDTO) {
        // http 요청
        const http$ = this.httpClient.post<TokenResource>(LOGIN_MOCK_URL, dto).pipe(
            catchError((res: HttpErrorResponse) => {
                window.alert(res.error.message);
                return throwError(() => res);
            })
        );
        const res = await lastValueFrom(http$);

        // 토큰스토리지에 응답값 반환         
        this.tokenStorage.set(res);
    }
}
```

이제 전역에 등록된 `httpClient` 를 사용하여 api 요청을 진행할 경우 다음과 같은 일들이 일어납니다.
- (토큰재발급을 제외한) 모든 API 요청에 accessToken 유무에 따라 Authorization 해더에 Bearer <token> 형태로 엑세스토큰을 주입합니다.
- oauth2 인터셉터를 거치는 요청들은 실패 응답(401 Unauthorization error) 시 등록된 토큰재발급 인터페이스를 통해 토큰 재발급 요청을 진행합니다.
  - 실패했던 요청들은 대기열 큐에 저장됩니다.
- 토큰 재발급 요청이 실패로 끝날 경우, 토큰 재발급 인터페이스를 구현한 클래스에서 후처리를 할 수 있습니다.
- 토큰 재발급 요청이 성공적이면 토큰 리소스를 자동으로 토큰 스토리지에 다시 저장하게 됩니다.
  - 대기열 큐에 저장된 요청들도 일괄적으로 다시 요청하게 됩니다.
 
## 주의사항

아직 목표로 한 완성단계가 아니며, 이후 업데이트되는 버전에서 기술 구현 부분이 달라질 수 있습니다.
