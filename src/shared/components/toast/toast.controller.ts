import { Injectable, computed, signal } from "@angular/core";
import { ToastModel } from "./toast.model";

@Injectable({
    providedIn: 'root'
})
export class ToastController {

    private readonly _toast = signal<ToastModel>({
        activate: false,
        message: ''
    });

    readonly toast = computed(() => this._toast());

    show(message: string, time: number = 2000) {
        this._toast.set({ activate: true, message });

        setTimeout(() => {
            this._toast.set({ activate: false, message: '' });
        }, time);
    }
}