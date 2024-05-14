import { FormControl } from "@angular/forms";

export type AuthFormMode = 'login' |'register';

export type AuthForm = {
    email: FormControl;
    nickname?: FormControl;
    password: FormControl;
}