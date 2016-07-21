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
var http_service_1 = require('../../services/http.service');
var board_component_1 = require('./board.component');
var thread_component_1 = require('./thread.component');
var FourChanComponent = (function () {
    function FourChanComponent(http) {
        this.http = http;
        this.ops = [];
        this.thread = [];
        this.pages = {};
        this._pageCounter = 0;
        this.baseUrls = {
            board: 'https://a.4cdn.org/g/catalog.json',
            img: 'https://i.4cdn.org/g/',
            thread: "http://boards.4chan.org/g/thread/"
        };
    }
    ;
    FourChanComponent.prototype.ngAfterContentInit = function () {
        this.getBoard();
    };
    ;
    FourChanComponent.prototype.getBoard = function () {
        var _this = this;
        this._initStructure(15);
        this.http.get('4chan', function (error, ops) {
            if (error) {
                return _this._errorHandler(error);
            }
            _this.pages = ops;
            _this.ops = []; // remove placeholders
            _this.showNextPage();
        });
    };
    FourChanComponent.prototype.getThread = function ($event) {
        console.log($event);
        console.log($event.target);
    };
    FourChanComponent.prototype.showNextPage = function (max) {
        if (max === void 0) { max = 15; }
        console.log("showNextPage");
        var p = this.pages;
        for (var pageObj in p) {
            if (p.hasOwnProperty(pageObj)
                && parseInt(pageObj) > this._pageCounter) {
                console.log("Threads " + p);
                var threads = p[pageObj]['threads'];
                for (var i = 0; i < threads.length; i++) {
                    if (i == max)
                        break;
                    console.log("Creating thread " + i);
                    this.createThread(threads[i]);
                }
            }
        }
    };
    FourChanComponent.prototype.createThread = function (threadObj) {
        var b = this.baseUrls;
        var op = {
            id: threadObj['no'],
            // imgid: thread['tim'],
            // date: thread['now'],
            threadurl: b.thread + threadObj['no'] + "/" + threadObj['semantic_url'],
            subtitle: threadObj['sub'] || "",
            imgsrc: b.img + threadObj['tim'] + "s.jpg",
            imgsrclarge: b.img + threadObj['tim'] + ".jpg",
            replyCount: threadObj['replies'],
            imgCount: threadObj['images'],
            com: threadObj['com']
        };
        this.ops.push(op);
    };
    FourChanComponent.prototype._initStructure = function (count) {
        // This could create a spinner in each thread while loading
        this.ops = [];
        var op = {
            class: "thread-loading",
            subtitle: "Loading..."
        };
        for (var i = 0; i < count; i++) {
            this.ops.push(op);
        }
    };
    FourChanComponent.prototype._errorHandler = function (error) {
        console.log("Error happened yo: " + error);
    };
    FourChanComponent = __decorate([
        core_1.Component({
            selector: 'fourchan',
            template: "\n        <thread [thread]=\"thread\"></thread>\n        <div class=\"board\">\n    \t\t<board\n    \t\t\t*ngFor=\"let op of ops\"\n    \t\t\t[op]=\"op\"\n    \t\t\tclass=\"thread catalogue\"\n                (click)=\"getThread(op.id)\"\n    \t\t></board>\n        </div>\n\t",
            directives: [board_component_1.BoardComponent, thread_component_1.ThreadComponent],
            providers: [http_service_1.HttpService]
        }), 
        __metadata('design:paramtypes', [http_service_1.HttpService])
    ], FourChanComponent);
    return FourChanComponent;
}());
exports.FourChanComponent = FourChanComponent;
