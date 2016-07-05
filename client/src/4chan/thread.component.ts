import { Component, Input } from "@angular/core";

@Component({
	selector: "thread",
	template: `
		<span>Thread Component</span>
		<img src="{{ threadObj.imgsrc }}">
		<div class="thread-count">
			R: <b>{{ threadObj.replyCount }}</b>
			I: <b>{{ threadObj.imgCount }}</b>
		</div>
		<div class="thread-op">
			<b class="title">{{ threadObj.subtitle }}</b>
			{{ threadObj.op }}
		</div>
	`,
	inputs: ["threadObj"]
})
export class ThreadComponent {

}

