import * as functions from 'firebase-functions';
import got from 'got';

export const corsProxy = functions.handler.https.onRequest( async (req, res) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
    res.header('Access-Control-Allow-Headers', req.header('access-control-request-headers'));

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.send();
    } else {
        const url = req.params && req.params[0];
        if (!url) { 
            res.status(400).json({ 'message': 'Missing parameters' }); 
            res.end();
        } else {
            (await got.get(`${url}`)).pipe(res);
        }
    }

});
