const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(1001); 

// ip definido a partir do ipv4 da rede, possibilitando o acesso em qualquer outro dispositivo conectado na mesma rede

// socket: meio de comunicação entre 2 canais