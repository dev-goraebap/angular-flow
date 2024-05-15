import { Component, Input } from "@angular/core";
import { TodoModel } from "./todo.model";

@Component({
    selector: 'todo-view',
    standalone: true,
    template: `
    <div class="flex justify-between w-full border border-gray-300 p-4 rounded-xl text-sm">
        <div class="flex gap-2 items-center">
            <ng-content select="[slot='checkbox']"></ng-content>
            <span>{{todo.content}}</span>
        </div>
        <div>
            <ng-content select="[slot=buttons]"></ng-content>
        </div>
    </div>
    `
})
export class TodoViewComponent {

    @Input()
    todo!: TodoModel;
}