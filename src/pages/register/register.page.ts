import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthFormComponent } from "src/features";

@Component({
    selector: 'register-page',
    standalone: true,
    imports: [
        AuthFormComponent,
        RouterLink
    ],
    template: `
    <div class="w-full flex flex-col items-center p-10">
        <h1 class="text-4xl font-bold">회원가입</h1>
        <br/>
        <auth-form-component mode="register" />
        <br/>
        <a routerLink="/login">이미 계정이 있습니다.</a>
    </div>
    `
})
export class RegisterPage {}