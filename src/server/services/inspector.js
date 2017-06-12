import fs from 'fs'
import path from 'path'
import util from 'util'

export function writeObjToRoot (filepath, obj) {
    filepath = path.join(clientRoot, filepath)
    fs.writeFile(filepath, util.inspect(obj), (err) => {
        if (err) {
            log.error('Async write failed at path:', filepath)
        } else {
            log.info('Written object to filepath:', filepath)
        }
    })
}

export function printObj (obj) {
    console.log(util.inspect(obj))
}
