import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { FourChanComponent } from './4chan/fourchan.component';

@Component({
	selector: "pages",
	template: `
		<home></home>
		<fourchan class="board"></fourchan>
	`,  // Add more sites later...
	directives: [FourChanComponent, HomeComponent]
})
export class PageComponent {
	catalogue: boolean = true;
}