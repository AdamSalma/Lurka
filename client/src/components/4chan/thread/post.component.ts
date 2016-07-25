import { Component, Input } from "@angular/core";

@Component({
	selector: "post",
	template: `
        <div class="post-info">
    		<span *ngIf="post.sub">{{post.sub}}</span>
    		<span>{{post.name}}</span>
    		<span>{{post.now}}</span>
    		<span>No.{{post.no}}</span>
        </div>
		<blockquote [innerHtml]="post.com"></blockquote>
	`
})
export class PostComponent {
	@Input() post = {};
}
