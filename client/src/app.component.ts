import { Component } from '@angular/core';
import { provideRouter, RouterConfig }  from '@angular/router';

// Directives
import { MenuComponent } from './menu/menu.component';
import { PageComponent } from './pages.component';

@Component({
	selector: 'app',
	template: `
		<menu></menu>
		<pages></pages>
	`,
	directives: [PageComponent, MenuComponent]
})

export class AppComponent {

}