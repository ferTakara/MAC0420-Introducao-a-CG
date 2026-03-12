/*
 * ==================================================================
 *
 *  Esqueleto de um script JavaScript
 *
 * ==================================================================
*/

// A `main()` só deve ser executada quando tudo estiver carregado
window.onload = main; // nome da função a ser chamada 'onload'

// Lista de variáveis globais
var ctx;  // contexto com a API para desenhar

/**
 * função principal
 */
function main() {
    // veja o canvas id definido no arquivo index.html
    const canvas = document.getElementById('meucanvas');
    // vamos definir um contexto para desenhar em 2D
    ctx = canvas.getContext('2d');
    if (!ctx) alert("Não consegui abrir o contexto 2d :-( ");

    let quadrados = []
    while (quadrados.length < 100) {
        const quadrado = [sorteie_inteiro(0,400), sorteie_inteiro(0,400)]
        let adicionar = true;

        for (i = 0; i < quadrados.length; i++) {
            if (quadrados[i][0] === quadrado[0] && quadrados[i][1] == quadrado[1]) adicionar = false;
        }

        if(adicionar) {
            quadrados.push(quadrado);
        }
    }

    quadrados.sort();

    for (i = 0; i < quadrados.length; i++) {
        const cor = sorteie_corRGB();
        const lado = sorteie_inteiro(0,150)
        desenheRect(cor, quadrados[i][0], quadrados[i][1], lado, lado)
    }
};

// ==================================================================
//   outras funções

/**
 * recebe uma cor e os parâmetros de um retângulo e
 * desenha a região interna do retângulo com cor.
 * @param {string} cor 
 * @param {number} left - coluna esquerda
 * @param {number} top  - linha superior
 * @param {number} width - largura do retângulo
 * @param {number} height - altura
 */
function desenheRect( cor, left, top, width, height ) {
    console.log("Desenhando retângulo ", cor);
    ctx.fillStyle = cor;
    ctx.fillRect( left, top, width, height );
};  

function sorteie_inteiro (min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function sorteie_corRGB () {
    let r = sorteie_inteiro(0, 255);
    let g = sorteie_inteiro(0, 255);
    let b = sorteie_inteiro(0, 255);
    return `rgb( ${r}, ${g}, ${b} )`;  // retorna uma string
}