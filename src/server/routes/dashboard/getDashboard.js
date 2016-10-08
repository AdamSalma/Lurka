import { createReadStream } from 'fs';
import { join } from 'path';

export default function (req, res, next) {
    if (req.xhr) return next();
    console.log(`Streaming dashboard from ${global.app_root}`);
    let index = join(global.app_root, 'app.html');
    createReadStream(index).pipe(res);
}