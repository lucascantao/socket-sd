const http = require('http');
const express = require('express');
const app = express();

const servidorHttp = http.createServer(app);

const io = require('socket.io')(servidorHttp, {
    cors: {
        origin: '*'
    }
});

const mensagens = []

let clients = []

// ao se conectar no servidor
io.on('connection', (socket) => {
    console.log('Um usuário conectou.', socket.handshake.headers.origin);
    console.log()

    // atualizar a lista de mensagens no client
    io.emit('mensagens', mensagens);
    // atualizar a lista de conectados no client
    io.emit('update clients', clients);

    socket.on('join_request', (client) => {

        //busca cliente
        const local_client = clients.find( c => c.name === client.name );

        // atualizar lista de conectados no back
        if(local_client !== undefined) {
            local_client.id = socket.id;
            local_client.icon = client.icon;
        } else {
            clients.push(
                {
                    id: socket.id,
                    icon: client.icon,  
                    name: client.name
                }
            );
        }
        // atualizar a lista de conectados no client
        io.emit('update clients', clients);

    });

    socket.on('nova mensagem', (mensagem) => {
        const client = clients.find(client => client.id === socket.id);

        if(client === undefined) {
            return
        }

        const novaMensagem = { name:client.name, socket: socket.id, content: mensagem };
        mensagens.push(novaMensagem);
        io.emit('mensagens', mensagens);
    });
    
    // ao se desconectar
    socket.conn.on('close', (reason) => {
        
        // remover da lista de cientes
        clients = clients.filter((client) => client.id !== socket.id);

        // atualizar informações no front
        io.emit('update clients', clients);
    });

});

app.use(express.static('public'));

servidorHttp.listen(3000); 

// ip definido a partir do ipv4 da rede, possibilitando o acesso em qualquer outro dispositivo conectado na mesma rede

// socket: meio de comunicação entre 2 canais