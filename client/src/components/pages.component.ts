import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { FourChanComponent } from './4chan/4ch.component';

@Component({
	selector: "pages",
	template: `
		<home [class.active]="page === 'Home'"></home>
		<fourchan [class.active]="page === '4chan'"></fourchan>
	`,  // Add more sites later...
	directives: [FourChanComponent, HomeComponent]
})
export class PageComponent {
	page: string = '4chan';
}
