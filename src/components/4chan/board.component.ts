import { Component, Input, Output, EventEmitter, OnChanges, AfterViewInit } from "@angular/core";
import { BoardPostComponent } from "./board-post.component";
import { HelperService } from "./../../services/helper.service";

@Component({
    selector: "board",
    template: `
        <div class="board">
            <input type="button" (click)="handleClick()" value="Click Me">
            <input type="button" (click)="createPost(1)" value="Next OP">
            <div class="scrollMe">
                <board-post
                    *ngFor="let thread of board"
                    [thread]="thread"
                    (click)="getThread(thread.id)"
                    class="thread catalogue"
                ></board-post>
            </div>
        </div>
    `,
    styles: [require("./board.component.sass")],
    directives: [BoardPostComponent],
    providers: [HelperService]
})
export class BoardComponent implements AfterViewInit {
    @Input()  pages = [];
    @Input()  settings = {};
    @Output() getBoard = new EventEmitter();
    @Output() getThread = new EventEmitter();

    constructor(public helper: HelperService) { };
    board = [];
    threads = [];

    ngAfterViewInit() {
        if (this.settings.autoload) this.getBoard.emit({
            value: this.settings.board
        });
        // this._initStructure(10);
    };

    handleClick() {
        this._parse_pages();
        this.createPost(this.settings.pageSize);
    }

    handleGetThread( boardID: any ) {
        this.getThread.emit({
            value: boardID
        });
    }
    // ngOnChanges( changes ) {
    //     if (changes.hasOwnProperty("pages") && changes.pages.currentValue.length) {
    //         console.log(changes)
    //         console.log(changes.pages.currentValue)
    //         this._parse_pages()
    //         this.createPost(this.settings.pageSize);
    //     }
    // }

    createPost( quantity: number ) {
        for (let i = 0; i < quantity; i++) {
            console.log("createPost");
            let img = "https://i.4cdn.org/g/";
            let threadObj = this._nextPost();
            if (!threadObj) break;
            let thread = {
                id: threadObj["no"],
                imgid: threadObj["tim"],
                date: threadObj["now"],
                subtitle: threadObj["sub"] || "",
                imgsrc: img + threadObj["tim"] + "s.jpg",
                com: this.helper.sanitiseHTML(threadObj["com"]),
                replyCount: threadObj["replies"],
                imgCount: threadObj["images"],
                imgsrclarge: img + threadObj["tim"] + ".jpg"
            };
            this.board.push(thread);
        }
    }

    private _nextPost() {
        if (this.threads.length) return this.threads.pop();
        console.log("No more posts. Requesting backup memes");
        this.getBoard.emit({
            value: "g"
        });
    }

    private _parse_pages() {
        console.log("_parse_pages()");
        let threadList = [];
        for (let pageObj in this.pages) {
            console.log(pageObj);
            if (this.pages.hasOwnProperty(pageObj)) {
                let threads = this.pages[pageObj]["threads"];
                for (let i = 0; i < threads.length; i++) {
                    threadList.push(threads[i]);
                }
            }
        }
        this.threads = threadList;
    }
    private _initStructure( count: number = 10 ) {
        this.board = [];
        let placeholder = {
            id: "placeholder",
            class: "thread-loading",
            subtitle: "Loading..."
        };
        for (let i = 0; i < count; i++) {
            this.board.push(placeholder);
        };
    }
}
