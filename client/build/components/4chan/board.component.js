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
var core_1 = require("@angular/core");
var BoardComponent = (function () {
    function BoardComponent() {
        this.op = {};
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BoardComponent.prototype, "op", void 0);
    BoardComponent = __decorate([
        core_1.Component({
            selector: "board",
            template: "\n\t\t<img src=\"{{ op.imgsrc }}\">\n\t\t<div class=\"op-count\">\n\t\t\tR: <b>{{ op.replyCount }}</b>\n\t\t\tI: <b>{{ op.imgCount }}</b>\n\t\t</div>\n\t\t<div class=\"op-op\">\n\t\t\t<b\n\t\t\t\tclass=\"title\"\n\t\t\t\t[innerHTML]=\"op.subtitle\"\n\t\t\t></b>\n\t\t\t<div\n\t\t\t\t[innerHTML]=\"op.com\"\n\t\t\t></div>\n\t\t</div>\n\t"
        }), 
        __metadata('design:paramtypes', [])
    ], BoardComponent);
    return BoardComponent;
}());
exports.BoardComponent = BoardComponent;
