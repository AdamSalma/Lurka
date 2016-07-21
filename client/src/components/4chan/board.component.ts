import { Component, Input } from "@angular/core";

@Component({
	selector: "board",
	template: `
		<img src="{{ op.imgsrc }}">
		<div class="op-count">
			R: <b>{{ op.replyCount }}</b>
			I: <b>{{ op.imgCount }}</b>
		</div>
		<div class="op-op">
			<b
				class="title"
				[innerHTML]="op.subtitle"
			></b>
			<div
				[innerHTML]="op.com"
			></div>
		</div>
	`
})
export class BoardComponent {
	@Input() op = {};
}
