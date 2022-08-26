//declaração de variáveis===========================================

let usuario = "";
let para = "";
let texto = "";
let tipo = "";

//código das funções================================================
function loginUsuario() {

    usuario = prompt("Qual o seu nome?")

    const objetoUsuario = {
        name: usuario
    };
    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ", objetoUsuario);
    promessa.then(loginCorreto);
    promessa.catch(loginErro);
}

function loginCorreto() {
    console.log("Login OK");

    buscarMensagens();
}

function loginErro() {
    console.log("Login ERRO");
    loginUsuario();
}

function atualizarMensagem() {

    setInterval(buscarMensagens, 1000);

}

function buscarMensagens() {

    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promessa.then(renderizarMensagens);
    promessa.catch(buscarMensagensErro);

}

function buscarMensagensErro(erro) {

    console.log(erro.response.status);

}

function renderizarMensagens(resposta) {

    let consoleMensagens = document.querySelector(".console");
    consoleMensagens.innerHTML = ``;

    for (let i = 0; i < resposta.data.length; i++) {
        if (resposta.data[i].type === "status") {
            consoleMensagens.innerHTML += `
            <li class="status caixa">
            <time>(${resposta.data[i].time})</time>
            <span class="usuario emissor">${resposta.data[i].from}</span>
            <span data-status="entrou">${resposta.data[i].text}</span>
             </li>
             `

        }

        if (resposta.data[i].type === "message") {
            consoleMensagens.innerHTML += `
            <li class="publica caixa">
            <time>(${resposta.data[i].time})</time>
            <span class="usuario emissor">${resposta.data[i].from}</span>
            <span>para</span>
            <span class="usuario alvo">${resposta.data[i].to}:</span>
            <output class="mensagem">${resposta.data[i].text}</output>
            </li>
            `
        }

        if (resposta.data[i].type === "private_message") {
            consoleMensagens.innerHTML += `
            <li class="reservada caixa">
            <time datetime="09:21:45">(${resposta.data[i].time})</time>
            <span class="usuario emissor">${resposta.data[i].from}</span>
            <span>reservadamente para</span>
            <span class="usuario alvo">${resposta.data[i].to}:</span>
            <output class="mensagem">${resposta.data[i].text}</output>
            </li>
            `
        }
    }
    rolagemAutomática();
}

function rolagemAutomática() {

    const elementoQueQueroQueApareca = document.querySelector('.console li:last-child');

    elementoQueQueroQueApareca.scrollIntoView();

}

function manterSeLogado() {
    const objetoUsuario = {
        name: usuario
    };

    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", objetoUsuario);
    promessa.then(conexaoAtualizada);
    promessa.catch(conexaoPerdida);
}

function conexaoAtualizada(resposta) {
    console.log("Conexão Atualizada");
}

function conexaoPerdida(resposta) {
    console.log("Conexão Perdida");
}

function enviaMensagem() {

    const elementoMensagem = document.querySelector('#digite');
    console.log(elementoMensagem.value);
    const objetoMensagem = {
        from: usuario,
        to: "Todos",
        text: elementoMensagem.value,
        type: "message",
    }
    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", objetoMensagem);
    promessa.then(enviaMensagemCorreto);
    promessa.catch(enviarMensagemErro);
    elementoMensagem.value = '';
}

function enviaMensagemCorreto(resposta) {
    console.log("Envio ok!");
}

function enviarMensagemErro(erro) {
    console.log("Envio erro!")
}

function envioEnter(i) {
    if (i.key === "Enter") {
        enviaMensagem()
    }
}
//chamando funções =================================================
loginUsuario();
atualizarMensagem();
setInterval(manterSeLogado, 5000);


//ações=============================================================
document.addEventListener("keypress", envioEnter);