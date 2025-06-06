// Aguarda o carregamento do DOM para garantir que os elementos existem
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o carrossel e os slides
    const carrossel = document.querySelector('.carrossel');
    const slides = document.querySelectorAll('.carrossel .livro');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;
    const totalSlides = slides.length;

    // Atualiza a posição do carrossel de acordo com o slide atual
    function updateCarrossel() {
        // Garante que currentIndex nunca passe dos limites
        if (currentIndex < 0) currentIndex = totalSlides - 1;
        if (currentIndex >= totalSlides) currentIndex = 0;
        const offset = -currentIndex * 100;
        // Move o carrossel usando translateX em porcentagem
        carrossel.style.transform = `translateX(${offset}%)`;
    }

    // Evento para botão "anterior"
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentIndex--;
            updateCarrossel();
        });
    }

    // Evento para botão "próximo"
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex++;
            updateCarrossel();
        });
    }

    // Avanço automático do carrossel a cada 15 segundos
    setInterval(() => {
        currentIndex++;
        updateCarrossel();
    }, 15000);

    // Suporte a swipe (arrastar) no mobile
    let startX = null;
    carrossel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    carrossel.addEventListener('touchend', (e) => {
        if (startX === null) return;
        let endX = e.changedTouches[0].clientX;
        let diff = startX - endX;
        // Se o movimento for significativo, troca de slide
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                currentIndex++;
            } else {
                currentIndex--;
            }
            updateCarrossel();
        }
        startX = null;
    });
});