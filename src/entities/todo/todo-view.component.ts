import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { TodoModel } from "./todo.model";

@Component({
    selector: 'todo-view',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="flex justify-between items-center w-full border border-gray-300 p-4 rounded-xl text-sm">
        <div class="flex gap-2 items-center">
            <div class="relative top-0.5">
                <!-- 채크박스 컨테이너 -->
                <ng-content select="[slot='checkbox']"></ng-content>
            </div>
            <span [ngClass]="{ 'line-through': todo.completed }">{{todo.content}}</span>
        </div>
        <!-- 수정, 삭제 버튼 컨테이너 -->
        <ng-content select="[slot=buttons]"></ng-content>
    </div>
    `
})
export class TodoViewComponent {

    @Input()
    todo!: TodoModel;
}