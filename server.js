const http = require('http');
const app = require('./app');

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
        case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
        default:
        throw error;
    }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);

const express = require('express');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://lusky75:iiluskyii75@cluster0.tbkc4.mongodb.net/test?retryWrites=true&w=majority';

MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        return console.log("error1:" . err);
    }

    console.log(`MongoDB Connected: ${url}`);
    const db = client.db('test');

    const courses = db.collection('test');
    courses.insertOne({ name: 'Charlotte' }, (err, result) => { 
        if (err) {
            return console.log("error:". err);
        }
        console.log(`MongoDB Connected: ${result.acknowledged}`)
    });
});

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send('Helloo world !!');
});

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});
