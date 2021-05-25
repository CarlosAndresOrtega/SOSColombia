"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var http = require('http');
var server = http.createServer(app);
var socket_io_1 = require("socket.io");
var io = new socket_io_1.Server(server);
var path = require('path');
var port = 3000;
// Carga de variables de entorno en el archivo .env
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://localhost:27017/chat-users', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function () {
    console.log("Connected to MongoDB > api");
});
// Configuración de middlewares requeridos para la lectura de peticiones
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
//Servidor de sockets
//Servidor Web
app.use('/node_modules', express_1.default.static(path.join(__dirname, '..', 'node_modules')));
app.use('/public', express_1.default.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
});
app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/public/views/login.html');
});
app.get('/register', function (req, res) {
    res.sendFile(__dirname + '/public/views/register.html');
});
var users = {};
io.on('connection', function (Socket) {
    users[Socket.id] = { username: "" };
    io.emit('username-update', users);
    // console.log(`El ususuario ${Socket.id} se ha conectado`);
    Socket.on('username-update', function (username) {
        users[Socket.id].username = username;
        console.log(users);
        io.emit('username-update', users);
    });
    Socket.on('disconnect', function () {
        delete users[Socket.id];
        io.emit('user-disconnected', Socket.id);
    });
    Socket.on('publish-msg', function (msg) {
        if (msg.channel == "all") {
            io.emit('published-msg', msg);
        }
        else {
            io.to(msg.channel).emit('published-msg', msg);
        }
    });
});
server.listen(port, function () {
    return console.log("server is listening on http://localhost:" + port);
});
