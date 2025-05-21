document.addEventListener('DOMContentLoaded', () => {
    const carrossel = document.querySelector('.carrossel');
    const livros = document.querySelectorAll('.livro');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;

    function updateCarrossel() {
        const offset = -currentIndex * 100;
        carrossel.style.transform = `translateX(${offset}%)`;
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : livros.length - 1;
        updateCarrossel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < livros.length - 1) ? currentIndex + 1 : 0;
        updateCarrossel();
    });

    // Alterna automaticamente os itens do carrossel a cada 15 segundos
    setInterval(() => {
        currentIndex = (currentIndex < livros.length - 1) ? currentIndex + 1 : 0;
        updateCarrossel();
    }, 15000); // 15000ms = 15 segundos
});


const livros = {
    1: {
        "imagem": "imagens/harrypoterfundoquadrado.png",
        "informacoes": "- <strong>Autora</strong>: J.K. Rowling <br>- <strong>Gênero</strong>: Fantasia, aventura<br>- <strong>Publicado em</strong>: 1999 (Reino Unido), 2000 (Brasil)<br>- <strong>Editora</strong>: Bloomsbury (Reino Unido), Rocco (Brasil)<br>- <strong>Série</strong>: Harry Potter (terceiro livro)",
        "titulo": "Harry Potter e o Prisioneiro de Azkaban",
        "autor": "J.K. Rowling",
        "valor": "R$ 80,00",
        "descricao": "Harry Potter e o Prisioneiro de Azkaban acompanha Harry em seu terceiro ano em Hogwarts, enquanto lida com a fuga de Sirius Black, um prisioneiro supostamente perigoso. Mistérios sobre o passado de seu pai e segredos envolvendo magia e amizade fazem deste livro um dos mais surpreendentes da série!"
    },
    2: {
        "imagem": "imagens/livroitfundoquadrado.png",
        "informacoes": "- <strong>Autor</strong>: Stephen King <br>- <strong>Gênero</strong>: Terror, suspense <br>- <strong>Publicado em</strong>: Setembro de 1986 <br>- <strong>Editora</strong>: Viking Press (EUA), Editora Objetiva (Brasil)",
        "titulo": "It - A Coisa",
        "autor": "Stephen King",
        "valor": "R$ 80,00",
        "descricao": "It - A Coisa, obra-prima de Stephen King, tece uma narrativa intrincada e aterrorizante que mergulha nas profundezas do medo e da amizade. A história acompanha a jornada de um grupo de amigos, o Clube dos Perdedores, que se une para combater a indescritível e malevolente entidade conhecida como Pennywise. Essa criatura, que se alimenta do medo, assola a pacata cidade de Derry, no Maine, em ciclos de horror."
    },
    3: {
        "imagem": "imagens/opqnprincipefundoquadrado.png",
        "informacoes": "- <strong>Autor</strong>: Antoine de Saint-Exupéry <br> - <strong>Gênero</strong>: Fábula, literatura infantojuvenil<br> - <strong>Publicado em</strong>: 1943<br> -<strong> Editora</strong>: Éditions Gallimard (França), Editora Agir (Brasil)",
        "titulo": "O Pequeno Príncipe",
        "autor": "Antoine de Saint-Exupéry",
        "valor": "R$ 80,00",
        "descricao": "O Pequeno Príncipe é um clássico da literatura escrito por Antoine de Saint-Exupéry. A história acompanha um piloto que sofre uma pane no deserto do Saara e encontra um menino misterioso, o Pequeno Príncipe, que veio de um pequeno planeta chamado B-612. Durante sua jornada, o príncipe visita diferentes mundos e aprende lições sobre amizade, amor e a essência da vida."
    },
    4: {
        "imagem": "imagens/eassimquecomecafundoquadrado.png",
        "informacoes": "- <strong>Autora</strong>: Colleen Hoover <br> - <strong>Gênero</strong>: Romance, drama <br> - <strong>Publicado em</strong>: 2022 <br> - <strong>Editora</strong>: Galera Record (Brasil)",
        "titulo": "E Assim Que Acaba",
        "autor": "Colleen Hoover",
        "valor": "R$ 80,00",
        "descricao": "É Assim Que Começa, de Colleen Hoover, continua a história de Lily Bloom após o fim de seu relacionamento abusivo. Agora mãe solteira, ela tenta reconstruir sua vida enquanto lida com a presença de seu ex-marido, Ryle. O reencontro com Atlas Corrigan, seu primeiro amor, traz novas esperanças e desafios, explorando temas de recomeço, superação e amor."
    },
    5: {
        "imagem": "imagens/narniafundoquadrado.png",
        "informacoes": "- <strong>Autor</strong>: C.S. Lewis <br> - <strong>Gênero</strong>: Fantasia, aventura <br> - <strong>Publicado entre</strong>: 1950 - 1956 <br> - <strong>Editora</strong>: HarperCollins (Reino Unido), Martins Fontes (Brasil)",
        "titulo": "As Crônicas de Nárnia",
        "autor": "C.S. Lewis",
        "valor": "R$ 80,00",
        "descricao": "As Crônicas de Nárnia, de C.S. Lewis, é uma série de sete livros de fantasia publicada entre 1950 e 1956. As histórias se passam no mundo mágico de Nárnia, onde crianças humanas vivem aventuras ao lado de criaturas fantásticas e enfrentam desafios épicos. O primeiro e mais famoso livro, O Leão, a Feiticeira e o Guarda-Roupa, apresenta os irmãos Pevensie, que descobrem Nárnia e lutam contra a Feiticeira Branca com a ajuda do poderoso leão Aslam."
    }
};

function getLivroIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || '1'; // Padrão para 1 se não houver parâmetro
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('venda-img')) {
        const id = getLivroIdFromUrl();
        const livro = livros[id];
        if (livro) {
            document.getElementById('venda-img').src = livro.imagem;
            document.getElementById('venda-img').alt = livro.titulo;
            document.getElementById('venda-img-info').innerHTML = livro.informacoes;
            document.getElementById('venda-titulo').textContent = livro.titulo;
            document.getElementById('venda-autor').textContent = "por " + livro.autor;
            document.getElementById('venda-preco').textContent = livro.valor;
            document.getElementById('venda-descricao').textContent = livro.descricao;
        }
    }
});