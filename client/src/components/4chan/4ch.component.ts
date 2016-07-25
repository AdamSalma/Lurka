import { Component, AfterViewInit, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { BoardComponent } from './board/board.component';
import { ThreadComponent } from './thread/thread.component';

@Component({
	selector: 'fourchan',
	template: `

        <thread [thread]="content.thread"></thread>
        <div class="board">
    		<board-thread
    			*ngFor="let thread of content.board"
    			[thread]="thread"
                (click)="getThread(thread.id)"
                class="thread catalogue"
    		></board-thread>
        </div>
	`,
	directives: [BoardComponent, ThreadComponent],
	providers: [HttpService]
})
export class FourChanComponent implements AfterViewInit {
    @Input() user = {
        autoload: true,
        pageSize: 20
    };
    private status = {
        threadCount: 0,  // track position in content.pages
        board: 'g',
        threadID: null
    };
    public content = {
        pages: [],
        board: [],
        thread: []
    }
    constructor(private http: HttpService) {
    };

	ngAfterViewInit(  ) {
        if (this.user.autoload) this.getBoard('g');
	};
	getBoard( board:string ) {
        this.status.board = board;
		// this._initStructure(10);
		this.http.get(`4chan/${board}`, (error, pages) => {
			if (error) {
				return this._errorHandler(error);
			}
			this.content.pages = pages;
			this.content.board = [];  // remove placeholders
			this.renderThreads(2);
		});
	}
    nextBoardThread(){
        let pp = this.status.threadCount;

    }
    getThread( threadID:string ){
        this.status.threadID = threadID;
        console.log('getThread()');
        let board : string = this.status.board;
        this.http.get(`4chan/${board}/thread/${threadID}`, (error, thread) => {
			if (error) {
				return this._errorHandler(error);
			}
            console.log('it worked!');
			this.content.thread = thread['posts'];
            console.log(this.content.thread);
		});
    }
	renderThreads( newThreads:number = 15) {
		console.log("renderThreads()");
		let p = this.content.pages;
		for (let pageObj in p) {
			if (p.hasOwnProperty(pageObj)){
				console.log("Threads " + p);
				let threads = p[pageObj]['threads'];
				for(let i=0; i < threads.length; i++){
					if (i == newThreads) break;
					console.log("Creating thread "+i);
					this.createThread(threads[i]);
				}
			}
		}
	}

	createThread( threadObj ){
        console.log("createThread()");
		let i = 'https://i.4cdn.org/g/';
		let thread = {
			id: threadObj['no'], imgid: threadObj['tim'],
			date: threadObj['now'],	subtitle: threadObj['sub'] || "",
			imgsrc: i + threadObj['tim'] + "s.jpg", com: threadObj['com'],
            replyCount: threadObj['replies'], imgCount: threadObj['images'],
			imgsrclarge: i + threadObj['tim'] + ".jpg"
		}
		this.content.board.push(thread)
	}

	private _initStructure( count:number=10 ){
		// This could create a spinner in each thread while loading
		this.content.board = [];
		let placeholder = {
            id: "placeholder",
			class: "thread-loading",
			subtitle: "Loading..."
		}
		for(let i=0; i < count; i++){
			this.content.board.push(placeholder);
		}
	}

	private _errorHandler(error){
		console.log(`Error happened yo: ${error}`);
	}

}
