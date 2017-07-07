import fs from 'fs';
import path from 'path';

export default function (req, res, next) {
    if (req.xhr) {
        // if not ajax
        return next();
    }

    log.app(`Streaming dashboard from ${clientRoot}`);

    fs.createReadStream(
        path.join(clientRoot, '/UI/index.html')
    ).pipe(res);
}
