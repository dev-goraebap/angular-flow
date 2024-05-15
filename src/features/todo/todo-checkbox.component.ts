import { Component, Input, inject } from "@angular/core";
import { TodoModel } from "src/entities";
import { TodoService } from "./todo.service";

@Component({
    selector: 'todo-check-box',
    standalone: true,
    template: `
    <input type="checkbox" [checked]="todo.completed" class="checkbox" (click)="onToggleCompleted()"/>
    `
})
export class TodoCheckBoxComponent {

    @Input()
    todo!: TodoModel;

    private readonly todoService = inject(TodoService);

    onToggleCompleted() {
        const editedTodo: TodoModel = {
            ...this.todo,
            completed: !this.todo.completed
        };
        this.todoService.editTodo(editedTodo);
    }
}