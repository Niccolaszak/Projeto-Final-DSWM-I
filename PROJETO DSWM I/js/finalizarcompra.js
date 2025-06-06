// Recupera o carrinho do localStorage (array de IDs dos livros)
function getCarrinho() {
    return JSON.parse(localStorage.getItem('carrinho')) || [];
}

// Salva o carrinho no localStorage
function setCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Agrupa os itens do carrinho por ID, contando quantos de cada livro existem
function agruparCarrinho(carrinho) {
    return carrinho.reduce((acc, id) => {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
    }, {});
}

// Renderiza o resumo do carrinho na tela de finalização
function renderResumoCarrinho() {
    const livros = window.livros || {};
    const carrinho = getCarrinho();
    const lista = document.getElementById('resumo-carrinho');
    const totalDiv = document.getElementById('resumo-total');
    lista.innerHTML = '';
    let total = 0;

    // Se o carrinho estiver vazio, mostra mensagem e esconde o formulário de pagamento
    if (carrinho.length === 0) {
        lista.innerHTML = '<li>Seu carrinho está vazio.</li>';
        totalDiv.textContent = '';
        document.getElementById('pagamento-form').style.display = 'none';
        return;
    }

    // Agrupa os itens para mostrar quantidade de cada livro
    const agrupado = agruparCarrinho(carrinho);
    Object.keys(agrupado).forEach(id => {
        const livro = livros[id];
        if (!livro) return;
        const quantidade = agrupado[id];
        // Converte o valor do livro para número
        const preco = Number(livro.valor.replace(/[^\d,]/g, '').replace(',', '.'));
        total += preco * quantidade;
        // Cria o elemento visual do item no resumo
        const li = document.createElement('li');
        li.className = 'resumo-item';
        li.innerHTML = `
            <img src="${livro.imagem}" alt="${livro.titulo}" class="resumo-img">
            <span class="resumo-titulo">${livro.titulo}</span>
            <span class="resumo-qtd">Qtd: <b>${quantidade}</b></span>
            <span class="resumo-valor">Valor: <b>R$ ${(preco * quantidade).toFixed(2).replace('.', ',')}</b></span>
        `;
        lista.appendChild(li);
    });
    // Mostra o valor total do carrinho
    totalDiv.textContent = 'Total: R$ ' + total.toFixed(2).replace('.', ',');
}

// Garante que os livros estejam carregados antes de renderizar o resumo do carrinho
document.addEventListener('DOMContentLoaded', async () => {
    if (!window.livros || Object.keys(window.livros).length === 0) {
        await carregarLivros();
    }
    renderResumoCarrinho();
});

// Adiciona evento ao formulário de pagamento para finalizar a compra
document.addEventListener('DOMContentLoaded', () => {
    renderResumoCarrinho();
    document.getElementById('pagamento-form').onsubmit = function(e) {
        e.preventDefault();
        const forma = document.getElementById('forma-pagamento').value;
        if (!forma) {
            alert('Selecione a forma de pagamento!');
            return;
        }
        setCarrinho([]); // Limpa o carrinho após a compra
        alert('Compra realizada com sucesso! Obrigado pela preferência.');
        window.location.href = "index.html"; // Redireciona para a página inicial
    };
});