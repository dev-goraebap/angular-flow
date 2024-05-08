import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CredentialModel, loginAction } from "src/entities";
import { EventBus } from "src/shared";

@Component({
    selector: 'login-page',
    standalone: true,
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './login.page.html',
})
export class LoginPage {
    
    private readonly eventBus = inject(EventBus);

    readonly formGroup = new FormGroup({
        username: new FormControl(''),
        password: new FormControl('')
    });

    onLogin() {
        const formData = this.formGroup.value as CredentialModel;
        if (!formData.username ||!formData.password) {
            window.alert('Please enter username and password');
            return;
        }
        this.eventBus.publish(loginAction(formData));
        this.formGroup.reset();
    }
}