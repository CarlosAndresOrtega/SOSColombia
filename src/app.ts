import express from 'express';
import UserService from './public/services/UserService';
import UserController from './public/ts/UserController';
const app = express();

const http = require('http');
const server = http.createServer(app);
import { Server, Socket } from 'socket.io';
const io = new Server(server);
const path = require('path');
const port = 3000;

// Carga de variables del mongodb

import mongoose from "mongoose";
mongoose.connect('mongodb://localhost:27017/chat-users', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log("Connected to MongoDB > chat-users");
});

const User = require("./public/models/UserSchema");

// Configuración de middlewares requeridos para la lectura de peticiones
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Servidor de sockets

//Servidor Web
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/views/login.html');
});
app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/public/views/index.html');
});
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/views/register.html');
});

const users: any = {}
io.on('connection', (Socket) => {

  users[Socket.id] = { username: "" };
  io.emit('username-update', users);

  // console.log(`El ususuario ${Socket.id} se ha conectado`);
  Socket.on('prueba-enviada', (texto: string) => {
    // console.log(users);
    io.emit('prueba-realizada', texto);
  });
  Socket.on('username-update', (username: string) => {
    users[Socket.id].username = username;
    console.log(users);
    io.emit('username-update', users);
  });
  Socket.on('disconnect', () => {
    delete users[Socket.id];
    io.emit('user-disconnected', Socket.id);
  });
  Socket.on('publish-msg', async (msg: { autor: string, content: string, channel: string }) => {
    if (msg.channel == "all") {
      const resultado = await UserController.añadir_msg(msg, users);
      io.emit('published-msg', msg);
    } else {
      const resultado = await UserController.añadir_msg(msg,users);
      io.to(msg.channel).emit('published-msg', msg);  
    }
  });

  Socket.on('register-user', async (data: { Username: string, name: string, lname: string, email: string, password: string, idSocket: string}) => {

    // console.log({users});
    const id= Socket.id;
    data.idSocket= id;
    const resultado = await UserController.registar(data);
    console.log({ resultado });

    // console.log("este es el id si hay conexion", Socket.id);
    if(resultado?.msg=="El usuario ya esta registrado"){ 
      Socket.emit('error', resultado.msg);
    }else{
      Socket.emit('registered', data.Username);
    }

  });
  Socket.on('validar-login', async (data:{Username:String,Password:String})=>{
    console.log({data});
    const id= Socket.id;
    console.log("Este es el id del socket",id);
    
    const resultado = await UserController.login(data, id);
    if(resultado?.msg=="Usuario encontrado"){ 
      Socket.emit('validado', data.Username);
    }else{
      Socket.emit('error-login', resultado?.msg);
    }
  });
  Socket.on('id-nuevo',async(user:string)=>{
    console.log("estamos en el id nuevo");
    const resultado = await UserController.id_actualizado(user,Socket.id);

    if(resultado?.msg=="Usuario actualizado"){
      Socket.emit('borrar-local', user);
    }
    
  });

})

server.listen(port, () => {
  return console.log(`server is listening on http://localhost:${port}`);
});

