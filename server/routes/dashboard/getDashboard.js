export default function (req, res, next) {
    res.sendFile('index.html', { root: global.root });
    res.end();
}