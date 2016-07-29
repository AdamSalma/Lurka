import { Component, AfterViewInit, Input } from "@angular/core";
import { HttpService } from "../../services/http.service";
import { BoardComponent } from "./board.component";
import { ThreadComponent } from "./thread.component";

declare function require(name: string): any;

@Component({
    selector: "fourchan",
    template: `
        <thread [thread]="content.thread"></thread>
        <board [pages]="content.pages" [settings]="settings" class="board"></board>
    `,
    styles: [require('./4ch.component.sass')],
    directives: [BoardComponent, ThreadComponent],
    providers: [HttpService]
})
export class FourChanComponent {
    @Input() settings = {
        autoload: true,
        pageSize: 20
    };
    private status = {
        threadCount: 0,  // track position in content.pages
        board: "g",
        threadID: null
    };
    public content = {
        pages: [],
        thread: []
    }
    constructor(private http: HttpService) { };

    getBoard( board:string ) {
        this.status.board = board;
        // this._initStructure(10);
        this.http.get(`4chan/${board}`, (error, pages) => {
            if (error) {
                return this._errorHandler(error);
            }
            this.content.pages = pages
        });
    }
    getThread( threadID:string ){
        this.status.threadID = threadID;
        console.log("getThread()");
        let board : string = this.status.board;
        this.http.get(`4chan/${board}/thread/${threadID}`, (error, thread) => {
            if (error) {
                return this._errorHandler(error);
            }
            console.log("it worked!");
            this.content.thread = thread["posts"];
            console.log(this.content.thread);
        });
    }

    private _errorHandler(error){
        console.log(`Error happened yo: ${error}`);
    }

}
