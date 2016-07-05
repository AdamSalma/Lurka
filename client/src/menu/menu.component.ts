import { Component } from '@angular/core';
import { ThreadService } from '../services/thread.service';

@Component({
	selector: 'menu',
	template: `
		<div>
			<h2>Menu Component</h2>
			<input type="text" #message>
			<button 
				(click)="onLog(flag? message.value : 'Or not...')">Click me!</button>
		</div>
	`,
	providers: [ThreadService]
})
export class MenuComponent {
	constructor(private _threadService: ThreadService){};
	flag: boolean = true;

	onLog( message: string ) {
		this._threadService.getThread(message);
	}
}