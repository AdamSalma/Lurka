import { app, ipcMain, ipcRenderer } from 'electron';
import http from "http"
import crypto from "crypto"

export default function createServer(port) {
    var server = http.createServer(function (req, res) {
        var port = crypto.randomBytes(16).toString("hex");
        ipcMain.once(port, function (ev, status, head, body) {
            console.log(status, head, body);
            res.writeHead(status, head);
            res.end(body);
        });
    });

    server.listen(8000);
    console.log("http://localhost:8000/");
}
