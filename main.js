const MAXIMO_TENTATIVAS = 5;

window.onload = function() {
    if (!sessionStorage['cont']) {
        sessionStorage.setItem('cont', 0);
    }
    
    validarTentativas();
    carregarMassa();
    document.getElementById('cont').innerText = sessionStorage['cont'];
}

function gerar() {
    var botaoGerar = document.getElementById('gerar');
    botaoGerar.setAttribute('disabled', '');
    
    if (!validarTentativas()) {
        return;
    }

    var opcoes = {
        "oleo": 0,
        "massa": 0,
        "molho": 0,
        "ingredientes": []
    };

    botaoGerar.innerText = 'Massa gerada!';

    opcoes.oleo = numeroAleatorio(1, 2);
    opcoes.massa = numeroAleatorio(1, 3);
    opcoes.molho = numeroAleatorio(1, 3);
    for (let i = 1; i <= 10; i++) {
        opcoes.ingredientes.push(numeroAleatorio(1, 20));
    }

    setTimeout(() => {
        botaoGerar.removeAttribute('disabled');
        botaoGerar.innerText = 'Gerar';
        validarTentativas();
    }, 2000);

    sessionStorage['cont'] = Number(sessionStorage['cont']) + 1;
    document.getElementById('cont').innerText = sessionStorage['cont'];

    salvarUltimaMassa(opcoes);
    carregarMassa();
    validarTentativas();
}

function validarTentativas() {
    var botaoGerar = document.getElementById('gerar');
    if (sessionStorage['cont'] == MAXIMO_TENTATIVAS) {
        botaoGerar.setAttribute('disabled', '');
        botaoGerar.innerText = 'Tentativas esgotadas!';
        return false;
    }
    return true;
}

function numeroAleatorio(min, max) {
    return Math.floor((Math.random() * max) + min);
}

function obterMassa(codigo) {
    switch (codigo) {
        case 1:
            return 'Penne';
        case 2:
            return 'Espaguete';
        case 3:
            return 'Talharim';
    }
}

function obterMolho(codigo) {
    switch (codigo) {
        case 1:
            return 'Vermelho';
        case 2:
            return 'Branco';
        case 3:
            return 'Misto';
    }
}

function obterIngrediente(codigo) {
    var ingrediente;
    switch (codigo) {
        case 1:
            ingrediente = 'Milho';
            break
        case 2:
            ingrediente = 'Bacon';
            break;
        case 3:
            ingrediente = 'Carne moída';
            break;
        case 4:
            ingrediente = 'Brócolis';
            break;
        case 5:
            ingrediente = 'Muçarela';
            break;
        case 6:
            ingrediente = 'Cebola';
            break;
        case 7:
            ingrediente = 'Alcaparra';
            break;
        case 8:
            ingrediente = 'Salsicha';
            break;
        case 9:
            ingrediente = 'Alho';
            break;
        case 10:
            ingrediente = 'Queijo minas';
            break;
        case 11:
            ingrediente = 'Linguiça toscana';
            break;
        case 12:
            ingrediente = 'Cenoura';
            break;
        case 13:
            ingrediente = 'Peito de peru';
            break;
        case 14:
            ingrediente = 'Azeitona';
            break;
        case 15:
            ingrediente = 'Presunto';
            break;
        case 16:
            ingrediente = 'Tomate';
            break;
        case 17:
            ingrediente = 'Ovo';
            break;
        case 18:
            ingrediente = 'Palmito';
            break;
        case 19:
            ingrediente = 'Gorgonzola';
            break;
        case 20:
            ingrediente = 'LIVRE';
            break;
        default:
            ingrediente = 'ERRO';
            break;
    }

    return ingrediente;
}

function carregarMassa() {
    if (!sessionStorage['ultimaMassa']) {
        document.getElementById('ingredientes').style.listStyle = 'none';
        return;
    }

    var opcoes = JSON.parse(sessionStorage['ultimaMassa']);
    document.getElementById('oleo').innerText = opcoes.oleo == 1 ? 'Azeite' : 'Manteiga';
    document.getElementById('massa').innerText = obterMassa(opcoes.massa);
    document.getElementById('molho').innerText = obterMolho(opcoes.molho);

    document.getElementById('ingredientes').style.listStyle = 'square';
    for (let i = 1; i <= 10; i++) {
        document.getElementById('ingr' + i).innerText = obterIngrediente(opcoes.ingredientes[i - 1]);
    }
}

function salvarUltimaMassa(opcoes) {
    sessionStorage['ultimaMassa'] = JSON.stringify(opcoes);
}