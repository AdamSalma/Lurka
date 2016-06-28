import { Component } from '@angular/core';

// Directives
import { HeaderComponent } from './header/header.component';
import { PageComponent } from './pages/page.component';
import { FooterComponent } from './footer/footer.component';

@Component({
	selector: 'app',
	template: `
		<app-header></app-header>
		<pages></pages>
	`,
	directives: [PageComponent, HeaderComponent]
})
export class AppComponent {

}