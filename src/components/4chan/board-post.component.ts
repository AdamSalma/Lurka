import { Component, Input } from "@angular/core";

@Component({
    selector: "board-post",
    template: `
        <img [src]="thread.imgurl + 's.jpg'" />
        <div class="thread-count">
            R: <b>{{ thread.replies }}</b>
            | I: <b>{{ thread.images }}</b>
        </div>
        <div class="thread-op">
            <b [innerHTML]="thread.sub" class="title"></b>
            <div [innerHTML]="thread.com"></div>
        </div>
    `,
    styles: [require('./board-post.component.sass')]
})
export class BoardPostComponent {
    @Input() thread = {};

}
