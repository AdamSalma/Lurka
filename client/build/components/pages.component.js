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
var home_component_1 = require('./home/home.component');
var _4ch_component_1 = require('./4chan/4ch.component');
var PageComponent = (function () {
    function PageComponent() {
        this.page = '4chan';
    }
    PageComponent = __decorate([
        core_1.Component({
            selector: "pages",
            template: "\n\t\t<home [class.active]=\"page === 'Home'\"></home>\n\t\t<fourchan [class.active]=\"page === '4chan'\"></fourchan>\n\t",
            directives: [_4ch_component_1.FourChanComponent, home_component_1.HomeComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], PageComponent);
    return PageComponent;
}());
exports.PageComponent = PageComponent;
