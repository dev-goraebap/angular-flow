import { Component } from "@angular/core";
import { CredentialExampleViewUI, ExpiresTokenButtonUI, FetchProfileButtonUI, LoginFormUI, TokenExampleViewUI } from "src/features/auth";

@Component({
    selector: 'oauth2-example-page-ui',
    standalone: true,
    imports: [
        LoginFormUI,
        TokenExampleViewUI,
        CredentialExampleViewUI,
        ExpiresTokenButtonUI,
        FetchProfileButtonUI
    ],
    templateUrl: './login-page.ui.html'
})
export class OAuth2ExamplePageUI {

}