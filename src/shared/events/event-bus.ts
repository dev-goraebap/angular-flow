import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { EventModel } from "./event.model";

@Injectable({
    providedIn: 'root'
})
export class EventBus {

    private eventSource = new Subject<EventModel>();

    public events$ = this.eventSource.asObservable();

    publish(event: EventModel) {
        this.eventSource.next(event);
    }
}
