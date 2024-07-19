import { InjectionToken, Signal } from "@angular/core";
import { TokenResource } from "./token.storage.options";

export interface TokenStorage<Resource = TokenResource> {
    readonly accessToken: Signal<string | null>;
    readonly refreshToken: Signal<string | null>;
    set(resource: Resource): void | Promise<void>;
    clear(): void | Promise<void>;
}

export const TOKEN_STORAGE = new InjectionToken<TokenStorage>('TOKEN_STORAGE');