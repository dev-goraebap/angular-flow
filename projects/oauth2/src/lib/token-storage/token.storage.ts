import { InjectionToken } from "@angular/core";
import { TokenResource } from "./token.storage.options";

export interface TokenStorage<Resource = TokenResource> {
    getAccessToken(): string | null | Promise<string | null>;
    getRefreshToken(): string | null | Promise<string | null>;
    set(resource: Resource): void | Promise<void>;
    clear(): void | Promise<void>;
}

export const TOKEN_STORAGE = new InjectionToken<TokenStorage>('TOKEN_STORAGE');