import { Component } from "@angular/core";
import { provideRouter, RouterConfig }  from "@angular/router";

// Directives
import { MenuComponent } from "./components/menu/menu.component";
import { PageComponent } from "./components/pages.component";

@Component({
	selector: "app",
	template: `
        <div class="wrapper">
    		<menu></menu>
    		<pages></pages>
        </div>
	`,
	directives: [PageComponent, MenuComponent],
    styles: [require("./app.component.sass")]
})

export class AppComponent {

}
