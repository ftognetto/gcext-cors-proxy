import * as functions from "firebase-functions";
import got from 'got';

export const corsProxy = functions.handler.https.onRequest( async (req, res) => {

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.set('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
        res.end();
    } else {
        const url = req.params && req.params[0];
        if (!url) { 
            res.status(400).json({ 'message': 'Missing parameters' }); 
            res.end();
        } else {
            const response = await got.get(`${url}`);
            res.status(200).send(response.body);
            res.end();
        }
    }

});
