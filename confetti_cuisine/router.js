const httpStatus = require('http-status-codes'),
 contentTypes = require('./content-types.js'),
 utils = require('./utils.js');

const routes = {
    "GET": {},
    "POST": {}
}

exports.handle = (req, resp) => {
    try {
        console.log(`Received request with path: ${req.url}`);
        routes[req.method][req.url](req, resp);
    } catch (e) {
        resp.writeHead(httpStatus.OK, contentTypes.html);
        utils.getFile('views/error.html', resp);
    }
};

exports.get = (url, action) => {
    routes["GET"][url] = action;
}

exports.post = (url, action) => {
    routes["POST"][url] = action;
}