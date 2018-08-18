window.onload = function() {
    if (!sessionStorage['cont']) {
        sessionStorage.setItem('cont', 0);
    }
    
    validarTentativas();
    document.getElementById('cont').innerText = sessionStorage['cont'];
}   

function gerar() {
    var botaoGerar = document.getElementById('gerar');
    botaoGerar.setAttribute('disabled', '');
    
    if (Number(sessionStorage.cont) == 3) {
        return;
    }

    botaoGerar.innerText = 'Massa gerada!';
    document.getElementById('oleo').innerText = numeroAleatorio(1, 2) == 1 ? 'Azeite' : 'Manteiga';
    document.getElementById('massa').innerText = obterMassa(numeroAleatorio(1, 3));
    document.getElementById('molho').innerText = obterMolho(numeroAleatorio(1, 3));
    document.getElementById('ingredientes').style.listStyle = 'square';
    for (let i = 1; i <= 10; i++) {
        document.getElementById('ingr' + i).innerText = obterIngrediente(numeroAleatorio(1, 22));
    }
    setTimeout(() => {
        botaoGerar.removeAttribute('disabled');
        botaoGerar.innerText = 'Gerar';
        validarTentativas();
    }, 2500);

    sessionStorage['cont'] = Number(sessionStorage['cont']) + 1;
    document.getElementById('cont').innerText = sessionStorage['cont'];

    validarTentativas();
}

function validarTentativas() {
    var botaoGerar = document.getElementById('gerar');
    if (sessionStorage['cont'] == 3) {
        botaoGerar.setAttribute('disabled', '');
        botaoGerar.innerText = 'Tentativas esgotadas!';
    }
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
    let ingrediente;
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
            ingrediente = 'LIVRE';
            break;
        case 6:
            ingrediente = 'Muçarela';
            break;
        case 7:
            ingrediente = 'Cebola';
            break;
        case 8:
            ingrediente = 'Alcaparra';
            break;
        case 9:
            ingrediente = 'Salsicha';
            break;
        case 10:
            ingrediente = 'Alho';
            break;
        case 11:
            ingrediente = 'Queijo minas';
            break;
        case 12:
            ingrediente = 'Linguiça toscana';
            break;
        case 13:
            ingrediente = 'Cenoura';
            break;
        case 14:
            ingrediente = 'Provolone';
            break;
        case 15:
            ingrediente = 'Peito de peru';
            break;
        case 16:
            ingrediente = 'Azeitona';
            break;
        case 17:
            ingrediente = 'Presunto';
            break;
        case 18:
            ingrediente = 'Tomate';
            break;
        case 19:
            ingrediente = 'Ovo';
            break;
        case 20:
            ingrediente = 'Palmito';
            break;
        case 21:
            ingrediente = 'Gorgonzola';
            break;
        case 22:
            ingrediente = 'LIVRE';
            break;
        default:
            ingrediente = 'ERRO';
            break;
    }

    return ingrediente;
}