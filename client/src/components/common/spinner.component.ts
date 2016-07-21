import { Component } from '@angular/core';

@Component({
	selector: "spinner",
	template: `
        <div class="spinner" [class.active]="isSpinning"></div>
	`
})
export class SpinnerComponent {
	public isSpinning : boolean = true
}
