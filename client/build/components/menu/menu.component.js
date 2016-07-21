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
        // titleChange = new EventEmitter<string>();
        this.pageNames = [
            "Home",
            "4Chan",
            "Other"
        ];
        this.pageTitle = this.pageNames[1];
    }
    ;
    MenuComponent.prototype.changeTitle = function (direction) {
        var len = this.pageNames.length;
        var index = this.pageNames.indexOf(this.pageTitle);
        if (index + direction > len) {
            this.pageTitle = this.pageNames[(len - 1 - index) + direction];
        }
        else if (index + direction < 0) {
            this.pageTitle = this.pageNames[len + index + direction];
        }
        else {
            this.pageTitle = this.pageNames[index + direction];
        }
    };
    MenuComponent = __decorate([
        core_1.Component({
            selector: 'menu',
            template: "\n        <input\n            type=\"button\"\n            value=\"Previous Section\"\n            (click)=\"changeTitle(-1)\"\n        >\n\t\t<h2>{{pageTitle}}</h2>\n        <input\n            type=\"button\"\n            value=\"Next Section\"\n            (click)=\"changeTitle(1)\"\n        >\n\t"
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
