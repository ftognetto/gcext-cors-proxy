"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsProxy = void 0;
const functions = require("firebase-functions");
const got_1 = require("got");
exports.corsProxy = functions.handler.https.onRequest(async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
    res.header('Access-Control-Allow-Headers', req.header('access-control-request-headers'));
    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.send();
    }
    else {
        let url = req.params && req.params[0];
        if (!url) {
            res.status(400).json({ 'message': 'Missing parameters' });
            res.end();
        }
        else {
            if (url.startsWith('/')) {
                url = url.slice(1);
            }
            url = decodeURI(url);
            console.log(`Requested ${url}`);
            const response = await got_1.default.get(`${url}`);
            res.status(200).send(response.body);
            res.end();
        }
    }
});
//# sourceMappingURL=index.js.map