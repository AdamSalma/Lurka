/// <reference path="../../typings/index.d.ts" />

import 'core-js';
import 'zone.js/dist/zone';
import 'reflect-metadata';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent } from './app.component';

bootstrap(AppComponent, [HTTP_PROVIDERS]);