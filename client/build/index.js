/// <reference path="../../typings/index.d.ts" />
"use strict";
require('core-js');
require('zone.js/dist/zone');
require('reflect-metadata');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [http_1.HTTP_PROVIDERS]);
