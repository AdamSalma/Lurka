import { Injectable } from "@angular/core";

@Injectable()
export class HelperService {
    constructor(public http: Http) {};

    sanitiseHTML(html: string): string {
        return document.createTextNode(html).data
    }
}
