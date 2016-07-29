webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var platform_browser_dynamic_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(328);
	var app_component_1 = __webpack_require__(349);
	platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [http_1.HTTP_PROVIDERS]);


/***/ },

/***/ 349:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	// Directives
	var menu_component_1 = __webpack_require__(350);
	var pages_component_1 = __webpack_require__(606);
	var AppComponent = (function () {
	    function AppComponent() {
	    }
	    AppComponent = __decorate([
	        core_1.Component({
	            selector: 'app',
	            template: "\n\t\t<menu></menu>\n\t\t<pages></pages>\n\t",
	            directives: [pages_component_1.PageComponent, menu_component_1.MenuComponent]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], AppComponent);
	    return AppComponent;
	}());
	exports.AppComponent = AppComponent;


/***/ },

/***/ 350:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	// import { ThreadService } from '../services/thread.service';
	var http_1 = __webpack_require__(328);
	__webpack_require__(351);
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


/***/ },

/***/ 606:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var home_component_1 = __webpack_require__(607);
	var _4ch_component_1 = __webpack_require__(608);
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


/***/ },

/***/ 607:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var HomeComponent = (function () {
	    function HomeComponent() {
	    }
	    HomeComponent = __decorate([
	        core_1.Component({
	            selector: 'home',
	            template: "\n\t\t<h2>Home Component</h2>\n\t"
	        }), 
	        __metadata('design:paramtypes', [])
	    ], HomeComponent);
	    return HomeComponent;
	}());
	exports.HomeComponent = HomeComponent;


/***/ },

/***/ 608:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var http_service_1 = __webpack_require__(609);
	var board_component_1 = __webpack_require__(612);
	var thread_component_1 = __webpack_require__(614);
	var FourChanComponent = (function () {
	    function FourChanComponent(http) {
	        this.http = http;
	        this.settings = {
	            autoload: true,
	            pageSize: 20
	        };
	        this.status = {
	            threadCount: 0,
	            board: "g",
	            threadID: null
	        };
	        this.content = {
	            pages: [],
	            thread: []
	        };
	    }
	    ;
	    FourChanComponent.prototype.getBoard = function (board) {
	        var _this = this;
	        this.status.board = board;
	        // this._initStructure(10);
	        this.http.get("4chan/" + board, function (error, pages) {
	            if (error) {
	                return _this._errorHandler(error);
	            }
	            _this.content.pages = pages;
	        });
	    };
	    FourChanComponent.prototype.getThread = function (threadID) {
	        var _this = this;
	        this.status.threadID = threadID;
	        console.log("getThread()");
	        var board = this.status.board;
	        this.http.get("4chan/" + board + "/thread/" + threadID, function (error, thread) {
	            if (error) {
	                return _this._errorHandler(error);
	            }
	            console.log("it worked!");
	            _this.content.thread = thread["posts"];
	            console.log(_this.content.thread);
	        });
	    };
	    FourChanComponent.prototype._errorHandler = function (error) {
	        console.log("Error happened yo: " + error);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], FourChanComponent.prototype, "settings", void 0);
	    FourChanComponent = __decorate([
	        core_1.Component({
	            selector: "fourchan",
	            template: "\n        <thread [thread]=\"content.thread\"></thread>\n        <board [pages]=\"content.pages\" [settings]=\"settings\" class=\"board\"></board>\n    ",
	            styles: [__webpack_require__(616)],
	            directives: [board_component_1.BoardComponent, thread_component_1.ThreadComponent],
	            providers: [http_service_1.HttpService]
	        }), 
	        __metadata('design:paramtypes', [http_service_1.HttpService])
	    ], FourChanComponent);
	    return FourChanComponent;
	}());
	exports.FourChanComponent = FourChanComponent;


/***/ },

/***/ 609:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var http_1 = __webpack_require__(328);
	__webpack_require__(351);
	__webpack_require__(610);
	var HttpService = (function () {
	    function HttpService(http) {
	        this.http = http;
	    }
	    ;
	    HttpService.prototype.get = function (_path, cb) {
	        _path = 'http://localhost:3000/' + _path;
	        this.http.get(_path)
	            .map(function (res) {
	            return res.json();
	        })
	            .subscribe(function (data) { return cb(null, data); }, function (err) { return cb(err); });
	    };
	    HttpService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [http_1.Http])
	    ], HttpService);
	    return HttpService;
	}());
	exports.HttpService = HttpService;


/***/ },

/***/ 610:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }
	
	  return parts;
	}
	
	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};
	
	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;
	
	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();
	
	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }
	
	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }
	
	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)
	
	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');
	
	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};
	
	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';
	
	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');
	
	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }
	
	  return (isAbsolute ? '/' : '') + path;
	};
	
	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};
	
	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};
	
	
	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);
	
	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }
	
	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }
	
	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }
	
	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));
	
	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }
	
	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }
	
	  outputParts = outputParts.concat(toParts.slice(samePartsLength));
	
	  return outputParts.join('/');
	};
	
	exports.sep = '/';
	exports.delimiter = ':';
	
	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];
	
	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }
	
	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }
	
	  return root + dir;
	};
	
	
	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};
	
	
	exports.extname = function(path) {
	  return splitPath(path)[3];
	};
	
	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}
	
	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(611)))

/***/ },

/***/ 612:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var board_post_component_1 = __webpack_require__(613);
	var BoardComponent = (function () {
	    function BoardComponent() {
	        this.pages = [];
	        this.settings = {
	            autoload: true,
	            pageSize: 20
	        };
	        this.board = [];
	        this.threads = [];
	    }
	    ;
	    BoardComponent.prototype.ngAfterViewInit = function () {
	        // if (this.settings.autoload) this.getBoard("g");
	        this._initStructure(10);
	    };
	    ;
	    BoardComponent.prototype.handleClick = function () {
	        this._parse_pages();
	        this.createThreads(this.settings.pageSize);
	    };
	    // ngOnChanges( changes ) {
	    //     if (changes.hasOwnProperty('pages') && changes.pages.currentValue.length){
	    //         console.log(changes)
	    //         console.log(changes.pages.currentValue)
	    //         this._parse_pages()
	    //         this.createThreads(this.settings.pageSize);
	    //     }
	    // }
	    BoardComponent.prototype.createThreads = function (quantity) {
	        for (var i = 0; i < quantity; i++) {
	            console.log("createThreads");
	            var img = "https://i.4cdn.org/g/";
	            var threadObj = this.nextThread();
	            var thread = {
	                id: threadObj["no"], imgid: threadObj["tim"],
	                date: threadObj["now"], subtitle: threadObj["sub"] || "",
	                imgsrc: img + threadObj["tim"] + "s.jpg", com: threadObj["com"],
	                replyCount: threadObj["replies"], imgCount: threadObj["images"],
	                imgsrclarge: img + threadObj["tim"] + ".jpg"
	            };
	            this.board.push(thread);
	        }
	    };
	    BoardComponent.prototype.nextThread = function () {
	        if (this.threads.length) {
	            return this.threads.pop();
	        }
	        else {
	            console.log('No more pages.');
	            throw new Error('No more pages');
	        }
	    };
	    BoardComponent.prototype._parse_pages = function () {
	        console.log('_parse_pages()');
	        console.log(this.pages);
	        var threadList = [];
	        for (var pageObj in this.pages) {
	            console.log(pageObj);
	            if (this.pages.hasOwnProperty(pageObj)) {
	                var threads = this.pages[pageObj]["threads"];
	                for (var i = 0; i < threads.length; i++) {
	                    console.log(threads);
	                    console.log("Extracting thread " + i);
	                    threadList.push(threads[i]);
	                }
	            }
	        }
	        console.log(threadList);
	        this.threads = threadList;
	    };
	    BoardComponent.prototype._initStructure = function (count) {
	        if (count === void 0) { count = 10; }
	        this.board = [];
	        var placeholder = {
	            id: "placeholder",
	            class: "thread-loading",
	            subtitle: "Loading..."
	        };
	        for (var i = 0; i < count; i++) {
	            this.board.push(placeholder);
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], BoardComponent.prototype, "pages", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], BoardComponent.prototype, "settings", void 0);
	    BoardComponent = __decorate([
	        core_1.Component({
	            selector: "board",
	            template: "\n        <div>Board options component</div>\n        <input type=\"button\" (click)=\"handleClick()\" value=\"Click Me\">\n        <div class=\"scrollMe\">\n            <board-post\n                *ngFor=\"let thread of board\"\n                [thread]=\"thread\"\n                (click)=\"getThread(thread.id)\"\n                class=\"thread catalogue\"\n            ></board-post>\n        </div>\n    ",
	            styles: [__webpack_require__(946)],
	            directives: [board_post_component_1.BoardPostComponent]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], BoardComponent);
	    return BoardComponent;
	}());
	exports.BoardComponent = BoardComponent;


/***/ },

/***/ 613:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var BoardPostComponent = (function () {
	    function BoardPostComponent() {
	        this.thread = {};
	    }
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], BoardPostComponent.prototype, "thread", void 0);
	    BoardPostComponent = __decorate([
	        core_1.Component({
	            selector: "board-post",
	            template: "\n        <img src=\"{{ thread.imgsrc }}\">\n        <div class=\"thread-count\">\n            R: <b>{{ thread.replyCount }}</b>\n            I: <b>{{ thread.imgCount }}</b>\n        </div>\n        <div class=\"thread-op\">\n            <b  class=\"title\"\n                [innerHTML]=\"thread.subtitle\"\n            ></b>\n            <div\n                [innerHTML]=\"thread.com\"\n            ></div>\n        </div>\n    "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], BoardPostComponent);
	    return BoardPostComponent;
	}());
	exports.BoardPostComponent = BoardPostComponent;


/***/ },

/***/ 614:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var thread_post_component_1 = __webpack_require__(615);
	var ThreadComponent = (function () {
	    function ThreadComponent() {
	        this.thread = {};
	        this.loadingThread = false;
	    }
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], ThreadComponent.prototype, "thread", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], ThreadComponent.prototype, "loadingThread", void 0);
	    ThreadComponent = __decorate([
	        core_1.Component({
	            selector: "thread",
	            template: "\n        <spinner\n            [class.active]=\"loadingThread\"\n        ></spinner>\n        <div\n            class=\"background\"\n            [class.fadeIn]=\"loadingThread\"\n        ></div>\n        <div\n            class=\"scrollable\"\n            @threadState=\"thread.length != 0\"\n        >\n            <thread-post\n                *ngFor=\"let post of thread\"\n                [post]=\"post\"\n            ></thread-post>\n        </div>\n\t",
	            directives: [thread_post_component_1.ThreadPostComponent],
	            animations: [
	                core_1.trigger('threadState', [
	                    core_1.state('inactive', core_1.style({
	                        top: "100%"
	                    })),
	                    core_1.state('active', core_1.style({
	                        top: "0"
	                    })),
	                    core_1.transition('inactive => active', core_1.animate('400ms ease-in'))
	                ])
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ThreadComponent);
	    return ThreadComponent;
	}());
	exports.ThreadComponent = ThreadComponent;


/***/ },

/***/ 615:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var ThreadPostComponent = (function () {
	    function ThreadPostComponent() {
	        this.post = {};
	    }
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], ThreadPostComponent.prototype, "post", void 0);
	    ThreadPostComponent = __decorate([
	        core_1.Component({
	            selector: "thread-post",
	            template: "\n        <div class=\"post-info\">\n            <span *ngIf=\"post.sub\">{{post.sub}}</span>\n            <span>{{post.name}}</span>\n            <span>{{post.now}}</span>\n            <span>No.{{post.no}}</span>\n        </div>\n        <blockquote [innerHtml]=\"post.com\"></blockquote>\n    "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ThreadPostComponent);
	    return ThreadPostComponent;
	}());
	exports.ThreadPostComponent = ThreadPostComponent;


/***/ },

/***/ 616:
/***/ function(module, exports) {

	module.exports = "@font-face {\n  font-family: \"Roboto-Medium\";\n  src: url(\"../fonts/Roboto-Medium.ttf\"); }\n\n@font-face {\n  font-family: \"Montserrat-Bold\";\n  src: url(\"../fonts/Montserrat-Bold.ttf\"); }\n\npages > * {\n  display: none; }\n\n.active {\n  z-index: 1;\n  display: initial !important; }\n\n.thread {\n  display: block;\n  overflow: hidden; }\n\n.board {\n  width: 100vw;\n  margin: 0 auto;\n  position: relative;\n  top: 100px; }\n  .board .container {\n    text-align: center;\n    height: calc(100vh - 70px) !important;\n    width: 100% !important; }\n  .board .quote {\n    color: #E9EBED !important; }\n\n.catalogue {\n  display: inline-block;\n  width: 155px;\n  height: 320px;\n  margin: 5px 10px 20px;\n  padding: 5px;\n  padding-bottom: 3px;\n  text-align: center;\n  border-radius: 4px;\n  transition: box-shadow 0.3s;\n  cursor: pointer; }\n  .catalogue::before {\n    content: \"\";\n    border-top: #b73229 solid 2px;\n    width: 0;\n    transition: width 0.4s ease-out;\n    position: relative; }\n  .catalogue:hover::before {\n    width: 100%; }\n  .catalogue img {\n    display: inline;\n    min-width: 50px;\n    max-width: 150px;\n    min-height: 50px;\n    max-height: 150px; }\n  .catalogue .thread-count {\n    font-size: 12px;\n    text-align: center; }\n  .catalogue .thread-op {\n    display: block;\n    padding: 0 15px;\n    font-size: 12px; }\n    .catalogue .thread-op b.title {\n      display: block;\n      font-family: \"Montserrat-Bold\";\n      font-weight: 500;\n      margin-bottom: 10px; }\n"

/***/ },

/***/ 946:
/***/ function(module, exports) {

	module.exports = "@font-face {\n  font-family: \"Roboto-Medium\";\n  src: url(\"../fonts/Roboto-Medium.ttf\"); }\n\n@font-face {\n  font-family: \"Montserrat-Bold\";\n  src: url(\"../fonts/Montserrat-Bold.ttf\"); }\n\npages > * {\n  display: none; }\n\n.active {\n  z-index: 1;\n  display: initial !important; }\n\n.thread {\n  display: block;\n  overflow: hidden; }\n\n.board {\n  width: 100vw;\n  margin: 0 auto;\n  position: relative;\n  top: 100px; }\n  .board .container {\n    text-align: center;\n    height: calc(100vh - 70px) !important;\n    width: 100% !important; }\n  .board .quote {\n    color: #E9EBED !important; }\n\n.catalogue {\n  display: inline-block;\n  width: 155px;\n  height: 320px;\n  margin: 5px 10px 20px;\n  padding: 5px;\n  padding-bottom: 3px;\n  text-align: center;\n  border-radius: 4px;\n  transition: box-shadow 0.3s;\n  cursor: pointer; }\n  .catalogue::before {\n    content: \"\";\n    border-top: #b73229 solid 2px;\n    width: 0;\n    transition: width 0.4s ease-out;\n    position: relative; }\n  .catalogue:hover::before {\n    width: 100%; }\n  .catalogue img {\n    display: inline;\n    min-width: 50px;\n    max-width: 150px;\n    min-height: 50px;\n    max-height: 150px; }\n  .catalogue .thread-count {\n    font-size: 12px;\n    text-align: center; }\n  .catalogue .thread-op {\n    display: block;\n    padding: 0 15px;\n    font-size: 12px; }\n    .catalogue .thread-op b.title {\n      display: block;\n      font-family: \"Montserrat-Bold\";\n      font-weight: 500;\n      margin-bottom: 10px; }\n"

/***/ }

});
//# sourceMappingURL=app.bundle.map