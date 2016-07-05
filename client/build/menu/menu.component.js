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
var thread_service_1 = require('../services/thread.service');
var MenuComponent = (function () {
    function MenuComponent(_threadService) {
        this._threadService = _threadService;
        this.flag = true;
    }
    ;
    MenuComponent.prototype.onLog = function (message) {
        this._threadService.getThread(message);
    };
    MenuComponent = __decorate([
        core_1.Component({
            selector: 'menu',
            template: "\n\t\t<div>\n\t\t\t<h2>Menu Component</h2>\n\t\t\t<input type=\"text\" #message>\n\t\t\t<button \n\t\t\t\t(click)=\"onLog(flag? message.value : 'Or not...')\">Click me!</button>\n\t\t</div>\n\t",
            providers: [thread_service_1.ThreadService]
        }), 
        __metadata('design:paramtypes', [thread_service_1.ThreadService])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
