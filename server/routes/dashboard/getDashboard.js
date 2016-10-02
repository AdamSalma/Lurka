export default function (req, res, next) {
	console.log("Sending dashboard")
	console.log(__dirname)
	console.log(process.env.PWD)
	console.log(global.root)
	console.log("")
    res.sendFile('index.html', { root: global.root });
    res.end();
}