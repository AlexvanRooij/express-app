const express = require('express');
const app = express();
const http = require('http');
const router = express.Router();
const log = require('pretty-log');
const session = require('express-session');


app.set('view engine', 'ejs');

function logEvent(req, res, next) {
    log.debug(new Date(), req.method, req.url);
    next();
}

function listUsers(req, res, next) {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write('{"users":[{"name": "Piet"},{"name": "Jan"},{"name": "Marie"}]}');
    res.end();
}

function addUser(req, res, next) {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write('{"msg":"user added"}');
    res.end();
}
app.get('/', logEvent, (req, res) => {
    const data = {
        message: 'Hello, Express with EJS!',
    };

    res.render('index', data);
});

app.get('/users/', logEvent, listUsers);
app.post('/users/', logEvent, addUser);

http.createServer(app).listen(3000, function () {
    log.success('Server has started!');
});
