import { Component, Input, OnChanges } from "@angular/core";
import { SpinnerComponent } from "../common/spinner.component";
import { ThreadPostComponent } from "./thread-post.component";
import { HttpService } from "../../services/http.service";
import { HelperService } from "../../services/helper.service";

import $ = require("jquery");
console.log($);

@Component({
    selector: "thread",
    template: `
        <spinner class="spinner" [class.active]="loadingThread"></spinner>
        <div class="background"
             [class.active]="loadingThread"
             (click)="closeThread()"></div>
        <div
            class="thread-wrap"
            [class.active]="loadingThread">

            <div class="thread">

                <thread-post
                    *ngFor="let post of thread"
                    [post]="post"
                    class="post"></thread-post>
            </div>
        </div>
    `,
    styles: [require("./thread.component.sass")],
    directives: [ThreadPostComponent, SpinnerComponent],
    providers: [HttpService, HelperService]
})
export class ThreadComponent implements OnChanges {
    @Input() threadID;
    @Input() currentBoard;
    @Input() settings = {
        autoload: undefined,
        board: undefined,
        pageSize: undefined
    };

    constructor( public http: HttpService, private _helper: HelperService ) {};
    thread = [];
    loadingThread: boolean = false;

    ngOnChanges(changes){
        console.log("thread ngOnChanges");
        if (changes.hasOwnProperty('threadID') && changes.threadID.currentValue){
            console.log($);
            console.log(`ThreadID has new value ${changes.threadID.currentValue}`)
            console.log("Getting thread")
            this.getThread(changes.threadID.currentValue);
        }
    }

    getThread( threadID: number ) {
        console.log("getThread()");
        if (this.threadID === undefined) return false;
        let board: string = this.currentBoard;
        this.threadID = threadID;
        this.http.get(`/4chan/${board}/thread/${threadID}`, (error, thread) => {
            if (error) return this._helper.errorHandler(error);
            this.thread = thread["posts"];
            console.log("Thread obj:", thread);
            console.log("Posts:", this.thread);
            this.loadingThread = true;
        });
    }

    closeThread() {
        this.loadingThread = false;
        this.thread = [];
    }
}
