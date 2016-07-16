import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class BoardService {
	constructor( public http: Http ) { };

	get4chan(): Observable<any> {
		return this.http.get('https://a.4cdn.org/g/catalog.json')
						.map( res => res.json )
	};
}

