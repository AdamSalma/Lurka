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
// import { ThreadService } from '../services/thread.service';
var http_1 = require('@angular/http');
require('rxjs/Rx');
var MenuComponent = (function () {
    function MenuComponent(http) {
        this.http = http;
        this.flag = true;
        this.board = "";
    }
    ;
    MenuComponent.prototype.getBoard = function () {
        var _this = this;
        this.http.get('https://a.4cdn.org/g/catalog.json')
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return _this.board = data; }, function (err) { return console.log(err); }, function () { return console.log('it worked http get'); });
    };
    MenuComponent = __decorate([
        core_1.Component({
            selector: 'menu',
            template: "\n\t\t<div>\n\t\t\t<h2>Menu Component</h2>\n\t\t\t<button\n\t\t\t\t(click)=\"getBoard()\"\n\t\t\t>Click me!</button>\n\t\t</div>\n\t\t<div [class.active]=\"flag\">\n\t\t\t<h1>Board:</h1>\n\t\t\t<div>\n\t\t\t\t{{board}}\n\t\t\t</div>\n\n\t\t</div>\n\t"
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
