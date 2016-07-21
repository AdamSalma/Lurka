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
var post_component_1 = require('./post.component');
var ThreadComponent = (function () {
    function ThreadComponent() {
        this.thread = {};
        this.loadingThread = true;
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ThreadComponent.prototype, "thread", void 0);
    ThreadComponent = __decorate([
        core_1.Component({
            selector: "thread",
            template: "\n        <spinner\n            [class.active]=\"loadingThread\"\n        ></spinner>\n        <div\n            class=\"background\"\n            [class.fadeIn]=\"loadingThread\"\n        ></div>\n        <div class=\"scrollable\"></div>\n\t",
            directives: [post_component_1.PostComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], ThreadComponent);
    return ThreadComponent;
}());
exports.ThreadComponent = ThreadComponent;
