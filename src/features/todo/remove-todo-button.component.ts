import { Component, Input, inject } from "@angular/core";
import { TodoService } from "./todo.service";

@Component({
    selector: 'remove-todo-button',
    standalone: true,
    template: `
        <button class="text-red-400" (click)="onRemoveTodo()">삭제</button>
    `
})
export class RemoveTodoButtonComponent {

    @Input()
    todoId!: string;

    private readonly todoService = inject(TodoService);

    onRemoveTodo() {
        const result = window.confirm('정말 삭제하시겠어요? 😢');
        if (!result) return;
        this.todoService.removeTodo(this.todoId);
    }
}