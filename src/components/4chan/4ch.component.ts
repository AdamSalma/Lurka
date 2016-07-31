import { Component, AfterViewInit, Input } from "@angular/core";
import { BoardComponent } from "./board.component";
import { ThreadComponent } from "./thread.component";

@Component({
    selector: "fourchan",
    template: `
        <thread [threadID]="threadID"
                [settings]="settings"></thread>

        <board [settings]="settings"
               (threadChange)="threadID = $event.value"
               class="board"></board>
    `,
    styles: [require("./4ch.component.sass")],
    directives: [BoardComponent, ThreadComponent]
})
export class FourChanComponent {
    @Input() settings = {
        autoload: false,
        pageSize: 20,
        board: "g",
        loadingThread: false
    };
    threadID = null;
}
