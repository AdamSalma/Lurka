import { Component, Input } from "@angular/core";

@Component({
	selector: "thread",
	template: `
		<span>Thread Component</span>
		<img src="{{ thread.imgsrc }}">
		<div class="thread-count">
			R: <b>{{ thread.replyCount }}</b>
			I: <b>{{ thread.imgCount }}</b>
		</div>
		<div class="thread-op">
			<b class="title">{{ thread.subtitle }}</b>
			{{ thread.op }}
		</div>
	`
})
export class ThreadComponent {
	@Input() thread = {};
}

