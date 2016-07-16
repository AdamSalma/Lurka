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
var http_service_1 = require('../services/http.service');
var thread_component_1 = require('./thread.component');
var FourChanComponent = (function () {
    function FourChanComponent(http) {
        this.http = http;
        this.threads = [];
        this.pages = {};
        this._pageCounter = 0;
        this.baseUrls = {
            board: 'https://a.4cdn.org/g/catalog.json',
            img: 'https://i.4cdn.org/g/',
            thread: "http://boards.4chan.org/g/thread/"
        };
    }
    ;
    FourChanComponent.prototype.getBoard = function () {
        var _this = this;
        this._initStructure(15);
        this.http.get('4chan', function (error, threads) {
            if (error) {
                return _this._errorHandler(error);
            }
            _this.pages = threads;
            _this.threads = []; // remove placeholders
            _this.showNextPage(15);
        });
    };
    FourChanComponent.prototype.showNextPage = function (num) {
        console.log("showNextPage");
        var p = this.pages;
        for (var pageObj in p) {
            if (p.hasOwnProperty(pageObj)) {
                if (parseInt(pageObj) > this._pageCounter) {
                    console.log("Threads " + p);
                    var threads = p[pageObj]['threads'];
                    for (var i = 0; i < threads.length; i++) {
                        if (i == num)
                            break;
                        console.log("Creating thread " + i);
                        this.createThread(threads[i]);
                    }
                }
            }
        }
    };
    FourChanComponent.prototype.createThread = function (threadObj) {
        var b = this.baseUrls;
        var thread = {
            id: threadObj['no'],
            // imgid: thread['tim'],
            // date: thread['now'],
            threadurl: b.thread + threadObj['no'] + "/" + threadObj['semantic_url'],
            subtitle: threadObj['sub'] || "",
            imgsrc: b.img + threadObj['tim'] + "s.jpg",
            imgsrclarge: b.img + threadObj['tim'] + ".jpg",
            replyCount: threadObj['replies'],
            imgCount: threadObj['images'],
            op: threadObj['com']
        };
        this.threads.push(thread);
    };
    FourChanComponent.prototype._initStructure = function (count) {
        // This could create a spinner in each thread while loading
        this.threads = [];
        var thread = {
            klass: "thread-loading",
            subtitle: "Loading..."
        };
        for (var i = 0; i < count; i++) {
            this.threads.push(thread);
        }
    };
    FourChanComponent.prototype._errorHandler = function (error) {
        console.log("Error happened yo: error");
    };
    FourChanComponent = __decorate([
        core_1.Component({
            selector: 'fourchan',
            template: "\n\t\t<h1>4Chan Component</h1>\n\t\t<button type=\"button\" (click)=\"getBoard()\">Get threads!</button>\n\t\t<thread\n\t\t\t*ngFor=\"let thread of threads\"\n\t\t\t[thread]=\"thread\"\n\t\t\t[id]=\"'id' + thread.id\"\n\t\t\tclass=\"thread catalogue\"\n\t\t></thread>\n\t",
            directives: [thread_component_1.ThreadComponent],
            providers: [http_service_1.HttpService]
        }), 
        __metadata('design:paramtypes', [http_service_1.HttpService])
    ], FourChanComponent);
    return FourChanComponent;
}());
exports.FourChanComponent = FourChanComponent;
