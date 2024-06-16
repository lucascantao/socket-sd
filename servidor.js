const http = require('http');
const express = require('express');
const app = express();

const servidorHttp = http.createServer(app);

const io = require('socket.io')(servidorHttp, {
    cors: {
        origin: '*'
    }
});

const objects = [
    {
        id: 'door',
        socket: '',
        icon: 'Stelle'
    }
]

let connected = []

// ao se conectar no servidor
io.addListener('connection', (socket) => {
    console.log('Um usuário conectou.')

    // atualizar lista de conectados no back
    const client_id = socket.id;
    connected.push(client_id);
    
    // atualizar a lista de conectados no client
    io.emit('update connected', connected);

    // atualizar a lista de objetos no client
    io.emit('objects', objects);

    // ao se desconectar
    socket.conn.on('close', (reason) => {
        
        // remover da lista de cientes
        connected = connected.filter((id) => id !== client_id);
        
        // remover da lista de objetos
        objects.forEach(obj => {
            if(obj.socket === socket.id) {
                obj.socket = '';
            }
        });

        // atualizar informações no front
        io.emit('objects', objects);
        io.emit('update connected', connected);
    });

    
    socket.addListener('bind', (bindObject) => {

        const object = objects.find( obj => obj.id === bindObject.id );

        console.log(object)

        if(object !== undefined) {
            object.socket = socket.id;
            object.icon = bindObject.icon
            console.log(`bind ${socket.id} to ${bindObject.id}`);      
        } else  {
            objects.push(
                {
                    id: bindObject.id,
                    socket: socket.id,
                    icon: bindObject.icon
                }
            );
            console.log(`bind ${socket.id} to ${bindObject.id}`);
        }
        
        io.emit('objects', objects);
    });

    // socket.addListener('nova mensagem', (msg) => {
    //     io.emit('nova mensagem', msg);        
    // });
});

app.use(express.static('public'));

servidorHttp.listen(3000); 

// ip definido a partir do ipv4 da rede, possibilitando o acesso em qualquer outro dispositivo conectado na mesma rede

// socket: meio de comunicação entre 2 canais