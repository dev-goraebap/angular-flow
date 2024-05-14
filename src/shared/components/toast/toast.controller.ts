import { Injectable, computed, signal } from "@angular/core";
import { ToastModel, ToastStatus } from "./toast.model";

@Injectable({
    providedIn: 'root'
})
export class ToastController {

    private readonly _toast = signal<ToastModel>({
        status: 'info',
        activate: false,
        message: ''
    });

    readonly toast = computed(() => this._toast());

    show(message: string, status: ToastStatus = 'info', time: number = 2000) {
        this._toast.set({ activate: true, status, message });

        setTimeout(() => {
            this._toast.set({ activate: false, status, message });
        }, time);
    }
}