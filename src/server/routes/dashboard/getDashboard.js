import { createReadStream } from 'fs';
import { join } from 'path';

export default function (req, res, next) {
    if (req.xhr) return next();  // if not ajax
    log.app(`Streaming dashboard from ${global.app_root}`);
    let index = join(global.app_root, 'index.html');
    createReadStream(index).pipe(res);
}