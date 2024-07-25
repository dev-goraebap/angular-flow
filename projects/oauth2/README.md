# Angular OAuth2 Flow 🫧

OAuth2 기반의 인증을 도와주는 라이브러리

- [데모 사이트](https://angular-flow.pages.dev) 에서 기능을 살펴볼 수 있습니다.

## 인증 흐름

![image](https://github.com/user-attachments/assets/d3beb504-a6e0-4eea-a24d-b4a416a62252)

## 설정

먼저 `@angular-flow/oauth2` 를 설치합니다.

```
npm i @angular-flow/oauth2
```

`app.config.ts` 에 아래 코드를 추가합니다.

```ts
// app.config.ts
...
export const appConfig: ApplicationConfig = {
  providers: [
    ...
    // oauth2 공급자 추가
    provideOAuth2({
      refreshBehavior: RefreshTokensUsecase // RefreshBehavior를 구현하는 클래스 등록
      // tokenStorage: <TokenStorage 인터페이스를 구현하는 클래스> (선택) 
      // 하이브리드웹앱에서는 제공되는 `CapacitorStorage`로 등록해주시면 됩니다.
    }),
    provideHttpClient(
      withInterceptors([
        // oauth2 인터셉터 추가
        oauth2FlowInterceptor
      ])
    ),
  ]
};
```

또는 `httpClient` 를 포함하는 프로바이더를 등록할 수 있습니다.

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    ...
    provideOAuth2WithHttpClient({
      refreshBehavior: RefreshTokensUsecase, // 필수등록
      interceptors: authMockInterceptors, // 선택사항
    }),
  ],
};
```

OAuth2 프로바이더를 등록하기 위해서 `refreshBehavior` 등록은 필수입니다.

`RefreshBehavior` 인터페이스를 구현하는 클래스를 생성하고 `refresh` 메서드의 반환타입을 만족하도록 코드를 작성해야합니다.

- refresh 메서드는 OAuth2 내부 시스템에서 호출 됩니다. 이 때 인자값으로 현재 시점의 refreshToken을 넘기기 때문에
해당 값을 활용하여 요청을 보낼 수 있습니다.

```ts
@Injectable()
export class RefreshTokensUsecase implements RefreshBehavior {
  private readonly httpClient = inject(HttpClient);

  // @angular-flow/oauth2 에서 설정된 토큰 스토리지 주입
  private readonly tokenStorage = inject(TOKEN_STORAGE);

  refresh(refreshToken: string): Observable<TokenResource> {
    // 백엔드와 약속된 방식으로 http 호출
    const header = new HttpHeaders()
      .set("Authorization", `Bearer ${refreshToken}`);
    return this.httpClient.post<TokenResource>(REFRESH_TOKEN_MOCK_URL, {},{
          headers: header,
          // ✅ context에 skipOAuth2Flow 컨텍스트를 사용해야합니다.
          // oauth2Flow 인터셉터를 무시하고 진행하도록 설정합니다.
          context: skipOAuth2Flow,
    }).pipe(
        // 요청 실패 시 후처리
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

- 토큰스토리지는 하이브리드 앱에서 주로 사용되는 저장소 라이브러리인 `Capacitor Preference` 까지 대응하기 때문에 제공되는 메서드들은 
모두 `Promise` 반환타입을 가집니다.

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
    await this.tokenStorage.set(res);
  }
}
```

이제 전역에 등록된 `httpClient` 를 사용하여 api 요청을 진행할 경우 다음과 같은 일들이 일어납니다.

- (토큰재발급을 제외한) 모든 API 요청에 accessToken 유무에 따라 Authorization 해더에 Bearer <token> 형태로 엑세스토큰을 주입합니다.
- oauth2 인터셉터를 거치는 요청들은 실패 응답(401 Unauthorization error) 시 등록된 토큰재발급 인터페이스를 통해 토큰 재발급 요청을 진행합니다.
  - 실패했던 요청들은 대기열 큐에 저장됩니다.
- 토큰 재발급 요청이 실패로 끝날 경우, 토큰 재발급 인터페이스를 구현한 클래스에서 후처리를 할 수 있습니다.
  - 실패 시 oauth2 서비스에서 토큰스토리지를 자동으로 비웁니다.
- 토큰 재발급 요청이 성공적이면 토큰 리소스를 자동으로 토큰 스토리지에 다시 저장하게 됩니다.
  - 대기열 큐에 저장된 요청들도 일괄적으로 다시 요청하게 됩니다.
