import { Component, inject } from "@angular/core";
import { ProfileCardComponent, TodoState, TodoViewComponent } from "src/entities";
import { AddTodoComponent, EditTodoButtonComponent, RemoveTodoButtonComponent, TodoCheckBoxComponent, TodoService } from "src/features";

@Component({
    selector: 'dashboard-page',
    standalone: true,
    imports: [
        ProfileCardComponent,
        AddTodoComponent,
        TodoViewComponent,
        TodoCheckBoxComponent,
        EditTodoButtonComponent,
        RemoveTodoButtonComponent
    ],
    template: `
    <div class="p-4">
        <profile-card />
        <div class="mt-10"></div>
        <add-todo-form/>
        <br/>
        <div class="flex flex-col gap-4">
            @for (todo of todos(); track todo.id) {
                <todo-view [todo]="todo">
                    <div slot="checkbox">
                        <todo-check-box [todo]="todo"/>
                    </div>
                    <div slot="buttons" class="flex gap-2">
                        <edit-todo-button [todo]="todo"/>
                        <remove-todo-button [todoId]="todo.id"/>
                    </div>
                </todo-view>
            }
        </div>
    </div>
    `,
})
export class DashboardPage {

    private readonly todoService = inject(TodoService);

    private readonly todoState = inject(TodoState);

    readonly todos = this.todoState.todos;

    constructor() {
        this.todoService.initTodoList();
    }
}