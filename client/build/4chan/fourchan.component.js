"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var thread_component_1 = require('./thread.component');
var FourChanComponent = (function () {
    function FourChanComponent() {
        // constructor(private boardService: BoardService) { };
        this.threads = [
            {
                id: 12345,
                threadUrl: "Thread>url",
                imgsrc: "srcHere",
                replyCount: 10,
                imgCount: 2,
                subtitle: "Thread>subtitle",
                op: "Thread>op"
            },
            {
                id: 12345,
                threadUrl: "Thread>url",
                imgsrc: "srcHere",
                replyCount: 10,
                imgCount: 2,
                subtitle: "Thread>subtitle",
                op: "Thread>op"
            },
            {
                id: 12345,
                threadUrl: "Thread>url",
                imgsrc: "srcHere",
                replyCount: 10,
                imgCount: 2,
                subtitle: "Thread>subtitle",
                op: "Thread>op"
            },
            {
                id: 12345,
                threadUrl: "Thread>url",
                imgsrc: "srcHere",
                replyCount: 10,
                imgCount: 2,
                subtitle: "Thread>subtitle",
                op: "Thread>op"
            },
            {
                id: 12345,
                threadUrl: "Thread>url",
                imgsrc: "srcHere",
                replyCount: 10,
                imgCount: 2,
                subtitle: "Thread>subtitle",
                op: "Thread>op"
            }
        ];
    }
    FourChanComponent = __decorate([
        core_1.Component({
            selector: 'fourchan',
            template: "\n\t\t<h2>4Chan Component</h2>\n\t\t<div *ngFor=\"let thread of threads\">\n\t\t\t<thread \n\t\t\t\t[thread]=\"thread\"\n\t\t\t\t[id]=\"thread.id\"\n\t\t\t></thread>\n\t\t</div>\n\t",
            directives: [thread_component_1.ThreadComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], FourChanComponent);
    return FourChanComponent;
}());
exports.FourChanComponent = FourChanComponent;
