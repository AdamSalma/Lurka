import { Component, Input } from '@angular/core';

@Component({
	selector: "spinner",
	template: `
        <div class="spinner" [class.active]="isSpinning"></div>
	`,
    styles: [require('./spinner.component.sass')]
})
export class SpinnerComponent {
	@Input() isSpinning: boolean = false;
    
}
