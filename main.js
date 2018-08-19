const OLEOS = ['Azeite', 'Manteiga'];
const MASSAS = ['Penne', 'Espaguete', 'Talharim'];
const MOLHOS = ['Vermelho', 'Branco', 'Misto'];
const INGREDIENTES = ['Milho', 'Bacon', 'Carne moída', 'Brócolis', 'Muçarela',
'Cebola', 'Alcaparra', 'Salsicha', 'Alho', 'Queijo minas', 'Linguiça toscana',
'Cenoura', 'Peito de peru', 'Azeitona', 'Presunto', 'Tomate', 'Ovo', 'Palmito',
'Gorgonzola'];


window.onload = function() {
    carregarMassa();
}

function gerar() {
    var botaoGerar = document.getElementById('gerar');
    botaoGerar.setAttribute('disabled', '');

    var opcoes = {
        "oleo": '',
        "massa": '',
        "molho": '',
        "ingredientes": []
    };

    botaoGerar.innerText = 'Massa gerada!';

    opcoes.oleo = OLEOS[numeroAleatorio(0, 1)];
    opcoes.massa = MASSAS[numeroAleatorio(0, 2)];
    opcoes.molho = MOLHOS[numeroAleatorio(0, 2)];
    for (let i = 1; i <= 10; i++) {
        opcoes.ingredientes.push(INGREDIENTES[numeroAleatorio(0, 18)]);
    }

    opcoes.ingredientes = opcoes.ingredientes.sort();

    setTimeout(() => {
        botaoGerar.removeAttribute('disabled');
        botaoGerar.innerText = 'Gerar';
    }, 1000);

    salvarUltimaMassa(opcoes);
    carregarMassa();
}

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function carregarMassa() {
    if (!sessionStorage['ultimaMassa']) {
        document.getElementById('ingredientes').style.listStyle = 'none';
        return;
    }

    var opcoes = JSON.parse(sessionStorage['ultimaMassa']);
    document.getElementById('oleo').innerText = opcoes.oleo;
    document.getElementById('massa').innerText = opcoes.massa;
    document.getElementById('molho').innerText = opcoes.molho;

    document.getElementById('ingredientes').style.listStyle = 'square';
    for (let i = 0; i < 10; i++) {
        document.getElementById('ingr' + i).innerText = opcoes.ingredientes[i];
    }
}

function salvarUltimaMassa(opcoes) {
    sessionStorage['ultimaMassa'] = JSON.stringify(opcoes);
}