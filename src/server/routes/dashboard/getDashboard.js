import { createReadStream } from 'fs';
import { join } from 'path';

export default function (req, res, next) {
    if (req.xhr) return next();
    console.log("Sending dashboard");
    let app = join(global.app_root, 'app.html');
    createReadStream(app).pipe(res);
}