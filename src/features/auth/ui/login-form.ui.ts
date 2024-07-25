import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ReqLoginDTO } from "../dto/req-login.dto";
import { GetProfileUsecase } from "../usecases/get-profile.usecase";
import { LoginUsecase } from "../usecases/login.usecase";

@Component({
    selector: 'login-form-ui',
    standalone: true,
    imports: [
        ReactiveFormsModule
    ],
    providers: [
        LoginUsecase,
        GetProfileUsecase
    ],
    template: `
    <form 
        [formGroup]="formGroup" 
        (ngSubmit)="onLogin()" 
        class="p-4 flex flex-col gap-4 w-full">
        <input
            class="ring ring-gray-700 outline-none p-2 rounded-md"
            placeholder="아이디 입력"
            formControlName="username"
        />
        <input
            type="password"
            class="ring ring-gray-700 outline-none p-2 rounded-md"
            placeholder="패스워드 입력"
            formControlName="password"
        />
        <button
            class="ring ring-blue-500 bg-blue-500 w-full rounded-md p-2 text-white"
        >
            로그인
        </button>
    </form>
    `
})
export class LoginFormUI {

    readonly formGroup = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    });

    private readonly loginUsecase = inject(LoginUsecase);
    private readonly getProfileUsecase = inject(GetProfileUsecase);

    async onLogin() {
        console.debug('로그인 요청');
        if (this.formGroup.invalid) {
            window.alert('아이디 또는 비밀번호를 확인해주세요.');
            return;
        }
        const result = this.formGroup.value as ReqLoginDTO;
        await this.loginUsecase.execute(result);
        await this.getProfileUsecase.execute();

        const event = new CustomEvent('UPDATE_TOKENS');
        document.dispatchEvent(event);

        this.formGroup.reset();
    }
}