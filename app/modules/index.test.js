import glob from 'glob'
import path from 'path'

describe("Containers", () => {
    glob.sync('**/index.suite.*', {
        cwd: __dirname, absolute: true
    }).map(suite => {
        console.error(suite)
        require(suite).default();
    })
})
