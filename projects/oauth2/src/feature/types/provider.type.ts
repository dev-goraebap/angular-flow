import { HttpInterceptorFn } from "@angular/common/http";

export type ProvideOAuth2Props = {
    refreshBehavior: any;
    tokenStorage?: any;
}

export type ProvideOAuth2WithHttpClientProps = {
    refreshBehavior: any;
    tokenStorage?: any;
    interceptors?: HttpInterceptorFn[];
}
