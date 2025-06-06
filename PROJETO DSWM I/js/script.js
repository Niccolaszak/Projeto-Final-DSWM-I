// Objeto global para armazenar os livros carregados
window.livros = {};

// Função assíncrona para carregar os livros do arquivo livros.json
async function carregarLivros() {
    try {
        const resp = await fetch('livros.json');
        const data = await resp.json();
        // Transforma o array em objeto para acesso rápido por id
        window.livros = {};
        data.forEach(livro => {
            window.livros[livro.id] = livro;
        });
        // Se quiser, pode chamar funções de renderização aqui
        // ex: renderizarCatalogo();
    } catch (e) {
        console.error('Erro ao carregar livros:', e);
    }
}

// Recupera o id do livro a partir da URL (usado na tela de venda)
function getLivroIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || '1'; // Padrão para 1 se não houver parâmetro
}

// Preenche a tela de venda com as informações do livro selecionado
async function preencherTelaVenda() {
    await carregarLivros();
    const id = getLivroIdFromUrl();
    const livro = window.livros[id];
    if (livro) {
        document.getElementById('venda-img').src = livro.imagem;
        document.getElementById('venda-img').alt = livro.titulo;
        document.getElementById('venda-img-info').innerHTML = livro.informacoes || '';
        document.getElementById('venda-titulo').textContent = livro.titulo;
        document.getElementById('venda-autor').textContent = "por " + livro.autor;
        document.getElementById('venda-preco').textContent = livro.valor;
        document.getElementById('venda-descricao').textContent = livro.descricao;
    }
}

// Ao carregar a página, se estiver na tela de venda, preenche as informações do livro
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('venda-img')) {
        preencherTelaVenda();
    }
});

// Evento para o botão "Adicionar ao carrinho" na tela de venda
document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.querySelector('.botao-add');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const id = getLivroIdFromUrl();
            let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
            carrinho.push(id);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            alert('Produto adicionado ao carrinho!');
        });
    }
});

// Garante que os livros sejam carregados ao iniciar o site
document.addEventListener('DOMContentLoaded', carregarLivros);