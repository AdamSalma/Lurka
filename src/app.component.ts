import { Component } from '@angular/core';
import { provideRouter, RouterConfig }  from '@angular/router';

// Directives
import { MenuComponent } from './components/menu/menu.component';
import { PageComponent } from './components/pages.component';

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
