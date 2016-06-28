import { Component } from '@angular/core';
import { HomeComponent } from '/home/home.component';

@Component({
	selector: "pages",
	template: `
		<home></home>
	`,
	directives: [HomeComponent]
})
export class PageComponent {
	start: string[] = ["Hello", "World", "from", "PageComponent"]
}