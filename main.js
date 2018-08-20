const OLEOS = ['Azeite', 'Manteiga'];
const MASSAS = ['Penne', 'Espaguete', 'Talharim'];
const MOLHOS = ['Vermelho', 'Branco', 'Misto'];
const INGREDIENTES = ['Milho', 'Bacon', 'Carne moída', 'Brócolis', 'Muçarela',
'Cebola', 'Alcaparra', 'Salsicha', 'Alho', 'Queijo minas', 'Linguiça toscana',
'Cenoura', 'Peito de peru', 'Azeitona', 'Presunto', 'Tomate', 'Ovo', 'Palmito',
'Gorgonzola'];


window.onload = function() {
    if (sessionStorage['ultimaMassa']) {
        document.getElementById('codigo-massa').value = sessionStorage['ultimaMassaCodigo'];
        var opcoes = JSON.parse(sessionStorage['ultimaMassa']);
        if (typeof(opcoes) == 'object') {
            exibirMassa(opcoes);
        }
    }
}

function instrucoes() {
    var instrucoes = document.getElementById('instrucoes-carregar');
    instrucoes.style.display = instrucoes.style.display == 'none' ? 'block' : 'none';
}

function gerar() {
    var botaoGerar = document.getElementById('gerar');

    var opcoes = {
        "oleo": '',
        "massa": '',
        "molho": '',
        "ingredientes": []
    };

    opcoes.oleo = OLEOS[gerarNumeroAleatorio(0, 1)];
    opcoes.massa = MASSAS[gerarNumeroAleatorio(0, 2)];
    opcoes.molho = MOLHOS[gerarNumeroAleatorio(0, 2)];
    for (let i = 1; i <= 10; i++) {
        opcoes.ingredientes.push(INGREDIENTES[gerarNumeroAleatorio(0, 18)]);
    }

    opcoes.ingredientes = opcoes.ingredientes.sort();
    
    salvarMassa(opcoes);
    exibirMassa(opcoes);
}

function limpar() {
    sessionStorage.clear();
    window.location.reload(true);
}

function carregar() {
    var objeto = JSON.parse(atob(document.getElementById('codigo-massa').value));
    if (typeof(objeto) == 'object') {
        salvarMassa(objeto);
        exibirMassa(objeto);
    } else {
        alert('Código de massa inválido.');
    }
}

function gerarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function exibirMassa(opcoes) {
    if (!sessionStorage['ultimaMassa']) {
        document.getElementById('ingredientes').style.listStyle = 'none';
        return;
    }

    document.getElementById('oleo').innerText = opcoes.oleo;
    document.getElementById('massa').innerText = opcoes.massa;
    document.getElementById('molho').innerText = opcoes.molho;

    document.getElementById('ingredientes').style.listStyle = 'square';
    for (let i = 0; i < 10; i++) {
        document.getElementById('ingr' + i).innerText = opcoes.ingredientes[i];
    }
}

function salvarMassa(opcoes) {
    var stringObjeto = JSON.stringify(opcoes);
    var codigoObjeto = btoa(stringObjeto);
    sessionStorage['ultimaMassa'] = stringObjeto;
    sessionStorage['ultimaMassaCodigo'] = codigoObjeto;
    document.getElementById('codigo-massa').value = codigoObjeto;
}