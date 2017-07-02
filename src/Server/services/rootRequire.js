import path from 'path'

const serverRoot = path.join(__dirname, '..')

export default function(_path) {
    return require(path.join(serverRoot, _path))
}
