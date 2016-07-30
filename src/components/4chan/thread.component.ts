import { Component, Input, trigger, state, style, transition, animate } from "@angular/core";
import { SpinnerComponent } from "../common/spinner.component";
import { ThreadPostComponent } from "./thread-post.component";

declare function require(name: string): any;

@Component({
    selector: "thread",
    template: `
        <spinner
            [class.active]="loadingThread"
        ></spinner>
        <div
            class="background"
            [class.fadeIn]="loadingThread"
        ></div>
        <div
            class="scrollable"
            @threadState="thread.length != 0"
        >
            <thread-post
                *ngFor="let post of thread"
                [post]="post"
            ></thread-post>
        </div>
    `,
    directives: [ThreadPostComponent],
    styleUrls: [],
    animations: [
        trigger("threadState", [
            state("inactive", style({
                top: "100%"
            })),
            state("active", style({
                top: "0"
            })),
            transition("inactive => active", animate("400ms ease-in"))
        ])
    ]
})
export class ThreadComponent {
    @Input() thread = {};
    @Input() loadingThread: boolean = false;
}
