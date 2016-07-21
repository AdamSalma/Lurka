import { Component, AfterContentInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { BoardComponent } from './board.component';
import { ThreadComponent } from './thread.component';

@Component({
	selector: 'fourchan',
	template: `
        <thread [thread]="thread"></thread>
        <div class="board">
    		<board
    			*ngFor="let op of ops"
    			[op]="op"
    			class="thread catalogue"
                (click)="getThread(op.id)"
    		></board>
        </div>
	`,
	directives: [BoardComponent, ThreadComponent],
	providers: [HttpService]
})
export class FourChanComponent implements AfterContentInit {
	public ops = [];
	public thread = [];
	public pages = {};
	private _pageCounter = 0;

	private baseUrls = {
		board: 'https://a.4cdn.org/g/catalog.json',
		img: 'https://i.4cdn.org/g/',
		thread:"http://boards.4chan.org/g/thread/"
	}

	constructor(private http: HttpService) { };
	ngAfterContentInit(){
		this.getBoard();
	};
	getBoard(){
		this._initStructure(15);
		this.http.get('4chan', (error, ops) => {
			if (error) {
				return this._errorHandler(error);
			}
			this.pages = ops;
			this.ops = []  // remove placeholders
			this.showNextPage()
		});
	}
    getThread($event){
        console.log($event)
        console.log($event.target)
    }
	showNextPage(max:number = 15){
		console.log("showNextPage");
		let p = this.pages
		for(let pageObj in p){
			if (
				p.hasOwnProperty(pageObj)
				&& parseInt(pageObj) > this._pageCounter
			){
				console.log("Threads " + p)
				let threads = p[pageObj]['threads'];
				for(let i=0; i < threads.length; i++){
					if (i == max) break;
					console.log("Creating thread "+i)
					this.createThread(threads[i]);
				}
			}
		}
	}

	createThread( threadObj ){
		let b = this.baseUrls;
		let op = {
			id: threadObj['no'],
			// imgid: thread['tim'],
			// date: thread['now'],
			threadurl: b.thread + threadObj['no'] + "/" + threadObj['semantic_url'],
			subtitle: threadObj['sub'] || "",
			imgsrc: b.img + threadObj['tim'] + "s.jpg",
			imgsrclarge: b.img + threadObj['tim'] + ".jpg",
			replyCount: threadObj['replies'],
			imgCount: threadObj['images'],
			com: threadObj['com']
		}
		this.ops.push(op)
	}

	private _initStructure(count){
		// This could create a spinner in each thread while loading
		this.ops = [];
		let op = {
			class: "thread-loading",
			subtitle: "Loading..."
		}
		for(let i=0; i < count; i++){
			this.ops.push(op);
		}
	}

	private _errorHandler(error){
		console.log(`Error happened yo: ${error}`);
	}

}
