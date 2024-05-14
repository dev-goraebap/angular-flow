export type ToastStatus = 'info' | 'error' | 'warning' |'success';

export type ToastModel = {
    status: ToastStatus;
    activate: boolean;
    message: string;
}