import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ToastController } from "src/shared";
import { TodoService } from "./todo.service";

@Component({
    selector: 'add-todo-form',
    standalone: true,
    imports: [FormsModule],
    template: `
    <div class="w-full flex justify-center gap-4">
        <input class="input input-bordered w-full" type="text" placeholder="할일을 입력해 주세요..." [(ngModel)]="content"/>
        <button class="btn min-w-[100px]" (click)="onAddTodo()">할일 추가</button>
    </div>
    `
})
export class AddTodoComponent {

    // Binding Value ✨
    content: string = '';

    private readonly todoService = inject(TodoService);
    
    private readonly toastController = inject(ToastController);

    onAddTodo() {
        console.log(this.content);
        const content = this.content.trim();
        if (!content) {
            this.toastController.show('할일을 입력해 주세요!', 'warning');
            return;
        }
        this.todoService.addTodo(this.content);
        this.content = '';
    }
}