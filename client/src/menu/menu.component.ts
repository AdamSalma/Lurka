import { Component } from '@angular/core';
// import { ThreadService } from '../services/thread.service';
import { Http, Headers, HTTP_BINDINGS } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
	selector: 'menu',
	template: `
		<div>
			<h2>Menu Component</h2>
			<input
				type="text" 
				placeholder="Hi mum"
				#message>
			<button 
				(click)="getBoard()"
			>Click me!</button>
		</div>
		<div [class.active]="flag">
			<h1>Boards:</h1>
			<div>
				{{board}}
			</div>
			
		</div>
	`
})
export class MenuComponent {
	constructor(public http: Http){};
	flag: boolean = true;
	board: string = ""

	getBoard() {
		this.http.get('http://localhost:3000/board/')
				 .map(res => res.text())
				 .subscribe(
				 	data => this.board = data,
				 	err => this.logError(err),
				 	() => console.log('it worked http get')
				 );
	}
}