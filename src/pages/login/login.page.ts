import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthFormComponent } from "src/features";

@Component({
    selector: 'login-page',
    standalone: true,
    imports: [
        AuthFormComponent,
        RouterLink
    ],
    template: `
    <div class="w-full flex flex-col items-center p-10">
        <h1 class="text-4xl font-bold">로그인</h1>
        <br/>
        <auth-form-component mode="login" />
        <br/>
        <a routerLink="/register">계정이 없으신가요?</a>
    </div>
    `,
})
export class LoginPage {

}