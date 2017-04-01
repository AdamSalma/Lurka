import fs from 'fs';
import path from 'path';

export default function (req, res, next) {
    if (req.xhr) // if not ajax
        return next();

    log.app(`Streaming dashboard from ${global.app_root}`);
    fs.createReadStream(
        path.join(global.app_root, 'index.html')
    ).pipe(res);
}
