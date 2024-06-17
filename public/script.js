const socket = io('localhost:3000');

socket.on('connect', () => {
    $('#myId span').text(socket.id);
});

socket.addEventListener('update clients', (clients) => {
    $('#clients').empty()
    clients.forEach((client) => {
        $('#clients').append(`
            <div class="client-item"> 
                <img class="client-item-icon" src="./assets/icons/${client.icon}.png"></img> 
                <div>
                    <div class="client-item-name">${client.name}</div> 
                    <div class="client-item-id" >#${client.id}</div> 
                </div>
            </div>`);
    });
});

socket.addEventListener('mensagens', (mensagens) => {

    $('#mensagens').empty();
    mensagens.forEach(msg => {

        if(socket.id === msg.socket){
            $('#mensagens').append(
                `<div class="mensagem-item user">
                    <i class="socket">${msg.name}</i>
                    <i class="content">${msg.content}</i>
                </div>`
            )    
        } else {
            $('#mensagens').append(
                `<div class="mensagem-item">
                    <i class="socket">${msg.name}</i>
                    <i class="content">${msg.content}</i>
                </div>`
            )
        }

    })
})

$('#enviarMensagem').on('click', () => {
    const content = $('#mensagemContent').val();
    if(content === ''){
        alert('a mensagem não pode ser vazia');
    } else {
        socket.emit('nova mensagem', (content));
    }
})

$('#join_button').on('click', () =>{
    const name = $('#join_name').val();
    const icon = $('#join_icon').val();
    socket.emit('join', (
        {
            name: name,
            icon: icon
        }
    ));
})