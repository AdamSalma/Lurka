import { Component, Input } from "@angular/core";

@Component({
	selector: "board",
	template: `
		<div>{{post.com}}</div>
	`
})
export class PostComponent {
	@Input() post = {};
}
