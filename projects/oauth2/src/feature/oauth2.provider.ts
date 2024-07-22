import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { EnvironmentProviders, Provider } from "@angular/core";
import { ProvideOAuth2Props } from "./types/provider.type";

export const provideOAuth2 = (

) => {

}

/**
 * Note: httpClient 가 내부적으로 구성된 OAuth2 프로바이더 입니다.
 * 
 * @publicApi
 */
export const provideOAuth2WithHttpClient = (
    props: ProvideOAuth2Props
): (EnvironmentProviders | Provider)[] => {
    return [
        // 앵귤러 httpClient provider 추가
        provideHttpClient(
            withFetch(),
            withInterceptors([

            ])
        )
    ];
}

provideOAuth2WithHttpClient({
    refreshBehavior: ''
});