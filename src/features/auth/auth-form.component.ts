import { Component, Input, OnInit, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ToastController } from "src/shared";
import { AuthFormMode } from "./auth-form.type";
import { AuthService } from "./auth.service";

@Component({
    selector: 'auth-form-component',
    standalone: true,
    imports: [ReactiveFormsModule],
    template: `
    <form class="w-full min-w-[400px]" [formGroup]="formGroup" (submit)="onSubmit()">
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">이메일</span>
            </div>
            <input type="text" placeholder="이메일을 입력해 주세요..." class="input input-bordered w-full" formControlName="email" />
        </label>
        @if(mode === 'register') {
            <label class="form-control w-full">
                <div class="label">
                    <span class="label-text">닉네임</span>
                </div>
                <input type="text" placeholder="닉네임을 입력해 주세요..." class="input input-bordered w-full" formControlName="nickname" />
            </label>
        }
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">비밀번호</span>
            </div>
            <input type="password" placeholder="비밀번호를 입력해 주세요..." class="input input-bordered w-full" formControlName="password" />
        </label>
        <br/>
        <button class="btn w-full">{{ mode === 'login' ? '로그인' : '회원가입'}}</button>
    </form>
    `
})
export class AuthFormComponent implements OnInit {

    private readonly toastController = inject(ToastController);

    private readonly authService = inject(AuthService);

    @Input()
    mode!: AuthFormMode;

    formGroup!: FormGroup;

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            email: new FormControl(''),
            password: new FormControl('')
        });

        if (this.mode === 'register') {
            this.formGroup.addControl('nickname', new FormControl(''));
        }
    }

    onSubmit() {
        if (this.mode === 'login') {
            this.onLogin();
        } else {
            this.onRegister();
        }
    }

    private onLogin() {
        const { email, password } = this.formGroup.value;
        if (!email || !password) {
            this.toastController.show('이메일과 비밀번호를 입력해 주세요.', 'warning');
            return;
        }
        this.authService.login({ email, password });
    }

    private onRegister() {
        const { email, nickname, password } = this.formGroup.value;
        if (!email || !nickname || !password) {
            this.toastController.show('모든 값을 입력해 주세요.', 'warning');
            return;
        }
        this.authService.register({ email, nickname, password });
    }
}