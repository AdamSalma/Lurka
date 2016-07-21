import { Component, Input } from "@angular/core";
import { SpinnerComponent } from '../common/spinner.component';
import { PostComponent } from './post.component';

@Component({
	selector: "thread",
	template: `
        <spinner
            [class.active]="loadingThread"
        ></spinner>
        <div
            class="background"
            [class.fadeIn]="loadingThread"
        ></div>
        <div class="scrollable"></div>
	`,
    directives: [PostComponent]
})
export class ThreadComponent {
    @Input() thread = {}
	public loadingThread : boolean = true
}
