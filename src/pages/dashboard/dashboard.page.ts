import { Component, inject } from "@angular/core";
import { TodoState, TodoViewComponent } from "src/entities";
import { AddTodoComponent, EditTodoButtonComponent, TodoService } from "src/features";

@Component({
    selector: 'dashboard-page',
    standalone: true,
    imports: [
        AddTodoComponent,
        TodoViewComponent,
        EditTodoButtonComponent,
    ],
    template: `
    <div class="p-4">
        <add-todo-form/>
        <br/>
        <div class="flex flex-col gap-4">
            @for (todo of todos(); track todo.id) {
                <todo-view [todo]="todo">
                    <div slot="checkbox">
                        sadf
                    </div>
                    <div slot="buttons" class="flex gap-2">
                        <edit-todo-button [todo]="todo"/>
                        <button>버튼2</button>
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