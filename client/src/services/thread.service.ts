import { Injectable } from "@angular/core";

@Injectable()
export class ThreadService {
	getThread(words) {
		console.log(words)
	}
	getBoard() {
		console.log("WOW")	
	}
}