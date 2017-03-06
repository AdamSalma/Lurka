import fs from 'fs'
import path from 'path'
import util from 'util'

export function writeObjToRoot (_path, obj) {
    _path = path.join(global.app_root, _path)
    fs.writeFile(_path, util.inspect(obj), (err) => {
        if (err) {
            log.error('Async write failed at path:', _path)
        } else {
            log.info('Written file:', _path)
        }
    })
}

export function printObj (obj) {
    console.log(util.inspect(obj))
}
