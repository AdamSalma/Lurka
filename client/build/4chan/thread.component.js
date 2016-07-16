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
var ThreadComponent = (function () {
    function ThreadComponent() {
        this.thread = {};
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ThreadComponent.prototype, "thread", void 0);
    ThreadComponent = __decorate([
        core_1.Component({
            selector: "thread",
            template: "\n\t\t<img src=\"{{ thread.imgsrc }}\">\n\t\t<div class=\"thread-count\">\n\t\t\tR: <b>{{ thread.replyCount }}</b>\n\t\t\tI: <b>{{ thread.imgCount }}</b>\n\t\t</div>\n\t\t<div class=\"thread-op\">\n\t\t\t<b \n\t\t\t\tclass=\"title\"\n\t\t\t\t[innerHTML]=\"thread.subtitle\"\n\t\t\t></b>\n\t\t\t<div\n\t\t\t\t[innerHTML]=\"thread.op\"\n\t\t\t></div>\n\t\t</div>\n\t"
        }), 
        __metadata('design:paramtypes', [])
    ], ThreadComponent);
    return ThreadComponent;
}());
exports.ThreadComponent = ThreadComponent;
