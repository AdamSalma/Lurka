import { Component } from '@angular/core';
// import { ThreadService } from '../services/thread.service';
import { Http, Headers, HTTP_BINDINGS } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
	selector: 'menu',
	template: `
        <input
            type="button"
            value="Previous Section"
            (click)="changeTitle(-1)"
        >
		<h2>{{pageTitle}}</h2>
        <input
            type="button"
            value="Next Section"
            (click)="changeTitle(1)"
        >
	`
})
export class MenuComponent {
    constructor(public http: Http){};
    // titleChange = new EventEmitter<string>();

    pageNames = [
        "Home",
        "4Chan",
        "Other"
    ]
    pageTitle :string = this.pageNames[1]


    changeTitle( direction :number ){
        let len = this.pageNames.length
        let index = this.pageNames.indexOf(this.pageTitle)
        if (index+direction > len){
            this.pageTitle = this.pageNames[(len-1 - index) + direction]
        } else if (index+direction < 0) {
            this.pageTitle = this.pageNames[len+index + direction]
        } else {
            this.pageTitle = this.pageNames[index+direction]
        }
    }
}
