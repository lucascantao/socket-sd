const botaoEnviar = document.getElementById('enviar');
const caixaDeMensagem = document.getElementById('texto');
const chat = document.getElementById('mensagens');

const socket = io('localhost:3000');

socket.on('connect', () => {
    $('#myId span').text(socket.id);
});

socket.addEventListener('regist', (regist) => {
    $('.id').text(regist.id);
    $('.state').text(regist.state);
})

socket.addEventListener('update connected', (connected) => {
    $('#connected').empty()
    connected.forEach((c, i) => {
        $('#connected').append(`<div class="client-item"> <div class="client-item-id">${i}</div> <div class="client-item-value" >${c}</div> </div>`);
    });
});