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