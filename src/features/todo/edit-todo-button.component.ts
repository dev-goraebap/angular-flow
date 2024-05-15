import { Component, Input, inject } from "@angular/core";
import { TodoModel } from "src/entities";
import { ToastController } from "src/shared";
import { TodoService } from "./todo.service";

@Component({
    selector: 'edit-todo-button',
    standalone: true,
    template: `
    <button class="text-blue-400" (click)="onEditTodo()">수정</button>
    `
})
export class EditTodoButtonComponent {

    @Input() 
    todo!: TodoModel;

    private readonly todoService = inject(TodoService);

    private readonly toastController = inject(ToastController);

    onEditTodo() {
        let content = window.prompt('수정할 내용을 입력해 주세요', this.todo.content);
        // 취소 버튼 클릭
        if (content === null) return;

        content = content?.trim();
        // 값이 없거나 기존의 값이랑 같을 경우
        if (content === '' || content === this.todo.content) {
            this.toastController.show('값을 제대로 입력해 주세요.ㅐ', 'warning');
            return;
        }

        const editedTodo: TodoModel = {...this.todo, content };
        this.todoService.editTodo(editedTodo);
    }
}