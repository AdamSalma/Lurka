import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class BoardService {
	constructor( private _http: Http ) { };

	get4chan(pagenumber: number, callback): Observable<any> {
		return this._http.get('https://a.4cdn.org/g/catalog.json')
			.map(res => res.json)
	}
}

