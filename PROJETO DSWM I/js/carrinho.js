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

// Renderiza a lista de itens do carrinho na tela
function renderCarrinho() {
    const carrinho = getCarrinho();
    const lista = document.getElementById('lista-carrinho');
    const totalDiv = document.getElementById('carrinho-total');
    const vazioDiv = document.getElementById('carrinho-vazio');
    const finalizarBtn = document.getElementById('finalizar-venda');
    lista.innerHTML = '';
    let total = 0;

    // Se o carrinho estiver vazio, mostra mensagem e esconde botão de finalizar
    if (carrinho.length === 0) {
        vazioDiv.style.display = 'block';
        totalDiv.textContent = '';
        finalizarBtn.style.display = 'none';
        return;
    }
    vazioDiv.style.display = 'none';
    finalizarBtn.style.display = 'block';

    // Agrupa os itens para mostrar quantidade de cada livro
    const agrupado = agruparCarrinho(carrinho);
    Object.keys(agrupado).forEach(id => {
        const livro = window.livros[id];
        if (!livro) return;
        const quantidade = agrupado[id];
        // Converte o valor do livro para número
        const preco = Number(livro.valor.replace(/[^\d,]/g, '').replace(',', '.'));
        total += preco * quantidade;

        // Cria o elemento visual do item no carrinho
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${livro.imagem}" alt="${livro.titulo}">
            <span style="flex:1;">${livro.titulo}</span>
            <span class="carrinho-quantidade">
                <button onclick="alterarQuantidade('${id}', -1)">-</button>
                <span>${quantidade}</span>
                <button onclick="alterarQuantidade('${id}', 1)">+</button>
            </span>
            <span style="color:#e63946;font-weight:bold;">
                R$ ${(preco * quantidade).toFixed(2).replace('.', ',')}
            </span>
            <button class="carrinho-remover" onclick="removerTodosDoCarrinho('${id}')">Remover</button>
        `;
        // Estilização inline para o item do carrinho
        li.className = '';
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.gap = '20px';
        li.style.marginBottom = '18px';
        lista.appendChild(li);
    });
    // Mostra o valor total do carrinho
    totalDiv.textContent = 'Total: R$ ' + total.toFixed(2).replace('.', ',');
}

// Altera a quantidade de um item no carrinho (adiciona ou remove um)
function alterarQuantidade(id, delta) {
    let carrinho = getCarrinho();
    if (delta === 1) {
        carrinho.push(id); // Adiciona mais um do mesmo livro
    } else if (delta === -1) {
        const idx = carrinho.indexOf(id);
        if (idx !== -1) carrinho.splice(idx, 1); // Remove um do mesmo livro
    }
    setCarrinho(carrinho);
    renderCarrinho();
}

// Remove todos os exemplares de um livro do carrinho
function removerTodosDoCarrinho(id) {
    let carrinho = getCarrinho();
    carrinho = carrinho.filter(item => item !== id);
    setCarrinho(carrinho);
    renderCarrinho();
}

// Torna as funções acessíveis globalmente para uso nos botões do HTML
window.alterarQuantidade = alterarQuantidade;
window.removerTodosDoCarrinho = removerTodosDoCarrinho;

// Ao carregar a página, garante que os livros estejam carregados e renderiza o carrinho
document.addEventListener('DOMContentLoaded', async () => {
    if (!window.livros || Object.keys(window.livros).length === 0) {
        await carregarLivros();
    }
    renderCarrinho();
});

// Adiciona evento ao botão de finalizar venda para ir para a tela de finalização
document.addEventListener('DOMContentLoaded', () => {
    const finalizarBtn = document.getElementById('finalizar-venda');
    if (finalizarBtn) {
        finalizarBtn.onclick = function() {
            window.location.href = "finalizarcompra.html";
        };
    }
});