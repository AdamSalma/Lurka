import { Component } from '@angular/core';
import { BoardService } from '../services/board.service';
import { ThreadComponent } from './thread.component';

@Component({
	selector: 'fourchan',
	template: `
		<h2>4Chan Component</h2>
		<div *ngFor="let threadObj of threads">
			<thread [threadObj]="threadObj"></thread>
		</div>
	`,
	directives: [ThreadComponent]
})
export class FourChanComponent {
	// constructor(private boardService: BoardService) { };

	public threads = [
		{
			id: 12345,
			threadUrl: "Thread>url",
			imgsrc: "srcHere",
			replyCount: 10,
			imgCount: 2,
			subtitle: "Thread>subtitle",
			op: "Thread>op"
		},
		{
			id: 12345,
			threadUrl: "Thread>url",
			imgsrc: "srcHere",
			replyCount: 10,
			imgCount: 2,
			subtitle: "Thread>subtitle",
			op: "Thread>op"
		},
		{
			id: 12345,
			threadUrl: "Thread>url",
			imgsrc: "srcHere",
			replyCount: 10,
			imgCount: 2,
			subtitle: "Thread>subtitle",
			op: "Thread>op"
		},
		{
			id: 12345,
			threadUrl: "Thread>url",
			imgsrc: "srcHere",
			replyCount: 10,
			imgCount: 2,
			subtitle: "Thread>subtitle",
			op: "Thread>op"
		},
		{
			id: 12345,
			threadUrl: "Thread>url",
			imgsrc: "srcHere",
			replyCount: 10,
			imgCount: 2,
			subtitle: "Thread>subtitle",
			op: "Thread>op"
		}
	];

}