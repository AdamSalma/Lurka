import { Injectable } from "@angular/core";

@Injectable()
export class HelperService {
    constructor() {};
    sanitiseHTML(html: string): string {
        console.log("Sanitizing " + html)
        return document.createTextNode(html).data;
    }

    errorHandler(error) {
        // Initial handling
        console.warn(`Error happened: ${error}`);
    }
}
