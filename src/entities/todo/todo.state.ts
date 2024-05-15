import { Injectable, computed, signal } from "@angular/core";
import { TodoModel } from "./todo.model";

@Injectable({
    providedIn: 'root'
})
export class TodoState {

    private readonly _todos = signal<TodoModel[]|null>(null);

    readonly todos = computed(() => this._todos());

    initTodos(todos: TodoModel[]) {
        this._todos.set(todos);
    }
}