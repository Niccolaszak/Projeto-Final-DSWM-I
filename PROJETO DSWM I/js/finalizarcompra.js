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

function renderResumoCarrinho() {
    const livros = window.livros || {};
    const carrinho = getCarrinho();
    const lista = document.getElementById('resumo-carrinho');
    const totalDiv = document.getElementById('resumo-total');
    lista.innerHTML = '';
    let total = 0;
    if (carrinho.length === 0) {
        lista.innerHTML = '<li>Seu carrinho está vazio.</li>';
        totalDiv.textContent = '';
        document.getElementById('pagamento-form').style.display = 'none';
        return;
    }
    const agrupado = agruparCarrinho(carrinho);
    Object.keys(agrupado).forEach(id => {
        const livro = livros[id];
        if (!livro) return;
        const quantidade = agrupado[id];
        const preco = Number(livro.valor.replace(/[^\d,]/g, '').replace(',', '.'));
        total += preco * quantidade;
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
    totalDiv.textContent = 'Total: R$ ' + total.toFixed(2).replace('.', ',');
}

document.addEventListener('DOMContentLoaded', async () => {
    if (!window.livros || Object.keys(window.livros).length === 0) {
        await carregarLivros();
    }
    renderResumoCarrinho(); // ou renderResumoCarrinho()
});

document.addEventListener('DOMContentLoaded', () => {
    renderResumoCarrinho();
    document.getElementById('pagamento-form').onsubmit = function(e) {
        e.preventDefault();
        const forma = document.getElementById('forma-pagamento').value;
        if (!forma) {
            alert('Selecione a forma de pagamento!');
            return;
        }
        setCarrinho([]);
        alert('Compra realizada com sucesso! Obrigado pela preferência.');
        window.location.href = "index.html";
    };
});