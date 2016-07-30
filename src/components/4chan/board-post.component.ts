import { Component, Input, Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'newline' })
@Component({
    selector: "board-post",
    template: `
        <img [src]="thread.imgsrc" />
        <div class="thread-count">
            R: <b>{{ thread.replyCount}}</b>
            I: <b>{{ thread.imgCount}}</b>
        </div>
        <div class="thread-op">
            <b [innerHTML]="thread.subtitle | newline" class="title"></b>
            <div [innerHTML]="thread.com | newline"></div>
        </div>
    `,
    styles: [require('./board-post.component.sass')]
})
export class BoardPostComponent implements PipeTransform{
    @Input() thread = {};

    transform(value: string, args: string[]): any {
        return value.replace(/(?:\r\n|\r|\n)/g, '<br />');
    }
}
