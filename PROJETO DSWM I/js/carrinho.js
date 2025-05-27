function getCarrinho() {
    return JSON.parse(localStorage.getItem('carrinho')) || [];
}

function setCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function agruparCarrinho(carrinho) {
    return carrinho.reduce((acc, id) => {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
    }, {});
}

function renderCarrinho() {
    const carrinho = getCarrinho();
    const lista = document.getElementById('lista-carrinho');
    const totalDiv = document.getElementById('carrinho-total');
    const vazioDiv = document.getElementById('carrinho-vazio');
    const finalizarBtn = document.getElementById('finalizar-venda');
    lista.innerHTML = '';
    let total = 0;
    if (carrinho.length === 0) {
        vazioDiv.style.display = 'block';
        totalDiv.textContent = '';
        finalizarBtn.style.display = 'none';
        return;
    }
    vazioDiv.style.display = 'none';
    finalizarBtn.style.display = 'block';

    const agrupado = agruparCarrinho(carrinho);
    Object.keys(agrupado).forEach(id => {
        const livro = window.livros[id];
        if (!livro) return;
        const quantidade = agrupado[id];
        const preco = Number(livro.valor.replace(/[^\d,]/g, '').replace(',', '.'));
        total += preco * quantidade;
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
        li.className = '';
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.gap = '20px';
        li.style.marginBottom = '18px';
        lista.appendChild(li);
    });
    totalDiv.textContent = 'Total: R$ ' + total.toFixed(2).replace('.', ',');
}

function alterarQuantidade(id, delta) {
    let carrinho = getCarrinho();
    if (delta === 1) {
        carrinho.push(id);
    } else if (delta === -1) {
        const idx = carrinho.indexOf(id);
        if (idx !== -1) carrinho.splice(idx, 1);
    }
    setCarrinho(carrinho);
    renderCarrinho();
}

function removerTodosDoCarrinho(id) {
    let carrinho = getCarrinho();
    carrinho = carrinho.filter(item => item !== id);
    setCarrinho(carrinho);
    renderCarrinho();
}

window.alterarQuantidade = alterarQuantidade;
window.removerTodosDoCarrinho = removerTodosDoCarrinho;

document.addEventListener('DOMContentLoaded', async () => {
    if (!window.livros || Object.keys(window.livros).length === 0) {
        await carregarLivros();
    }
    renderCarrinho(); // ou renderResumoCarrinho()
});

document.addEventListener('DOMContentLoaded', () => {
    const finalizarBtn = document.getElementById('finalizar-venda');
    if (finalizarBtn) {
        finalizarBtn.onclick = function() {
            window.location.href = "finalizarcompra.html";
        };
    }
});