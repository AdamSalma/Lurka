import { Injectable } from "@angular/core";

import { Http, Headers, HTTP_BINDINGS } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'path';

@Injectable()
export class HttpService{
	constructor(public http : Http){};

	get(_path, cb) {
		_path = 'http://localhost:3000/' + _path
		this.http.get(_path)
            .map( (res) => {
            	return res.json()
            })
            .subscribe(
            	data => cb(null, data),
            	err => cb(err)
            )
	}
}
