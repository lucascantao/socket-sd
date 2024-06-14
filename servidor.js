const http = require('http');
const express = require('express');
const app = express();

const servidorHttp = http.createServer(app);

const io = require('socket.io')(servidorHttp, {
    cors: {
        origin: '*'
    }
});


const regist = {
    id: 'door',
    state: 'open'
}


const connected = []



io.addListener('connection', (socket) => {
    console.log('Um usuário conectou.')

    const client_id = socket.id;

    connected.push(client_id);
    
    io.emit('regist', regist);

    io.emit('update connected', connected);

    // socket.addListener('nova mensagem', (msg) => {
    //     io.emit('nova mensagem', msg);        
    // });
});

app.use(express.static('public'));

servidorHttp.listen(3000); 

// ip definido a partir do ipv4 da rede, possibilitando o acesso em qualquer outro dispositivo conectado na mesma rede

// socket: meio de comunicação entre 2 canais