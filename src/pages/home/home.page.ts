import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { UserService } from "src/entities";

@Component({
    selector: 'home-page',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './home.page.html',
})
export class HomePage {
    public readonly userService = inject(UserService);
}