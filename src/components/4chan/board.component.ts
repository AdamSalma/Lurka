import { Component, Input, Output, EventEmitter, AfterViewInit } from "@angular/core";
import { HttpService } from "../../services/http.service";
import { HelperService } from "../../services/helper.service";
import { BoardPostComponent } from "./board-post.component";

// import Velocity = require("velocity-animate");

@Component({
    selector: "board",
    template: `
        <div class="board">
            <input type="button" (click)="getBoard('g')" value="Get Board">
            <input type="button" (click)="createPost(1)" value="Next OP">
            <input type="button" (click)="printModels()" value="Print Models">
            <div class="scrollMe">
                <board-post
                    *ngFor="let thread of board"
                    [thread]="thread"
                    (click)="getThread(thread.no)"
                    class="thread catalogue"
                ></board-post>
            </div>
        </div>
    `,
    styles: [require("./board.component.sass")],
    directives: [BoardPostComponent],
    providers: [HttpService, HelperService]
})
export class BoardComponent implements AfterViewInit {
    @Output() threadChange = new EventEmitter();
    @Input()  settings = {
        autoload: undefined,
        board: undefined,
        pageSize: undefined
    };

    constructor( public http: HttpService, private _helper: HelperService ) {};

    board = [];  // visible content
    threadStack = [];  // hidden content

    printModels(){
        console.log("Board is =>", this.board);
        console.log("ThreadStack is =>", this.threadStack);
    }
    ngAfterViewInit() {
        // console.log("Velocity is...");
        // console.log(Velocity);
        // console.log(Velocity(".scrollMe"));
        // this._initStructure(10);
        if (this.settings.autoload) {
            this.getBoard(this.settings.board);
            this.createPost(this.settings.pageSize);
        }
    };

    getBoard( board: any ) {
        console.log(`Getting /${board}/`);
        console.log(board);
        this.settings.board = board;
        this.http.get(`/4chan/${board}`, (error, pages) => {
            if (error) return this._helper.errorHandler(error);
            this._parsePages(pages);
        });
    }

    getThread( boardID: number ): void {
        this.threadChange.emit({
            value: boardID
        });
    }

    createPost( quantity: number ): void {
        for (let i = 0; i < quantity; i++) {
            this.board.push(this.nextPost());
        }
    }

    nextPost(): any {
        if (this.threadStack.length) return this.threadStack.pop();
        console.log("No more posts. Requesting backup memes");
        return this.getBoard(this.settings.board);
    }

    private _parsePages( pages: {} ) {
        console.log("_parsePages()");
        let img = `https://i.4cdn.org/${this.settings.board}/`;

        for (let pageObj in pages) {
            if (!pages.hasOwnProperty(pageObj)) return;

            let threads = pages[pageObj]["threads"];
            for (let i = 0; i < threads.length; i++) {
                threads[i].imgurl = img + threads[i]["tim"];
                this.threadStack.push(threads[i]);
            }
        }
        console.log("threadStack is ", this.threadStack);
    }

    private _initStructure( count: number = 10 ) {
        // could add spinner here
        this.board = [];
        let placeholder = {
            no: "placeholder",
            class: "thread-loading",
            sub: "Loading..."
        };
        for (let i = 0; i < count; i++) {
            this.board.push(placeholder);
        };
    }
}
