import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ToastController } from "./toast.controller";

@Component({
    selector: 'toast-component',
    standalone: true,
    imports: [CommonModule],
    template: `
    @if (toast(); as toast) {
        <div 
            class="toast toast-center toast-top pointer-events-none visible transition duration-300
            {{ toast.activate ? 'opacity-100' : 'opacity-0' }}">
            <div 
                class="alert alert-warning transition-none"
                [ngClass]="{
                'alert-info': toast.status === 'info',
                'alert-success': toast.status === 'success',
                'alert-warning': toast.status === 'warning',
                'alert-error': toast.status === 'error',
                }">
                <span>{{toast.message}}</span>
            </div>
        </div>
    }
    `
})
export class ToastComponent {

    private readonly toastController = inject(ToastController);

    readonly toast = this.toastController.toast;
}