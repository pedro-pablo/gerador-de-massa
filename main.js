/**
 * Quantidade de ingredientes que podem ser escolhidos.
 */
const QUANTIDADE_INGREDIENTES = 10;

/**
 * Opções de óleo.
 */
const OLEOS = ['Azeite', 'Manteiga'];

/**
 * Opções de massa.
 */
const MASSAS = ['Penne', 'Espaguete', 'Talharim'];

/**
 * Opções de molho.
 */
const MOLHOS = ['Vermelho', 'Branco', 'Misto'];

/**
 * Opções de ingredientes.
 */
const INGREDIENTES = ['Milho', 'Bacon', 'Carne moída', 'Brócolis', 'Muçarela',
    'Cebola', 'Alcaparra', 'Salsicha', 'Alho', 'Queijo minas', 'Linguiça toscana',
    'Cenoura', 'Peito de peru', 'Azeitona', 'Presunto', 'Tomate', 'Ovo', 'Palmito',
    'Gorgonzola', 'Uva passa'];

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
    var tagListaFiltro = document.getElementById('ingredientes-filtro');
    INGREDIENTES.sort().forEach(function (valor, indice) {
        let itemLista = document.createElement('li');
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = indice;
        itemLista.appendChild(checkbox);
        itemLista.innerHTML += valor;
        tagListaFiltro.appendChild(itemLista);
    });
}

/**
 * Cria os elementos <li> da lista de ingredientes.
 */
function criarListaIngredientes() {
    var tagListaIngredientes = document.getElementById('ingredientes');
    for (let i = 0; i < QUANTIDADE_INGREDIENTES; i++) {
        let itemLista = document.createElement('li');
        itemLista.id = String('ingr' + i);
        tagListaIngredientes.appendChild(itemLista);
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
        document.getElementById('codigo-massa').value = sessionStorage['ultimaMassaCodigo'];
        var objetoJson = JSON.parse(sessionStorage['ultimaMassa']);
        var opcoes = new OpcoesMassa(objetoJson['oleo'], objetoJson['massa'], objetoJson['molho'], objetoJson['ingredientes']);
        if (typeof (opcoes) === 'object') {
            exibirMassa(opcoes);
        }
    }
}

/**
 * Esconde ou exibe as instruções de uso do código da massa.
 */
function instrucoes() {
    var instrucoes = document.getElementById('instrucoes-carregar');
    instrucoes.style.display = instrucoes.style.display == 'none' ? 'block' : 'none';
}

/**
 * Gera uma nova massa aleatoriamente e a salva no armazenamento da sessão.
 */
function gerar() {
    var botaoGerar = document.getElementById('gerar');

    var ingredientesFiltrados = [];
    var listaFiltros = document.getElementById('ingredientes-filtro');
    for (let i = 0; i < listaFiltros.children.length; i++) {
        let elementoLista = listaFiltros.children.item(i);
        let elementoCheckBox = elementoLista.children.item(0);
        if (elementoCheckBox.type === 'checkbox') {
            if (elementoCheckBox.checked) {
                ingredientesFiltrados.push(Number(elementoCheckBox.value));
            }
        }
    }

    if (ingredientesFiltrados.length == INGREDIENTES.length) {
        alert('Você não pode filtrar todos os ingredientes.');
        return;
    }

    var opcoes = new OpcoesMassa(OLEOS[gerarNumeroAleatorio(0, 1)],
        MASSAS[gerarNumeroAleatorio(0, 2)], MOLHOS[gerarNumeroAleatorio(0, 2)], []);

    // Definição dos ingredientes
    for (let i = 0; i < QUANTIDADE_INGREDIENTES; i++) {
        let numeroIngrediente;
        do {
            numeroIngrediente = gerarNumeroAleatorio(0, (INGREDIENTES.length - 1));
        } while (numeroIngrediente == undefined || ingredientesFiltrados.includes(numeroIngrediente))
        opcoes.ingredientes.push(INGREDIENTES[numeroIngrediente]);
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
    var objeto = JSON.parse(atob(document.getElementById('codigo-massa').value));
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
        document.getElementById('ingredientes').style.listStyle = 'none';
        return;
    }

    document.getElementById('oleo').innerText = opcoes.oleo;
    document.getElementById('massa').innerText = opcoes.massa;
    document.getElementById('molho').innerText = opcoes.molho;

    document.getElementById('ingredientes').style.listStyle = 'square';
    for (let i = 0; i < QUANTIDADE_INGREDIENTES; i++) {
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

    document.getElementById('codigo-massa').value = codigoObjeto;
}