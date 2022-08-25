// function waithide() {
//     const objeto = document.querySelector(".sidebar");
//     objeto.style.opacity = '0';
//     setTimeout(function removethis() {
//         objeto.style.display = 'none';
//     }, 300);
// }

function rolagemAutomática() {

    const elementoQueQueroQueApareca = document.querySelector('.console li:last-child');

    elementoQueQueroQueApareca.scrollIntoView();

}

atualizarMensagem();

function atualizarMensagem() {

    setInterval(buscarMensagens, 3000);

}

buscarMensagens();

function buscarMensagens() {

    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promessa.then(renderizarMensagens);
    promessa.catch(telaErro);

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

function telaErro(erro) {

    console.log(erro.response.status);

}