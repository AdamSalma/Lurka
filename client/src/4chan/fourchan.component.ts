import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ThreadComponent } from './thread.component';

@Component({
	selector: 'fourchan',
	template: `
		<h1>4Chan Component</h1>
		<button type="button" (click)="getBoard()">Get threads!</button>
		<thread
			*ngFor="let thread of threads"
			[thread]="thread"
			[id]="'id' + thread.id"
			class="thread catalogue"
		></thread>
	`,
	directives: [ThreadComponent],
	providers: [HttpService]
})
export class FourChanComponent {
	constructor(private http: HttpService) { };

	public threads = [];
	public pages = {};
	private _pageCounter = 0;

	private baseUrls = {
		board: 'https://a.4cdn.org/g/catalog.json',
		img: 'https://i.4cdn.org/g/',
		thread:"http://boards.4chan.org/g/thread/"
	}

	getBoard(){
		this._initStructure(15);
		this.http.get('4chan', (error, threads) => {
			if (error) {
				return this._errorHandler(error);
			}
			this.pages = threads;
			this.threads = []  // remove placeholders
			this.showNextPage(15)
		});
	}
	showNextPage(num){
		console.log("showNextPage");
		let p = this.pages
		for(let pageObj in p){
			if (p.hasOwnProperty(pageObj)){
				if (parseInt(pageObj) > this._pageCounter){
					console.log("Threads " + p)
					let threads = p[pageObj]['threads'];
					for(let i=0; i < threads.length; i++){
						if (i == num) break;
						console.log("Creating thread "+i)
						this.createThread(threads[i]);
					}
				}
			}
		}
	}
	createThread(threadObj){
		let b = this.baseUrls;
		let thread = {
			id: threadObj['no'],
			// imgid: thread['tim'],
			// date: thread['now'],
			threadurl: b.thread + threadObj['no'] + "/" + threadObj['semantic_url'],
			subtitle: threadObj['sub'] || "",
			imgsrc: b.img + threadObj['tim'] + "s.jpg",
			imgsrclarge: b.img + threadObj['tim'] + ".jpg",
			replyCount: threadObj['replies'],
			imgCount: threadObj['images'],
			op: threadObj['com']
		}
		this.threads.push(thread)
	}

	private _initStructure(count){
		// This could create a spinner in each thread while loading
		this.threads = [];
		let thread = {
			klass:"thread-loading", 
			subtitle:"Loading..."
		}
		for(let i=0; i < count; i++){
			this.threads.push(thread);
		}
	}

	private _errorHandler(error){
		console.log(`Error happened yo: error`);
	}

}
