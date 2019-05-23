/**
 * Quantidade de ingredientes que podem ser escolhidos.
 */
const quantidadeIngredientes = 10;

/**
 * Opções de óleo.
 */
const oleos = ['Azeite', 'Manteiga'];

/**
 * Opções de massa.
 */
const massas = ['Penne', 'Espaguete', 'Talharim'];

/**
 * Opções de molho.
 */
const molhos = ['Vermelho', 'Branco', 'Misto'];

/**
 * Opções de ingredientes.
 */
const ingredientes = ['Milho', 'Bacon', 'Carne moída', 'Brócolis', 'Muçarela',
    'Cebola', 'Alcaparra', 'Salsicha', 'Alho', 'Queijo minas', 'Linguiça toscana',
    'Cenoura', 'Peito de peru', 'Azeitona', 'Presunto', 'Tomate', 'Ovo', 'Palmito',
    'Gorgonzola', 'Uva passa'];

// Elementos HTML
const elementoListaIngr = document.getElementById('ingredientes');
const elementoListaFiltro = document.getElementById('ingredientes-filtro');
const elementoCodigoMassa = document.getElementById('codigo-massa');
const elementoInstrucoes = document.getElementById('instrucoes-carregar');
const elementoOleo = document.getElementById('oleo');
const elementoMassa = document.getElementById('massa');
const elementoMolho = document.getElementById('molho');

/**
 * Representa as opções de uma massa.
 */
class OpcoesMassa {

    /**
     * @param {String} oleo 
     * @param {String} massa 
     * @param {String} molho 
     * @param {String[]} ingredientes 
     */
    constructor(oleo, massa, molho, ingredientes) {
        this.oleo = oleo;
        this.massa = massa;
        this.molho = molho;
        this.ingredientes = ingredientes;
    }
}

/**
 * Método que será executado ao carregar a página.
 */
window.onload = function () {
    criarListaFiltros();
    criarListaIngredientes();
    carregarMassaSessao();
}

/**
 * Cria os elementos <li> da lista de filtros.
 */
function criarListaFiltros() {
    ingredientes.sort().forEach(function (valor, indice) {
        let itemLista = document.createElement('li');
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = indice;
        itemLista.appendChild(checkbox);
        itemLista.innerHTML += valor;
        elementoListaFiltro.appendChild(itemLista);
    });
}

/**
 * Cria os elementos <li> da lista de ingredientes.
 */
function criarListaIngredientes() {
    for (let i = 0; i < quantidadeIngredientes; i++) {
        let itemLista = document.createElement('li');
        itemLista.id = String('ingr' + i);
        elementoListaIngr.appendChild(itemLista);
    }
}

/**
 * Adiciona ou remove o filtro do vetor de filtros ativos.
 * @param {*} indiceIngrediente Índice do ingrediente selecionado.
 */
function alterarFiltro(indiceIngrediente) {
    alert(indiceIngrediente);
}

/**
 * Carrega, se existir, a massa armazenada na sessão.
 */
function carregarMassaSessao() {
    if (sessionStorage['ultimaMassa']) {
        elementoCodigoMassa.value = sessionStorage['ultimaMassaCodigo'];
        let objetoJson = JSON.parse(sessionStorage['ultimaMassa']);
        let opcoes = new OpcoesMassa(objetoJson['oleo'], objetoJson['massa'], objetoJson['molho'], objetoJson['ingredientes']);
        if (typeof (opcoes) === 'object') {
            exibirMassa(opcoes);
        }
    }
}

/**
 * Esconde ou exibe as instruções de uso do código da massa.
 */
function instrucoes() {
    elementoInstrucoes.style.display = elementoInstrucoes.style.display == 'none' ? 'flex' : 'none';
}

/**
 * Gera uma nova massa aleatoriamente e a salva no armazenamento da sessão.
 */
function gerar() {
    let ingredientesFiltrados = listarFiltros().filter((elemento) => {
        return elemento.checked;
    }).map((elemento) => {
        return Number(elemento.value);
    });

    if (ingredientesFiltrados.length == ingredientes.length) {
        alert('Você não pode filtrar todos os ingredientes.');
        return;
    }

    let opcoes = new OpcoesMassa(oleos[gerarNumeroAleatorio(0, 1)],
        massas[gerarNumeroAleatorio(0, 2)], molhos[gerarNumeroAleatorio(0, 2)], []);

    // Definição dos ingredientes
    for (let i = 0; i < quantidadeIngredientes; i++) {
        let numeroIngrediente;
        do {
            numeroIngrediente = gerarNumeroAleatorio(0, (ingredientes.length - 1));
        } while (numeroIngrediente == undefined || ingredientesFiltrados.includes(numeroIngrediente))
        opcoes.ingredientes.push(ingredientes[numeroIngrediente]);
    }

    opcoes.ingredientes = opcoes.ingredientes.sort();

    salvarMassa(opcoes);
    exibirMassa(opcoes);
}

/**
 * Limpa o armazenamento da sessão e recarrega a página.
 */
function limpar() {
    sessionStorage.clear();
    window.location.reload(true);
}

/**
 * Carrega uma massa de acordo com o código informado no campo.
 */
function carregarCodigo() {
    let objeto = JSON.parse(atob(elementoCodigoMassa.value));
    if (typeof (objeto) == 'object') {
        salvarMassa(objeto);
        exibirMassa(objeto);
    } else {
        alert('Código de massa inválido.');
    }
}

/**
 * Gera um número aleatório entre o intervalo especificado (inclusivo).
 * @param {Number} min Limite mínimo do intervalo
 * @param {Number} max Limite máximo do intervalo
 */
function gerarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Exibe na página as informações de uma massa.
 * @param {OpcoesMassa} opcoes Informações da massa.
 */
function exibirMassa(opcoes) {
    if (!sessionStorage['ultimaMassa']) {
        elementoListaIngr.style.listStyle = 'none';
        return;
    }

    elementoOleo.innerText = opcoes.oleo;
    elementoMassa.innerText = opcoes.massa;
    elementoMolho.innerText = opcoes.molho;

    elementoListaIngr.style.listStyle = 'square';
    for (let i = 0; i < quantidadeIngredientes; i++) {
        document.getElementById('ingr' + i).innerText = opcoes.ingredientes[i];
    }
}
/**
 * Salva a massa informada no armazenamento da sessão.
 * @param {OpcoesMassa} opcoes Informações da massa.
 */
function salvarMassa(opcoes) {
    var stringObjeto = JSON.stringify(opcoes); // Obtém o JSON das informações da massa
    var codigoObjeto = btoa(stringObjeto); // Transforma o JSON das informações em um Base64

    sessionStorage['ultimaMassa'] = stringObjeto;
    sessionStorage['ultimaMassaCodigo'] = codigoObjeto;

    elementoCodigoMassa.value = codigoObjeto;
}

/**
 * Copia o código da massa para a área de transferência do dispositivo.
 */
function copiarCodigo() {
    if (!elementoCodigoMassa.value) {
        return;
    }

    elementoCodigoMassa.select();
    document.execCommand('copy');
}

/**
 * Retorna uma lista com todos os elementos de filtro de ingredientes;
 */
function listarFiltros() {
    var filtros = [];
    for (let i = 0; i < elementoListaFiltro.children.length; i++) {
        let elementoLista = elementoListaFiltro.children.item(i);
        let elementoCheckBox = elementoLista.children.item(0);

        if (elementoCheckBox.type === 'checkbox') {
            filtros.push(elementoCheckBox);
        }
    }
    return filtros;
}

/**
 * Deseleciona todos os checkboxes de filtro de ingredientes.
 */
function limparFiltros() {
    listarFiltros().forEach((elemento) => {
        elemento.checked = false;
    });
}