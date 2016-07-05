import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { FourChanComponent } from './4chan/fourchan.component';

@Component({
	selector: "pages",
	template: `
		<home [class.activePage]="pageVisible"></home>
		<fourchan [class.activePage]="pageVisible"></fourchan>
	`,  // Add more sites later...
	directives: [FourChanComponent, HomeComponent]
})
export class PageComponent {
	pageVisible:boolean = true;
}