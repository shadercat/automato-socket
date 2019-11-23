const express = require('express');
const Paths = require('./Constants/Paths');
const Options = require('./Constants/Options');
const mongoose = require('mongoose');
const MacLog = require('./db/models/machineLogModel');
const db = mongoose.connect(Paths.databaseURL, Options.databaseConnection).then((res) => {
    console.log("connect to mongo - success");
}).catch((err) => {
    console.log("connect to mongo - fail");
    console.log(err);
});


const app = express();

server = app.listen(Options.listeningPort, () => {
    console.log('server is starting at port: ' + Options.listeningPort);
});

const watchStream = MacLog.watch();
watchStream.on('change', (change) => {
    console.log(change); // You could parse out the needed info and send only that data.
    //io.emit('changeData', change);
});


const io = require('socket.io')(server);
io.on('connection', function () {
    console.log('connected');
});
