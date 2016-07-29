import { Component, Input } from "@angular/core";

@Component({
    selector: "board-post",
    template: `
        <img src="{{ thread.imgsrc }}">
        <div class="thread-count">
            R: <b>{{ thread.replyCount }}</b>
            I: <b>{{ thread.imgCount }}</b>
        </div>
        <div class="thread-op">
            <b  class="title"
                [innerHTML]="thread.subtitle"
            ></b>
            <div
                [innerHTML]="thread.com"
            ></div>
        </div>
    `
})
export class BoardPostComponent {
    @Input() thread = {};
}
