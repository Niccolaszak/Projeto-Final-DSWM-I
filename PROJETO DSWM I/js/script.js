window.livros = {};

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

function getLivroIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || '1'; // Padrão para 1 se não houver parâmetro
}

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

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('venda-img')) {
        preencherTelaVenda();
    }
});

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

document.addEventListener('DOMContentLoaded', carregarLivros);

