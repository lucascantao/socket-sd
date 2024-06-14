const botaoEnviar = document.getElementById('enviar');
const caixaDeMensagem = document.getElementById('texto');
const chat = document.getElementById('mensagens');

const socket = io('localhost:3000');

botaoEnviar.addEventListener('click', () => {
    if(caixaDeMensagem.value !== "") {
        socket.emit('nova mensagem', caixaDeMensagem.value);
        caixaDeMensagem.value = "";
    }
});

socket.addEventListener('nova mensagem', (msg) => {
    const elementoMensagem = document.createElement('li') // cria uma tag <li></li>
    elementoMensagem.textContent = msg;
    elementoMensagem.classList.add('mensagem'); // define uma class <li class='mensagem'>mensagem</li>
    chat.appendChild(elementoMensagem); // <div id='mensagens'><li class='mensagem'></li></div>
});