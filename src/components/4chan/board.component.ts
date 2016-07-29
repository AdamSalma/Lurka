import { Component, Input, OnChanges, AfterViewInit } from "@angular/core";
import { BoardPostComponent } from "./board-post.component";

declare function require(name: string): any;

@Component({
    selector: "board",
    template: `
        <div>Board options component</div>
        <input type="button" (click)="handleClick()" value="Click Me">
        <div class="scrollMe">
            <board-post
                *ngFor="let thread of board"
                [thread]="thread"
                (click)="getThread(thread.id)"
                class="thread catalogue"
            ></board-post>
        </div>
    `,
    styles: [require("./board.component.sass")],
    directives: [BoardPostComponent]
})
export class BoardComponent implements AfterViewInit {
    @Input() pages = [];
    @Input() settings = {
        autoload: true,
        pageSize: 20
    };
    constructor() { };
    board = [];
    threads = [];

    ngAfterViewInit() {
        // if (this.settings.autoload) this.getBoard("g");
        this._initStructure(10);
    };

    handleClick(){
        this._parse_pages()
        this.createThreads(this.settings.pageSize);
    }
    // ngOnChanges( changes ) {
    //     if (changes.hasOwnProperty('pages') && changes.pages.currentValue.length){
    //         console.log(changes)
    //         console.log(changes.pages.currentValue)
    //         this._parse_pages()
    //         this.createThreads(this.settings.pageSize);
    //     }
    // }

    createThreads( quantity:number ){
        for (let i=0; i < quantity; i++){
            console.log("createThreads");
            let img = "https://i.4cdn.org/g/";
            let threadObj = this.nextThread();
            let thread = {
                id: threadObj["no"], imgid: threadObj["tim"],
                date: threadObj["now"], subtitle: threadObj["sub"] || "",
                imgsrc: img + threadObj["tim"] + "s.jpg", com: threadObj["com"],
                replyCount: threadObj["replies"], imgCount: threadObj["images"],
                imgsrclarge: img + threadObj["tim"] + ".jpg"
            };
            this.board.push(thread);
        }
    }

    nextThread(){
        if (this.threads.length){
            return this.threads.pop()
        } else {
            console.log('No more pages.')
            throw new Error('No more pages')
            // TODO - EventEmitter to update pages
        }
    }

    private _parse_pages(){
        console.log('_parse_pages()')
        console.log(this.pages)
        let threadList = [];
        for (let pageObj in this.pages) {
            console.log(pageObj);
            if (this.pages.hasOwnProperty(pageObj)){
                let threads = this.pages[pageObj]["threads"];
                for(let i=0; i < threads.length; i++){
                    console.log(threads);
                    console.log("Extracting thread "+i);
                    threadList.push(threads[i])
                }
            }
        }
        console.log(threadList);
        this.threads = threadList
    }
    private _initStructure( count:number=10 ){
        this.board = [];
        let placeholder = {
            id: "placeholder",
            class: "thread-loading",
            subtitle: "Loading..."
        }
        for(let i=0; i < count; i++){
            this.board.push(placeholder);
        }
    }
}
