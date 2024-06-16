// const botaoEnviar = document.getElementById('enviar');
// const caixaDeMensagem = document.getElementById('texto');
// const chat = document.getElementById('mensagens');

const socket = io('localhost:3000');

socket.on('connect', () => {
    $('#myId span').text(socket.id);
});

socket.addEventListener('objects', (objects) => {
    $('#objects').empty();
    objects.forEach(obj => {
        $('#objects').append(
            `<div class="object-item">
            <img src="./assets/icons/${obj.icon}.png"></img>
            <i class="id">${obj.id}</i>
            <i class="socket">${obj.socket}</i>
            </div>`
        )
    })
})

socket.addEventListener('update connected', (connected) => {
    $('#connected').empty()
    connected.forEach((c, i) => {
        $('#connected').append(`<div class="client-item"> <div class="client-item-id">${i}</div> <div class="client-item-value" >${c}</div> </div>`);
    });
});


$('#bind').on('click', () =>{
    const id = $('#objectId').val();
    const icon = $('#icon').val();
    socket.emit('bind', (
        {
            id: id,
            icon: icon
        }
    ));
})